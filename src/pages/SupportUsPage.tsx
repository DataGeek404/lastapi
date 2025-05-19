import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Button from '@/components/shared/Button';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';
import { donationApi } from '@/services/api';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, CreditCard, Bitcoin, DollarSign, Smartphone } from "lucide-react";

// Types
interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

interface DonorInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  anonymous: boolean;
}

// Fallback payment methods to use if API call fails
const fallbackPaymentMethods: PaymentMethod[] = [
  { id: 'visa', name: 'Visa', icon: 'visa', enabled: true },
  { id: 'mastercard', name: 'Mastercard', icon: 'mastercard', enabled: true },
  { id: 'stripe', name: 'Stripe', icon: 'stripe', enabled: true },
  { id: 'paypal', name: 'PayPal', icon: 'paypal', enabled: true },
  { id: 'mpesa', name: 'M-Pesa', icon: 'mpesa', enabled: true }
];

const SupportUsPage = () => {
  const { isLoading, setIsLoading } = useApp();
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    phoneNumber: '',
    anonymous: false,
  });

  const predefinedAmounts = ['10', '25', '50', '100', '250'];

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await donationApi.getPaymentMethods();
        setPaymentMethods(response.data);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        toast.error('Failed to load payment methods. Using default options.');
        // Use fallback payment methods if API call fails
        setPaymentMethods(fallbackPaymentMethods);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleAmountClick = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setCustomAmount(value);
      setDonationAmount('custom');
    }
  };

  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setDonorInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Get the actual donation amount (either predefined or custom)
    const amount = donationAmount === 'custom' ? customAmount : donationAmount;

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid donation amount');
      setIsLoading(false);
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      setIsLoading(false);
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      toast.error('Please provide your name and email');
      setIsLoading(false);
      return;
    }

    // Check if phone number is provided for M-Pesa payments
    if (paymentMethod === 'mpesa' && !donorInfo.phoneNumber) {
      toast.error('Please provide your phone number for M-Pesa payments');
      setIsLoading(false);
      return;
    }

    try {
      const donationData = {
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        amount: parseFloat(amount),
        isAnonymous: donorInfo.anonymous,
        notes: `Donation from ${donorInfo.name}`,
        // Add phone number for M-Pesa payments
        ...(paymentMethod === 'mpesa' && { phoneNumber: donorInfo.phoneNumber })
      };

      const response = await donationApi.processDonation(donationData, paymentMethod);
      console.log('Donation response:', response.data);

      if (paymentMethod === 'mpesa' && response.data.checkoutRequestId) {
        // Show M-Pesa instructions
        setMpesaCheckoutId(response.data.checkoutRequestId);
        setShowMpesaInstructions(true);
        toast.success('M-Pesa payment request sent to your phone. Please check your phone to complete the payment.');
      } else if (paymentMethod === 'paypal' && response.data.paypalUrl) {
        // Redirect to PayPal
        window.location.href = response.data.paypalUrl;
        toast.success('Redirecting to PayPal to complete your donation.');
      } else if ((paymentMethod === 'visa' || paymentMethod === 'mastercard' || paymentMethod === 'stripe') && response.data.clientSecret) {
        // Handle card payment (would integrate with Stripe Elements in production)
        toast.success('Please complete your card payment in the popup window.');
        // In production, this would open a Stripe Elements payment form
      } else {
        toast.success('Thank you for your donation!');
        // Reset form after successful donation
        resetForm();
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      toast.error('There was an error processing your donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle showing M-Pesa instruction modal
  const [showMpesaInstructions, setShowMpesaInstructions] = useState<boolean>(false);
  const [mpesaCheckoutId, setMpesaCheckoutId] = useState<string>('');

  // Helper function to reset the form
  const resetForm = () => {
    setDonationAmount('');
    setCustomAmount('');
    setPaymentMethod('');
    setDonorInfo({
      name: '',
      email: '',
      address: '',
      city: '',
      country: '',
      phoneNumber: '',
      anonymous: false,
    });
  };

  // Helper function to render payment method icon
  const renderPaymentIcon = (methodId: string) => {
    switch(methodId) {
      case 'visa':
        return <CreditCard className="h-8 w-8" />;
      case 'mastercard':
        return <CreditCard className="h-8 w-8" />;
      case 'stripe':
        return <DollarSign className="h-8 w-8" />;
      case 'paypal':
        return <DollarSign className="h-8 w-8" />;
      case 'mpesa':
        return <Smartphone className="h-8 w-8" />;
      case 'bitcoin':
        return <Bitcoin className="h-8 w-8" />;
      default:
        return <CreditCard className="h-8 w-8" />;
    }
  };

  return (
    <>
      <PageHeader 
        title="Support Our Mission" 
        subtitle="Your contribution helps us create lasting positive change in communities"
      />

      {/* M-Pesa Instructions Modal */}
      {showMpesaInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Complete M-Pesa Payment</h3>
            <p className="mb-4">A payment request has been sent to your phone. Please follow these steps:</p>
            <ol className="list-decimal pl-5 mb-4">
              <li className="mb-2">Check your phone for an M-Pesa STK push notification</li>
              <li className="mb-2">Enter your M-Pesa PIN when prompted</li>
              <li className="mb-2">Wait for confirmation message from M-Pesa</li>
            </ol>
            <p className="text-sm mb-4">Transaction ID: {mpesaCheckoutId}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => {
                  setShowMpesaInstructions(false);
                  resetForm();
                }}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="section container-narrow">
        <div className="mb-16">
          <h2 className="mb-6 text-center">Ways to Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mb-2">Make a Donation</h3>
              <p className="mb-4 text-muted-foreground">
                Your financial support enables us to sustain and expand our programs and initiatives.
              </p>
              <a href="#donate" className="text-primary font-medium hover:underline">
                Donate Now
              </a>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="mb-2">Corporate Partnerships</h3>
              <p className="mb-4 text-muted-foreground">
                Partner with us to align your business goals with social impact and community engagement.
              </p>
              <a href="#" className="text-primary font-medium hover:underline">
                Learn More
              </a>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <h3 className="mb-2">In-Kind Donations</h3>
              <p className="mb-4 text-muted-foreground">
                Contribute goods, services, or expertise that can support our programs and operations.
              </p>
              <a href="#" className="text-primary font-medium hover:underline">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center">Your Impact</h2>
          <div className="space-y-6">
            <div className="rounded-lg bg-brand-50 p-6">
              <h3 className="mb-4">$25 provides</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Educational materials for one student for a month</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-brand-50 p-6">
              <h3 className="mb-4">$50 provides</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Training workshop for a community volunteer</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-brand-50 p-6">
              <h3 className="mb-4">$100 provides</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Equipment for a community project</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-brand-50 p-6">
              <h3 className="mb-4">$250 provides</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Seed funding for a small community initiative</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="donate" className="scroll-mt-16">
          <h2 className="mb-8 text-center">Make a Donation</h2>
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="mb-4">Select Donation Amount</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`rounded-md px-3 py-2 text-center ${
                      donationAmount === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => handleAmountClick(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="customAmount"
                  name="donationAmount"
                  checked={donationAmount === 'custom'}
                  onChange={() => setDonationAmount('custom')}
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="customAmount" className="text-sm font-medium">
                  Custom Amount:
                </label>
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    onClick={() => setDonationAmount('custom')}
                    className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4">Your Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={donorInfo.name}
                      onChange={handleDonorInfoChange}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={donorInfo.email}
                      onChange={handleDonorInfoChange}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="mb-1 block text-sm font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={donorInfo.address}
                    onChange={handleDonorInfoChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className="mb-1 block text-sm font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={donorInfo.city}
                      onChange={handleDonorInfoChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="mb-1 block text-sm font-medium">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={donorInfo.country}
                      onChange={handleDonorInfoChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                </div>
                
                {paymentMethod === 'mpesa' && (
                  <div>
                    <label htmlFor="phoneNumber" className="mb-1 block text-sm font-medium">
                      Phone Number* (for M-Pesa)
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={donorInfo.phoneNumber}
                      onChange={handleDonorInfoChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="e.g., 254712345678"
                      required={paymentMethod === 'mpesa'}
                    />
                  </div>
                )}
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="anonymous"
                    checked={donorInfo.anonymous}
                    onChange={handleDonorInfoChange}
                    className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                    Make my donation anonymous
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 font-medium">Select Payment Method</h3>
              {paymentMethods.length > 0 ? (
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={handlePaymentMethodSelect}
                  className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4"
                >
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className={`relative flex flex-col items-center justify-center rounded-lg border p-4 transition-all
                        ${!method.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        ${paymentMethod === method.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                      `}
                    >
                      {method.enabled && (
                        <RadioGroupItem 
                          value={method.id} 
                          id={`payment-${method.id}`} 
                          className="sr-only"
                          disabled={!method.enabled}
                        />
                      )}
                      <div className="mb-2 h-10 w-full flex items-center justify-center text-brand-600">
                        {renderPaymentIcon(method.id)}
                      </div>
                      <Label 
                        htmlFor={`payment-${method.id}`} 
                        className="text-sm font-medium capitalize"
                      >
                        {method.name}
                      </Label>
                      {paymentMethod === method.id && (
                        <div className="absolute top-2 right-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading payment methods...</p>
                </div>
              )}
              {!paymentMethod && donationAmount && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Please select a payment method to continue
                </p>
              )}
            </div>

            <div className="text-center">
              <Button 
                type="submit" 
                size="lg" 
                isLoading={isLoading}
                disabled={!paymentMethod || !donationAmount || (donationAmount === 'custom' && !customAmount)}
              >
                Complete Donation
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Your donation is tax-deductible. You will receive a receipt via email for your records.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SupportUsPage;
