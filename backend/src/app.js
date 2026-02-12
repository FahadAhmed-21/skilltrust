const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { initializeFirebase } = require('./config/firebase');

// Initialize Firebase
initializeFirebase();

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const nftRoutes = require('./routes/nftRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'SkillTrust API is running!' });
});

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/nfts', nftRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});