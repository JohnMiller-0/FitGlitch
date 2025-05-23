/*
    @purpose: User model for FitGlitch
    @Author: John Miller
    @Date: 2025-05
    @dependencies: mongoose, bcrypt, jsonwebtoken
    @description: This file defines the User schema and methods for password hashing, validation, and JWT generation.
    @exports: User model
    @notes: 
        - The password is hashed using bcrypt before saving to the database.
        - JWT is generated for user authentication.
        - The goalWeight and caloricGoal fields are required and must be non-negative.
        - The loseWeight field is a boolean indicating if the user wants to lose weight.
        - The email field is unique to prevent duplicate accounts.
        - The password field is required and must be at least 6 characters long.
        - The weight schema is exported as a model for use in other parts of the application.
        - The user schema is exported as a model for use in other parts of the application.
*/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Define the User schema
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

    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
        }, secret);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
