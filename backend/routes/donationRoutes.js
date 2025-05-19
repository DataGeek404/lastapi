
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

// Protected/Admin routes
router.put('/:id/status', protect, admin, updateDonationStatus);

module.exports = router;
