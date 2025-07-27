const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const uploadRoutes = require('./routes/uploadRoutes');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


const logger = require('./middlewares/logger');
const authMiddleware = require('./middlewares/authMiddleware');
const protectedRoutes = require('./routes/protectedRoutes');
const rateLimiter = require('./middlewares/rateLimiter');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json());

app.use('/api/protected', authMiddleware, protectedRoutes);
app.use('/uploads', express.static('uploads'));

app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use(compression());
app.use(errorHandler); 
app.use(rateLimiter);
app.use(helmet());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Welcome to the public API!');
});

module.exports = app;