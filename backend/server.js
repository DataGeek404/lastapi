const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Make the pool accessible to other modules
app.locals.db = pool;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Define routes
const contactRoutes = require('./routes/contactRoutes');
const joinUsRoutes = require('./routes/joinUsRoutes');
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');

app.use('/api/contact', contactRoutes);
app.use('/api/join-us', joinUsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);

// Base route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message || 'An unknown error occurred!' });
});

// Initialize MySQL Database and Start Server
async function initialize() {
  try {
    // Test database connection
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();
    
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1);
  }
}

initialize();
