
const jwt = require('jsonwebtoken');

// Protect routes middleware
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const db = req.app.locals.db;
      const [users] = await db.query('SELECT id FROM users WHERE id = ?', [decoded.id]);
      
      if (users.length === 0) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // Set user in request
      req.user = { id: users[0].id };
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware (to be implemented with role-based permissions)
const admin = (req, res, next) => {
  // For now, all authenticated users are considered admins
  // In a real application, you would check for admin role in the database
  next();
};

module.exports = { protect, admin };
