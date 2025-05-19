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

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.0.105:8080'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl, Postman) or matching frontend
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
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
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1);
  }
}

initialize();
