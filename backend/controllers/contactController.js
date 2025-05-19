
const ContactMessage = require('../models/ContactMessage');
const { validationResult } = require('express-validator');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;
  
  try {
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });
    
    const savedMessage = await contactMessage.save();
    
    res.status(201).json({
      success: true,
      messageId: savedMessage._id,
      message: 'Your message has been received. We will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ submittedAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update contact message status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContactMessageStatus = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    message.status = req.body.status;
    
    const updatedMessage = await message.save();
    
    res.json({
      success: true,
      id: updatedMessage._id,
      status: updatedMessage.status
    });
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitContactForm,
  getAllContactMessages,
  updateContactMessageStatus
};
