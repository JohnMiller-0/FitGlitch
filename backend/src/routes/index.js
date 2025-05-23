/*
    @File: index.js
    @Project: FitGlitch
    @Author: John Miller
    @Date: 2025-05
    @Purpose: This file is responsible for setting up the routes for the Express server.
    @Dependencies: express, express-jwt
*/

const express = require('express');
const router = express.Router();
const {expressjwt: jwt} = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const authController = require('../controllers/authentication');
const weightController = require('../controllers/weights');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/weights')
    .get(auth, weightController.weightsList)
    .post(auth, weightController.addWeight);

router
    .route('/weights/:id')
    .put(auth, weightController.editWeight)
    .delete(auth, weightController.deleteWeight);

module.exports = router;