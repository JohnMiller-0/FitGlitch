/**
 * @file weight.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Defines the Weight schema, including userId, date, and weight fields.
 */

const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: {type: Date, required: true, default: Date.now },
    weight: {type: Number, required: true, min: 1 }});

// Create an index on userId and date for efficient querying
weightSchema.index({ userId: 1, date: -1 }, { unique: true });

const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;