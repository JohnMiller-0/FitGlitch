/*
    @Purpose: This file defines the Weight model for the MongoDB database.
    @Author: John Miller
    @Date: 2025-05
    @Dependencies: mongoose
    @Description: This file defines the schema for the Weight model, which includes userId, date, and weight fields.
    @Exports: Weight model
    @Notes: 
        - The userId field is a reference to the User model and is required.
        - The date field is required and defaults to the current date.
        - The weight field is required and must be a number.
        - An index is created on the userId and date fields for efficient querying.
        - The Weight model is exported for use in other parts of the application.
*/

const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: {type: Date, required: true, default: Date.now },
    weight: {type: Number, required: true, min: 1 }});

weightSchema.index({ userId: 1, date: -1 }, { unique: true });


const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;