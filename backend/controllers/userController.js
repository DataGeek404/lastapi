
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, address } = req.body;
  
  try {
    const db = req.app.locals.db;
    
    // Check if user exists
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, street, city, country) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address?.street || null, address?.city || null, address?.country || null]
    );
    
    // Get the inserted user
    const [users] = await db.query('SELECT id, name, email, street, city, country FROM users WHERE id = ?', [result.insertId]);
    const user = users[0];
    
    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
    
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: {
        street: user.street,
        city: user.city,
        country: user.country
      },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  try {
    const db = req.app.locals.db;
    
    // Check if user exists
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
    
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: {
        street: user.street,
        city: user.city,
        country: user.country
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const db = req.app.locals.db;
    
    const [users] = await db.query(
      'SELECT id, name, email, street, city, country FROM users WHERE id = ?',
      [req.user.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = users[0];
    
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: {
        street: user.street,
        city: user.city,
        country: user.country
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { name, email, password, address } = req.body;
    
    // Start building the query
    let query = 'UPDATE users SET';
    const values = [];
    
    // Add fields to update
    if (name) {
      query += ' name = ?,';
      values.push(name);
    }
    
    if (email) {
      query += ' email = ?,';
      values.push(email);
    }
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      query += ' password = ?,';
      values.push(hashedPassword);
    }
    
    if (address?.street !== undefined) {
      query += ' street = ?,';
      values.push(address.street);
    }
    
    if (address?.city !== undefined) {
      query += ' city = ?,';
      values.push(address.city);
    }
    
    if (address?.country !== undefined) {
      query += ' country = ?,';
      values.push(address.country);
    }
    
    // Remove trailing comma
    query = query.slice(0, -1);
    
    // Add WHERE clause
    query += ' WHERE id = ?';
    values.push(req.user.id);
    
    // Execute the update query
    await db.query(query, values);
    
    // Get the updated user
    const [users] = await db.query(
      'SELECT id, name, email, street, city, country FROM users WHERE id = ?',
      [req.user.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = users[0];
    
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: {
        street: user.street,
        city: user.city,
        country: user.country
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};
