const express = require('express');
const apiRouter = require('./routes');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Global Middleware
app.use(express.json());

// Versioned API
app.use('/api/v1', apiRouter);

// 404 Middleware
app.use(notFound);

// Error Middleware
app.use(errorHandler);

module.exports = app;