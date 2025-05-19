const express = require('express');
const router = express.Router();
const { getPaymentMethods } = require('../controllers/donationController');

// Public routes
router.get('/', getPaymentMethods);

module.exports = router;
