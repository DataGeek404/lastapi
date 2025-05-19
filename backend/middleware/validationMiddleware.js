
const { check } = require('express-validator');

const userValidationRules = {
  register: [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  login: [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ]
};

const contactValidationRules = {
  contact: [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('subject', 'Subject is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty()
  ]
};

// Updated validation rules to match frontend form fields
const joinUsValidationRules = {
  joinUs: [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('role', 'Role is required').not().isEmpty(),
    check('experience', 'Experience is required').not().isEmpty(),
    check('motivation', 'Motivation is required').not().isEmpty()
  ]
};

const donationValidationRules = {
  donation: [
    check('donorName', 'Donor name is required').not().isEmpty(),
    check('donorEmail', 'Please include a valid email').isEmail(),
    check('amount', 'Amount must be a positive number').isFloat({ gt: 0 })
  ]
};

module.exports = {
  userValidationRules,
  contactValidationRules,
  joinUsValidationRules,
  donationValidationRules
};
