/*
    @purpose: user authentication controller for FitGlitch
    @Author: John Miller
    @Date: 2025-05
    @Dependencies: passport, mongoose, User model
    @description: This file contains the authentication logic for user registration and login.
    @exports: register and login functions
    @notes: 
        - The register function handles user registration, including input validation and password hashing.
        - The login function handles user login, including authentication using Passport.js.
        - Both functions return JSON responses with appropriate status codes and messages.
        - The register function checks for duplicate email addresses and returns an error if found.
        - The login function uses Passport.js to authenticate the user and return a JWT token if successful.
*/

const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');


const register = async (req, res) => {
    console.log("Register route hit");
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

const login = async (req, res) => {
        console.log("Login route hit");
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
                console.log("User authenticated successfully");
                console.log("Token generated: ", token);
                return res.status(200).json({token});
            } else {
                return res.status(401).json(info);
            }
        } )(req, res);
};

module.exports = {
    register,
    login
};