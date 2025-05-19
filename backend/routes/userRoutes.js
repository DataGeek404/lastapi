
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { userValidationRules } = require('../middleware/validationMiddleware');

// Public routes
router.post('/register', userValidationRules.register, registerUser);
router.post('/login', userValidationRules.login, loginUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
