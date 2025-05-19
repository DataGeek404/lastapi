
const Donation = require('../models/Donation');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const { validationResult } = require('express-validator');

// @desc    Get all payment methods
// @route   GET /api/payment-methods
// @access  Public
const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = [
      { id: 'visa', name: 'Visa', icon: '/payment-logos/visa.svg' },
      { id: 'mastercard', name: 'Mastercard', icon: '/payment-logos/mastercard.svg' },
      { id: 'stripe', name: 'Stripe', icon: '/payment-logos/stripe.svg' },
      { id: 'paypal', name: 'PayPal', icon: '/payment-logos/paypal.svg' },
      { id: 'mpesa', name: 'M-Pesa', icon: '/payment-logos/mpesa.svg' }
    ];
    res.json(paymentMethods);
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Process donation payment with Stripe
// @route   POST /api/donations/stripe
// @access  Public
const processStripePayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, currency, donorInfo } = req.body;

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: currency || 'usd',
      metadata: {
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        isAnonymous: donorInfo.anonymous ? 'true' : 'false'
      }
    });

    // Create donation record
    const donation = new Donation({
      userId: req.user ? req.user._id : null,
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      amount,
      currency: currency || 'usd',
      paymentMethod: 'stripe',
      transactionId: paymentIntent.id,
      status: 'pending',
      isAnonymous: donorInfo.anonymous || false
    });
    
    await donation.save();

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      donationId: donation._id
    });
  } catch (error) {
    console.error('Stripe payment error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

// @desc    Process donation payment with PayPal
// @route   POST /api/donations/paypal
// @access  Public
const processPaypalPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, currency, donorInfo } = req.body;

  try {
    // In a real application, you would integrate with PayPal SDK here
    // For this example, we'll simulate a successful transaction
    
    const transactionId = 'PAYPAL_' + Date.now() + Math.random().toString(36).substring(2, 15);
    
    // Create donation record
    const donation = new Donation({
      userId: req.user ? req.user._id : null,
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      amount,
      currency: currency || 'usd',
      paymentMethod: 'paypal',
      transactionId,
      status: 'completed',
      isAnonymous: donorInfo.anonymous || false
    });
    
    await donation.save();

    res.json({
      success: true,
      transactionId,
      donationId: donation._id
    });
  } catch (error) {
    console.error('PayPal payment error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

// @desc    Process donation payment with M-Pesa
// @route   POST /api/donations/mpesa
// @access  Public
const processMpesaPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, phoneNumber, donorInfo } = req.body;

  try {
    // In a real application, you would integrate with M-Pesa API here
    // For this example, we'll simulate a successful transaction
    
    const transactionId = 'MPESA_' + Date.now() + Math.random().toString(36).substring(2, 15);
    
    // Create donation record
    const donation = new Donation({
      userId: req.user ? req.user._id : null,
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      amount,
      currency: 'KES', // M-Pesa typically uses Kenyan Shilling
      paymentMethod: 'mpesa',
      transactionId,
      status: 'pending',
      isAnonymous: donorInfo.anonymous || false,
      notes: `Phone: ${phoneNumber}`
    });
    
    await donation.save();

    res.json({
      success: true,
      transactionId,
      donationId: donation._id,
      message: 'Please check your phone for the M-Pesa payment prompt'
    });
  } catch (error) {
    console.error('M-Pesa payment error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

// @desc    Process card payment (Visa/Mastercard)
// @route   POST /api/donations/card
// @access  Public
const processCardPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, currency, donorInfo, cardType } = req.body;

  try {
    // In a real application, you would use a payment processor API
    // For this example, we'll simulate a successful transaction
    
    const transactionId = `${cardType.toUpperCase()}_` + Date.now() + Math.random().toString(36).substring(2, 15);
    
    // Create donation record
    const donation = new Donation({
      userId: req.user ? req.user._id : null,
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      amount,
      currency: currency || 'usd',
      paymentMethod: cardType.toLowerCase(), // 'visa' or 'mastercard'
      transactionId,
      status: 'completed',
      isAnonymous: donorInfo.anonymous || false
    });
    
    await donation.save();

    res.json({
      success: true,
      transactionId,
      donationId: donation._id
    });
  } catch (error) {
    console.error('Card payment error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

// @desc    Get donation status
// @route   GET /api/donations/:id
// @access  Public
const getDonationStatus = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json({
      status: donation.status,
      amount: donation.amount,
      currency: donation.currency,
      paymentMethod: donation.paymentMethod,
      donatedAt: donation.donatedAt
    });
  } catch (error) {
    console.error('Get donation status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update donation status (webhook handlers would use this)
// @route   PUT /api/donations/:id/status
// @access  Private/Admin
const updateDonationStatus = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    donation.status = req.body.status;
    
    const updatedDonation = await donation.save();
    
    res.json({
      success: true,
      status: updatedDonation.status
    });
  } catch (error) {
    console.error('Update donation status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPaymentMethods,
  processStripePayment,
  processPaypalPayment,
  processMpesaPayment,
  processCardPayment,
  getDonationStatus,
  updateDonationStatus
};
