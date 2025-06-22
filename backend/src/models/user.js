/**
 * @file user.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Defines the User schema and methods for password hashing, validation, and JWT generation.
 * @dependencies bcrypt, jsonwebtoken
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

/**
 * User Schema
 * @typedef {Object} User
 * @property {string} email - User's email address, must be unique.
 * @property {string} password - User's password, must be hashed.
 * @property {number} goalWeight - User's target weight, must be a positive number
 * @property {number} caloricGoal - User's daily caloric intake goal, must be a positive number.
 * @property {boolean} loseWeight - Indicates if the user wants to lose weight.
 * @description This schema defines the structure of the User model, including fields for email, password, goal weight, caloric goal, and whether the user wants to lose weight.
 * It also includes methods for setting and validating passwords, as well as generating a JWT token for user authentication.
 * The password is hashed using bcrypt before saving to the database, and the JWT token is signed with a secret key for secure user authentication.
 * The token includes the user's ID, email, and an expiration date set to 7 days from the time of generation.
 */
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // User's email address, must be unique
    password: { type: String, required: true }, // User's password, must be hashed
    goalWeight: { type: Number, required: true, min: 1 }, // User's target weight, must be a positive number
    caloricGoal: { type: Number, required: true, min: 1 }, // User's daily caloric intake goal, must be a positive number
    loseWeight: {type: Boolean, required: true } // Indicates if the user wants to lose weight
});

// Use Bcrypt to hash the password before saving
userSchema.methods.setPassword = async function(password) {
    this.password = await bcrypt.hash(password, saltRounds);
};

// Method to check if the password is valid
userSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate a JWT token
userSchema.methods.generateJWT = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // Token expires in 7 days

    // Generate the JWT token with user ID, email, and expiration date
    // The token is signed with the secret key
    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
        }, secret);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
