/**
 * @file workout.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Defines the Workout schema, including userId, date, caloriesBurned, type, and notes fields.
 */

const mongoose = require('mongoose');

/**
 * Workout Schema
 * @typedef {Object} Workout
 * @property {ObjectId} userId - Reference to the User who created the workout.
 * @property {string} date - Date of the workout in YYYY-MM-DD format.
 * @property {number} calories - Calories burned during the workout, must be a non-negative number.
 * @property {string} type - Type of workout (e.g., running, cycling).
 * @property {string} notes - Optional notes about the workout.
 * * @description This schema defines the structure of the Workout model, including fields for userId, date, calories, type, and notes.
 * It includes validation for required fields and ensures that the date is in the correct format (YYYY-MM-DD).
 * The calories field must be a non-negative number, and the notes field is optional with a default value of an empty string.
 * An index is created on userId and date for efficient querying of workouts by user and date.
 */
const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
     date: { type: String, match:/^\d{4}-\d{2}-\d{2}$/,required: true }, // Date in YYYY-MM-DD format, stored as a string for simplicity
    calories: { type: Number, required: true, min: 0 }, // Calories burned during the workout
    type: { type: String, required: true }, // Type of workout (e.g., running, cycling)
    notes: { type: String, default: '' } // Optional notes about the workout
});

// Create an index on userId and date for efficient querying
workoutSchema.index({ userId: 1, date: -1 });

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;