/*
    @File: passport.js
    @Project: FitGlitch
    @Author: John Miller
    @Date: 2025-05
    @Purpose: This file is responsible for implementing the authentication logic using Passport.js.
    @Dependencies: passport, mongoose, User model
    @Description: 
        - Implements the local strategy for user authentication.
        - Validates user credentials and returns the user object if valid.
        - Exports the configured Passport instance for use in other parts of the application.
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');


passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      console.log("Passport strategy triggered with:", username);
      
      try {
        const user = await User.findOne({ email: username });
  
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        const isValid = await user.validatePassword(password);

        if (!isValid) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));