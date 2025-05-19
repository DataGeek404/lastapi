
const express = require('express');
const router = express.Router();
const { 
  submitApplication, 
  getAllApplications, 
  updateApplicationStatus 
} = require('../controllers/joinUsController');
const { protect, admin } = require('../middleware/authMiddleware');
const { joinUsValidationRules } = require('../middleware/validationMiddleware');

// Public routes
router.post('/', joinUsValidationRules.joinUs, submitApplication);

// Protected/Admin routes
router.get('/', protect, admin, getAllApplications);
router.put('/:id', protect, admin, updateApplicationStatus);

module.exports = router;
