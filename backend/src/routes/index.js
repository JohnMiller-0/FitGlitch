/**
 * @file index.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Sets up the routes for the Express server.
*/

const express = require('express');
const router = express.Router();
const {expressjwt: jwt} = require('express-jwt');

// Middleware to protect routes
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const authController = require('../controllers/authentication');
const weightController = require('../controllers/weights');

// Authentication routes
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);


// Weight routes (requires JWT authentication)
router
    .route('/weights')
    .get(auth, weightController.weightsList)
    .post(auth, weightController.addWeight);

router
    .route('/weights/:id')
    .put(auth, weightController.editWeight)
    .delete(auth, weightController.deleteWeight);

module.exports = router;