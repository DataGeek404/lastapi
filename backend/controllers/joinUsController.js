
const JoinApplication = require('../models/JoinApplication');
const { validationResult } = require('express-validator');

// @desc    Submit a join us application
// @route   POST /api/join-us
// @access  Public
const submitApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, role, experience, motivation } = req.body;
  
  try {
    const application = new JoinApplication({
      name,
      email,
      phone,
      role,
      experience,
      motivation
    });
    
    const savedApplication = await application.save();
    
    res.status(201).json({
      success: true,
      applicationId: savedApplication._id,
      message: 'Your application has been received. We will review it and get back to you.'
    });
  } catch (error) {
    console.error('Join us application submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all join us applications
// @route   GET /api/join-us
// @access  Private/Admin
const getAllApplications = async (req, res) => {
  try {
    const applications = await JoinApplication.find({}).sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update application status
// @route   PUT /api/join-us/:id
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await JoinApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    application.status = req.body.status;
    
    const updatedApplication = await application.save();
    
    res.json({
      success: true,
      id: updatedApplication._id,
      status: updatedApplication.status
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  updateApplicationStatus
};
