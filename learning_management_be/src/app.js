const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');
const logger = require('./utils/logger');
const morgan = require('morgan');

const userRoute = require('./routes/userRoute');
const courseRoute = require('./routes/courseRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

// Set up CORS with specific origins
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use('/users', userRoute);
app.use('/courses', courseRoute);
app.use('/admin', adminRoute);

// request logging with morgan & winston
app.use(morgan('combined', { stream: logger.stream }));

module.exports = app;