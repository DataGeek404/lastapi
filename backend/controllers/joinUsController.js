
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
    const db = req.app.locals.db;
    
    const [result] = await db.query(
      'INSERT INTO join_applications (name, email, phone, role, experience, motivation) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, role, experience, motivation]
    );
    
    res.status(201).json({
      success: true,
      applicationId: result.insertId,
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
    const db = req.app.locals.db;
    
    const [applications] = await db.query(
      'SELECT * FROM join_applications ORDER BY applied_at DESC'
    );
    
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
    const db = req.app.locals.db;
    const applicationId = req.params.id;
    const { status } = req.body;
    
    // Verify application exists
    const [applications] = await db.query('SELECT * FROM join_applications WHERE id = ?', [applicationId]);
    
    if (applications.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Update application status
    await db.query(
      'UPDATE join_applications SET status = ? WHERE id = ?',
      [status, applicationId]
    );
    
    res.json({
      success: true,
      id: applicationId,
      status
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
