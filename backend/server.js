/*
    @File: server.js
    @Project: FitGlitch
    @Author: John Miller
    @Date: 2025-05
    @Purpose: Sets up the Express server, MongoDB connection, middleware, CORS policy, routes, and error handling.
*/

require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

// Load configurations and models
require('./src/models/user');
require('./src/models/db');
require('./src/models/weight');
require('./src/config/passport');

// Load API routes
const apiRouter = require('./src/routes/index'); 
// Initialize Express app
const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// CORS configuration
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

// Mount API routes
app.use('/api', apiRouter);

// JWT error handling (e.g. from express-jwt)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid token' });
    }
    next(err);
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// General error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});

module.exports = app;