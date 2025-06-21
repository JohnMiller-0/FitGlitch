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

    const { email, password, goalWeight, caloricGoal, loseWeight } = req.body; // Destructure the request body to get user data
    if (!email || !password || !goalWeight || !caloricGoal || loseWeight === undefined) {
        return res.status(400).json({ message: 'All fields are required.' }); // Check if all required fields are provided
    } else if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' }); // Validate password length
    }

    const user = new User(); // Create a new User instance
    user.email = email; // Set the user's email
    user.goalWeight = goalWeight; // Set the user's goal weight
    user.caloricGoal = caloricGoal; // Set the user's daily caloric goal
    user.loseWeight = loseWeight; // Set the user's weight loss preference
    // Hash the password before saving
    await user.setPassword(password);

    try {
        await user.save(); // Save the user to the database
        const token = user.generateJWT(); // Generate a JWT token for the user
        return res.status(200).json({ token }); // Return the token in the response
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' }); // Handle duplicate email error
        }
        return res.status(500).json({ message: 'Internal server error' }); // Handle other server errors
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
        return res.status(400).json({"message" : "All fields are required."}); // Check if email and password are provided
    }
    
    passport.authenticate('local', (err, user, info) => {
        if(err)
        {
            console.log(err);
            return res.status(400).json(err); // Handle any errors that occurred during authentication
        }
            
        if(user)
        {
            const token = user.generateJWT(); // Generate a JWT token for the authenticated user
            
            // Uncomment the following lines to log the user and token for debugging
            // console.log("User authenticated successfully");
            // console.log("Token generated: ", token);
            
            return res.status(200).json({token}); // Return the token in the response
        } else {
            return res.status(401).json(info); // Return 401 Unauthorized if authentication fails
        }
    })(req, res);
};

/** * Retrieves user information including email.
 * - Uses the user ID from the request object to find the user info.
 * - Populates the userId field with the user's email.
 * 
 * @function
 * @param {Object} req - Express request object, populated with user data by Passport.js.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with user info or error message.
 */
const getUserInfo = async (req, res) => {
    const userId = req.auth._id; // Get user ID from the authenticated request
    console.log("User ID from request:", userId); // Log the user ID for debugging
    try {
        const user = await User.findById(userId).select('goalWeight caloricGoal loseWeight');
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Return 404 if user does not exist
        }
        const userInfo = {
            goalWeight: user.goalWeight,
            caloricGoal: user.caloricGoal,
            loseWeight: user.loseWeight
        };
        return res.status(200).json(userInfo); // Return user info
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: 'Internal server error' }); // Return 500 for server errors
    }
};

module.exports = {
    register,
    login,
    getUserInfo
};