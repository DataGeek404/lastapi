const express = require('express');
const router = express.Router();
const { 
  submitContactForm, 
  getAllContactMessages, 
  updateContactMessageStatus 
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');
const { contactValidationRules } = require('../middleware/validationMiddleware');

// Public routes
router.post('/', contactValidationRules.contact, submitContactForm);

// Protected/Admin routes
router.get('/', protect, admin, getAllContactMessages);
router.put('/:id', protect, admin, updateContactMessageStatus);

module.exports = router;
