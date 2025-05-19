<think>

</think>

const { validationResult } = require('express-validator');
const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Process Stripe payment
// @route   POST /api/donations/stripe
// @access  Public
const processStripePayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { donorName, donorEmail, amount, isAnonymous, notes, userId } = req.body;

  try {
    const db = req.app.locals.db;
    
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires amount in cents
      currency: 'usd',
      description: `Donation from ${donorName}`,
      receipt_email: donorEmail
    });
    
    // Save donation record
    const [result] = await db.query(
      'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId || null, donorName, donorEmail, amount, 'stripe', paymentIntent.id, isAnonymous, notes]
    );
    
    res.status(201).json({
      success: true,
      donationId: result.insertId,
      clientSecret: paymentIntent.client_secret,
      message: 'Payment initiated. Please complete the payment process.'
    });
  } catch (error) {
    console.error('Stripe payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Process PayPal payment
// @route   POST /api/donations/paypal
// @access  Public
const processPaypalPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { donorName, donorEmail, amount, isAnonymous, notes, userId } = req.body;

  try {
    // In a real scenario, you would integrate with PayPal SDK
    // For demonstration purposes, we'll simulate a successful transaction
    const transactionId = `paypal-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const db = req.app.locals.db;
    
    // Save donation record
    const [result] = await db.query(
      'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId || null, donorName, donorEmail, amount, 'paypal', transactionId, isAnonymous, notes]
    );
    
    res.status(201).json({
      success: true,
      donationId: result.insertId,
      transactionId,
      message: 'Payment initiated. Please complete the payment process.'
    });
  } catch (error) {
    console.error('PayPal payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to generate M-Pesa access token
const generateMpesaAccessToken = async () => {
  try {
    const consumer_key = process.env.MPESA_CONSUMER_KEY;
    const consumer_secret = process.env.MPESA_CONSUMER_SECRET;
    
    if (!consumer_key || !consumer_secret) {
      throw new Error('M-Pesa API credentials not configured');
    }
    
    const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');
    
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating M-Pesa access token:', error);
    throw error;
  }
};

// Helper function to format phone number for M-Pesa
const formatPhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // If the number starts with '0', replace with '254'
  if (digitsOnly.startsWith('0')) {
    return '254' + digitsOnly.substring(1);
  }
  
  // If the number doesn't start with '254', add it
  if (!digitsOnly.startsWith('254')) {
    return '254' + digitsOnly;
  }
  
  return digitsOnly;
};

// @desc    Process M-Pesa payment
// @route   POST /api/donations/mpesa
// @access  Public
const processMpesaPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { donorName, donorEmail, amount, phoneNumber, isAnonymous, notes, userId } = req.body;

  try {
    // Check if phoneNumber is provided since it's required for M-Pesa
    if (!phoneNumber) {
      return res.status(400).json({ 
        message: 'Phone number is required for M-Pesa payments',
        errors: [{ msg: 'Phone number is required for M-Pesa payments' }]
      });
    }

    // Format phone number for M-Pesa API
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    
    // Create transaction ID
    const transactionId = `mpesa-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Initiate the actual M-Pesa STK Push
    try {
      const accessToken = await generateMpesaAccessToken();
      
      const shortcode = process.env.MPESA_SHORTCODE;
      const passkey = process.env.MPESA_PASSKEY;
      
      if (!shortcode || !passkey) {
        throw new Error('M-Pesa shortcode or passkey not configured');
      }
      
      // Get timestamp in the format YYYYMMDDHHmmss
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
      
      // Create password
      const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
      
      // Make STK push request
      const stkPushResponse = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: Math.ceil(amount), // M-Pesa only accepts whole numbers
          PartyA: formattedPhoneNumber,
          PartyB: shortcode,
          PhoneNumber: formattedPhoneNumber,
          CallBackURL: `${process.env.FRONTEND_URL}/api/mpesa/callback`,
          AccountReference: transactionId,
          TransactionDesc: `Donation from ${donorName}`
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('M-Pesa STK push response:', stkPushResponse.data);
      
      // Store M-Pesa checkout request ID for future reference
      const checkoutRequestId = stkPushResponse.data.CheckoutRequestID;
      
      const db = req.app.locals.db;
      
      // Save donation record
      const [result] = await db.query(
        'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes, phone_number, mpesa_checkout_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId || null, donorName, donorEmail, amount, 'mpesa', transactionId, isAnonymous, notes, phoneNumber, checkoutRequestId]
      );
      
      res.status(201).json({
        success: true,
        donationId: result.insertId,
        transactionId,
        checkoutRequestId,
        message: 'Payment initiated. Please check your phone to complete the M-Pesa payment.'
      });
      
    } catch (mpesaError) {
      console.error('M-Pesa API error:', mpesaError.response?.data || mpesaError.message);
      
      // Fallback to simulating the transaction if API call fails
      console.log('Falling back to simulated M-Pesa transaction');
      
      const db = req.app.locals.db;
      
      // Save donation record
      const [result] = await db.query(
        'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId || null, donorName, donorEmail, amount, 'mpesa', transactionId, isAnonymous, notes, phoneNumber]
      );
      
      res.status(201).json({
        success: true,
        donationId: result.insertId,
        transactionId,
        message: 'M-Pesa API call failed. This is a simulated transaction. In production, you would receive a payment prompt on your phone.'
      });
    }
    
  } catch (error) {
    console.error('M-Pesa payment error:', error);
    res.status(500).json({ message: 'M-Pesa processing error: ' + (error.message || 'Unknown error') });
  }
};

// @desc    Process card payment (Visa, Mastercard)
// @route   POST /api/donations/card
// @access  Public
const processCardPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { donorName, donorEmail, amount, cardType, cardDetails, isAnonymous, notes, userId } = req.body;

  try {
    // In a real scenario, you would integrate with a payment processor
    // For demonstration purposes, we'll simulate a successful transaction
    const transactionId = `${cardType}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const db = req.app.locals.db;
    
    // Save donation record
    const [result] = await db.query(
      'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId || null, donorName, donorEmail, amount, cardType, transactionId, isAnonymous, notes]
    );
    
    res.status(201).json({
      success: true,
      donationId: result.insertId,
      transactionId,
      message: 'Payment successful!'
    });
  } catch (error) {
    console.error('Card payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get donation status
// @route   GET /api/donations/:id
// @access  Public
const getDonationStatus = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const donationId = req.params.id;
    
    const [donations] = await db.query('SELECT * FROM donations WHERE id = ?', [donationId]);
    
    if (donations.length === 0) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json(donations[0]);
  } catch (error) {
    console.error('Get donation status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update donation status
// @route   PUT /api/donations/:id/status
// @access  Private/Admin
const updateDonationStatus = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const donationId = req.params.id;
    const { status } = req.body;
    
    // Verify donation exists
    const [donations] = await db.query('SELECT * FROM donations WHERE id = ?', [donationId]);
    
    if (donations.length === 0) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Update donation status
    await db.query(
      'UPDATE donations SET status = ? WHERE id = ?',
      [status, donationId]
    );
    
    res.json({
      success: true,
      id: donationId,
      status
    });
  } catch (error) {
    console.error('Update donation status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get available payment methods
// @route   GET /api/payment-methods
// @access  Public
const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = [
      { id: 'visa', name: 'Visa', icon: '/payment-logos/visa.svg', enabled: true },
      { id: 'mastercard', name: 'Mastercard', icon: '/payment-logos/mastercard.svg', enabled: true },
      { id: 'stripe', name: 'Stripe', icon: '/payment-logos/stripe.svg', enabled: true },
      { id: 'paypal', name: 'PayPal', icon: '/payment-logos/paypal.svg', enabled: true },
      { id: 'mpesa', name: 'M-Pesa', icon: '/payment-logos/mpesa.svg', enabled: true }
    ];
    
    res.json(paymentMethods);
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  processStripePayment,
  processPaypalPayment,
  processMpesaPayment,
  processCardPayment,
  getDonationStatus,
  updateDonationStatus,
  getPaymentMethods
};
