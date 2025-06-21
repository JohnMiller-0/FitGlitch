/**
 * @file
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Defines the Meal schema, including userId, date, name, calories, and notes fields.
 */

const mongoose = require('mongoose');
/**
 * Meal Schema
 * @typedef {Object} Meal
 * @property {ObjectId} userId - Reference to the User who created the meal.
 * @property {string} date - Date of the meal in YYYY-MM-DD format.
 * @property {string} name - Name of the meal (e.g., breakfast, lunch, dinner).
 * @property {number} calories - Total calories in the meal, must be a positive number.
 * @property {string} notes - Optional notes about the meal.
 * @description This schema defines the structure of the Meal model, including fields for userId, date, name, calories, and notes.
 * It includes validation for required fields and ensures that the date is in the correct format (YYYY-MM-DD).
 * The calories field must be a positive number, and the notes field is optional with a default value of an empty string.
 * An index is created on userId and date for efficient querying of meals by user and date.
 */
const mealSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, match:/^\d{4}-\d{2}-\d{2}$/,required: true }, // Date in YYYY-MM-DD format, stored as a string for simplicity
    name: { type: String, required: true }, // Name of the meal (e.g., breakfast, lunch, dinner)
    calories: { type: Number, required: true, min: 1 }, // Total calories in the meal
    notes: { type: String, default: '' } // Optional notes about the meal
});

// Create an index on userId and date for efficient querying
mealSchema.index({ userId: 1, date: -1 });

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;