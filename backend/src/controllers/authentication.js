/**
 * @file authentication.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Contains the authentication logic for user registration and login.
 */

const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

/**
 * Registers a new user.
 * - Validates input fields including email, password, and goals.
 * - Ensures password is at least 6 characters.
 * - Hashes the password and stores user in the database.
 * - Returns a signed JWT token on successful registration.
 * 
 * @function
 * @param {Object} req - Express request object containing user registration data in `body`.
 * @param {string} req.body.email - User's email address.
 * @param {string} req.body.password - User's password.
 * @param {number} req.body.goalWeight - User's goal weight.
 * @param {number} req.body.caloricGoal - User's daily caloric goal.
 * @param {boolean} req.body.loseWeight - Whether the user wants to lose weight.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with a JWT token or error message.
 */
const register = async (req, res) => {
    // Uncomment the following line to log the request body for debugging
    // console.log("Register route hit");

    const { email, password, goalWeight, caloricGoal, loseWeight } = req.body;
    if (!email || !password || !goalWeight || !caloricGoal || loseWeight === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
    } else if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const user = new User();
    user.email = email;
    user.goalWeight = goalWeight;
    user.caloricGoal = caloricGoal;
    user.loseWeight = loseWeight;
    // Hash the password before saving
    await user.setPassword(password);

    try {
        await user.save();
        const token = user.generateJWT();
        return res.status(200).json({ token });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    };

};

/**
 * Logs in an existing user.
 * - Authenticates user with Passport.js local strategy.
 * - On success, returns a signed JWT token.
 * 
 * @function
 * @param {Object} req - Express request object containing login credentials in `body`.
 * @param {string} req.body.email - User's email address.
 * @param {string} req.body.password - User's password.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with a JWT token or error message.
 */
const login = async (req, res) => {
    // Uncomment the following line to log the request body for debugging    
    // console.log("Login route hit");

     if(!req.body.email || !req.body.password)
    {
        return res.status(400).json({"message" : "All fields are required."});
    }
    
    passport.authenticate('local', (err, user, info) => {
        if(err)
        {
            console.log(err);
            return res.status(400).json(err);
        }
            
        if(user)
        {
            const token = user.generateJWT();
            
            // Uncomment the following lines to log the user and token for debugging
            // console.log("User authenticated successfully");
            // console.log("Token generated: ", token);
            
            return res.status(200).json({token});
        } else {
            return res.status(401).json(info);
        } }) (req, res);
};

module.exports = {
    register,
    login
};