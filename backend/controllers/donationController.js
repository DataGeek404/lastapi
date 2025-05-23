

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
    
    // Create a payment intent with Stripe - production mode
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires amount in cents
      currency: 'usd',
      description: `Donation from ${donorName}`,
      receipt_email: donorEmail
    });
    
    // Save donation record
    const [result] = await db.query(
      'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId || null, donorName, donorEmail, amount, 'stripe', paymentIntent.id, isAnonymous, notes, 'pending']
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
    // In production, integrate with PayPal SDK
    // For now, we'll create a proper transaction ID
    const transactionId = `paypal-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const db = req.app.locals.db;
    
    // Save donation record with pending status
    const [result] = await db.query(
      'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId || null, donorName, donorEmail, amount, 'paypal', transactionId, isAnonymous, notes, 'pending']
    );
    
    // Here we would redirect to PayPal in production
    res.status(201).json({
      success: true,
      donationId: result.insertId,
      transactionId,
      paypalUrl: `https://www.paypal.com/checkoutnow?token=${transactionId}`,
      message: 'Redirecting to PayPal to complete your donation.'
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
    
    // Production URL for M-Pesa OAuth token
    const response = await axios({
      method: 'get',
      url: 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.data || !response.data.access_token) {
      console.error('Invalid M-Pesa token response:', response.data);
      throw new Error('Failed to generate M-Pesa access token');
    }
    
    console.log('M-Pesa token generated successfully');
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating M-Pesa access token:', error.response?.data || error.message);
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
    
    // Initiate the actual M-Pesa STK Push in production
    try {
      // Generate fresh token for each request
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
      
      // Set proper callback URL - using the FRONTEND_URL environment variable
      // Make sure it ends with /api/mpesa/callback
      const callbackUrl = `${process.env.FRONTEND_URL}/api/mpesa/callback`;
      
      console.log('Initiating M-Pesa STK push with token:', accessToken.substring(0, 10) + '...');
      console.log('Using phone number:', formattedPhoneNumber);
      
      // Make production STK push request - using production URL
      const stkPushResponse = await axios({
        method: 'post',
        url: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: Math.ceil(amount), // M-Pesa only accepts whole numbers
          PartyA: formattedPhoneNumber,
          PartyB: shortcode,
          PhoneNumber: formattedPhoneNumber,
          CallBackURL: callbackUrl,
          AccountReference: transactionId,
          TransactionDesc: `Donation from ${donorName}`
        }
      });
      
      console.log('M-Pesa STK push response:', stkPushResponse.data);
      
      // Store M-Pesa checkout request ID for future reference
      const checkoutRequestId = stkPushResponse.data.CheckoutRequestID;
      
      const db = req.app.locals.db;
      
      // Save donation record with pending status
      const [result] = await db.query(
        'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes, phone_number, mpesa_checkout_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId || null, donorName, donorEmail, amount, 'mpesa', transactionId, isAnonymous, notes, phoneNumber, checkoutRequestId, 'pending']
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
      
      // No fallback in production, return actual error
      res.status(500).json({ 
        message: 'M-Pesa payment processing error. Please try again or contact support.',
        error: mpesaError.message 
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
    // In production, integrate with a payment processor
    // Use Stripe for card processing (Visa/Mastercard)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires amount in cents
      currency: 'usd',
      description: `${cardType} Donation from ${donorName}`,
      receipt_email: donorEmail
    });
    
    const transactionId = paymentIntent.id;
    const db = req.app.locals.db;
    
    // Save donation record with pending status
    const [result] = await db.query(
      'INSERT INTO donations (user_id, donor_name, donor_email, amount, payment_method, transaction_id, is_anonymous, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId || null, donorName, donorEmail, amount, cardType, transactionId, isAnonymous, notes, 'pending']
    );
    
    res.status(201).json({
      success: true,
      donationId: result.insertId,
      transactionId,
      clientSecret: paymentIntent.client_secret,
      message: 'Please complete your card payment.'
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
