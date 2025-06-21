/**
 * @file weight.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Defines the Weight schema, including userId, date, and weight fields.
 */

const mongoose = require('mongoose');

/**
 * Weight Schema
 * @typedef {Object} Weight
 * @property {ObjectId} userId - Reference to the User who recorded the weight.
 * @property {string} date - Date of the weight entry in YYYY-MM-DD format.
 * @property {number} weight - Weight in pounds, must be a positive number.
 * @description This schema defines the structure of the Weight model, including fields for userId,
 * date, and weight. It includes validation for required fields and ensures that the date is in the correct format (YYYY-MM-DD).
 * The weight field must be a positive number, and an index is created on userId and date for efficient querying of weight entries by user and date.
 */
const weightSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    date: { type: String, match:/^\d{4}-\d{2}-\d{2}$/,required: true }, // Date in YYYY-MM-DD format, stored as a string for simplicity
    weight: {type: Number, required: true, min: 1 }}); // Weight in pounds, must be a positive number

// Create an index on userId and date for efficient querying
weightSchema.index({ userId: 1, date: -1 }, { unique: true });

const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;