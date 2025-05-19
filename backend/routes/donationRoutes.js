
const express = require('express');
const router = express.Router();
const { 
  processStripePayment, 
  processPaypalPayment,
  processMpesaPayment,
  processCardPayment,
  getDonationStatus,
  updateDonationStatus
} = require('../controllers/donationController');
const { protect, admin } = require('../middleware/authMiddleware');
const { donationValidationRules } = require('../middleware/validationMiddleware');

// Public routes
router.post('/stripe', donationValidationRules.donation, processStripePayment);
router.post('/paypal', donationValidationRules.donation, processPaypalPayment);
router.post('/mpesa', donationValidationRules.donation, processMpesaPayment);
router.post('/card', donationValidationRules.donation, processCardPayment);
router.get('/:id', getDonationStatus);

// M-Pesa callback route
router.post('/mpesa/callback', (req, res) => {
  console.log('M-Pesa callback received:', req.body);
  // Process the callback data from M-Pesa
  // In production, you'd update the donation status based on this callback
  res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
});

// Protected/Admin routes
router.put('/:id/status', protect, admin, updateDonationStatus);

module.exports = router;
