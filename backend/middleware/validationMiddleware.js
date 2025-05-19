
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

const donationValidationRules = {
  donation: [
    check('amount', 'Amount is required and must be a number').isNumeric(),
    check('donorInfo.name', 'Donor name is required').not().isEmpty(),
    check('donorInfo.email', 'Please include a valid email').isEmail()
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

const joinUsValidationRules = {
  joinUs: [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
    check('experience', 'Experience information is required').not().isEmpty(),
    check('motivation', 'Motivation information is required').not().isEmpty()
  ]
};

module.exports = {
  userValidationRules,
  donationValidationRules,
  contactValidationRules,
  joinUsValidationRules
};
