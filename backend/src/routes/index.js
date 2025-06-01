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
const workoutController = require('../controllers/workouts');
const mealController = require('../controllers/meals');
const dailyStatsController = require('../controllers/dailyStats');

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
    .get(auth, weightController.getWeight)
    .put(auth, weightController.editWeight)
    .delete(auth, weightController.deleteWeight);

// Workout routes (requires JWT authentication)
router
    .route('/workouts')
    .post(auth, workoutController.addWorkout);

router
    .route('/workouts/:date')
    .get(auth, workoutController.getWorkoutsByDate);

router
    .route('/workout/:id')
    .get(auth, workoutController.getWorkoutById)
    .put(auth, workoutController.editWorkout)
    .delete(auth, workoutController.deleteWorkout);

// Meal routes (requires JWT authentication)
router
    .route('/meals')
    .post(auth, mealController.addMeal);

router
    .route('/meals/:date')
    .get(auth, mealController.getMealsByDate);

router
    .route('/meal/:id')
    .get(auth, mealController.getMealById)
    .put(auth, mealController.updateMeal)
    .delete(auth, mealController.deleteMeal);

// Daily stats route (requires JWT authentication)
router
    .route('/net-calories')
    .get(auth, dailyStatsController.netDailyCalories);


module.exports = router;