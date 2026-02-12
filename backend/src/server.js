const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { initializeFirebase } = require('./config/firebase');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

// Routes
const userRoutes = require('./routes/userRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const courseRoutes = require('./routes/courseRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const nftRoutes = require('./routes/nftRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase
initializeFirebase();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/nft', nftRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 SkillTrust Backend running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;