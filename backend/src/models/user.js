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

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    goalWeight: { type: Number, required: true, min: 1 },
    caloricGoal: { type: Number, required: true, min: 1 },
    loseWeight: {type: Boolean, required: true }
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
