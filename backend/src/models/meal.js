/**
 * @file
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Defines the Meal schema, including userId, date, name, calories, and notes fields.
 */

const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: Date.now },
    name: { type: String, required: true }, // Name of the meal (e.g., breakfast, lunch, dinner)
    calories: { type: Number, required: true, min: 1 }, // Total calories in the meal
    notes: { type: String, default: '' } // Optional notes about the meal
});

// Create an index on userId and date for efficient querying
mealSchema.index({ userId: 1, date: -1 });

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;