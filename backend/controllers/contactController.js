
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
    const db = req.app.locals.db;
    
    const [result] = await db.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    
    res.status(201).json({
      success: true,
      messageId: result.insertId,
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
    const db = req.app.locals.db;
    
    const [messages] = await db.query(
      'SELECT * FROM contact_messages ORDER BY submitted_at DESC'
    );
    
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
    const db = req.app.locals.db;
    const messageId = req.params.id;
    const { status } = req.body;
    
    // Verify message exists
    const [messages] = await db.query('SELECT * FROM contact_messages WHERE id = ?', [messageId]);
    
    if (messages.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    // Update message status
    await db.query(
      'UPDATE contact_messages SET status = ? WHERE id = ?',
      [status, messageId]
    );
    
    res.json({
      success: true,
      id: messageId,
      status
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
