/**
 * @file workout.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Defines the Workout schema, including userId, date, caloriesBurned, type, and notes fields.
 */

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: Date.now },
    calories: { type: Number, required: true, min: 0 }, // Calories burned during the workout
    type: { type: String, required: true }, // Type of workout (e.g., running, cycling)
    notes: { type: String, default: '' } // Optional notes about the workout
});

// Create an index on userId and date for efficient querying
workoutSchema.index({ userId: 1, date: -1 });

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;