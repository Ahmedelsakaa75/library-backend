import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './src/config/db.js';

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import bookRoutes from './src/routes/bookRoutes.js';
import wishlistRoutes from './src/routes/wishlistRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev')); // HTTP request logger

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Library API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: message
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});