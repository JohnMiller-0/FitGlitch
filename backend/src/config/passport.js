/**
 * @file passport.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Configures Passport.js for local strategy authentication.
*/ 

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

/**
 * Configures Passport's local strategy to authenticate users by email and password.
 * 
 * @function
 * @param {string} username - The user's email address (provided via `usernameField`).
 * @param {string} password - The plaintext password to validate.
 * @param {function} done - Passport callback function to return results.
 * @returns {void}
 */
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      // Uncomment the following line to log the username for debugging
      // console.log("Passport strategy triggered with:", username);
      
      try {
        const user = await User.findOne({ email: username }); // Find user by email
  
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' }); // User not found
        }
  
        const isValid = await user.validatePassword(password); // Validate the password

        if (!isValid) {
          return done(null, false, { message: 'Incorrect password.' }); // Password is invalid
        }

        return done(null, user); // Authentication successful, return user object
      } catch (err) {
        return done(err); // Handle any errors that occurred during the process
      }
    }
  ));