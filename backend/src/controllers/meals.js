/**
 * @file meals.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Controller functions for handling meal-related API requests.
 */

const Meal = require('../models/meal');

/**
 * Retrieves all meals for a specific user on a given date.
 * 
 * @function getMealsByDate
 * @param {Object} req - Express request object containing `auth._id` and `params.date`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with a list of meals or an error message.
 */
const getMealsByDate = async (req, res) => {
    const userId = req.auth._id;
    const date = req.params.date;
    
    // Fetch meals for the authenticated user within the specified date range
    try {
        const meals = await Meal.find({
            userId,
            date: date
        }).sort({ date: 1 });

        res.status(200).json(meals);
    } catch (err) {
        console.error("Error fetching meals: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Adds a new meal entry for the authenticated user.
 * 
 * @function addMeal
 * @param {Object} req - Express request object with body containing `date`, `name`, `calories`, and optional `notes`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the created meal or an error message.
 */
const addMeal = async (req, res) => {
    const userId = req.auth._id;
    let { date, name, calories, notes } = req.body;


    if (!date || !calories || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Try to create a new meal entry
    try {
        const newMeal = new Meal({
            userId,
            date: date,
            name,
            calories: parseInt(calories),
            notes: notes || ''
        });

        await newMeal.save();
        res.status(201).json(newMeal);
    } catch (err) {
        console.error("Error adding meal: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Retrieves a specific meal by its ID for the authenticated user.
 * 
 * @function getMealById
 * @param {Object} req - Express request object containing `params.id`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the meal data or an error message.
 */
const getMealById = async (req, res) => {
    const userId = req.auth._id;
    const mealId = req.params.id;

    try {
        const meal = await Meal.findOne({ _id: mealId, userId });

        if (!meal) {
            return res.status(404).json({ message: 'Meal not found.' });
        }

        res.status(200).json(meal);
    } catch (err) {
        console.error("Error fetching meal by ID: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Updates a specific meal entry for the authenticated user.
 * 
 * @function updateMeal
 * @param {Object} req - Express request object with `params.id` and updated fields in body.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the updated meal or an error message.
 */
const updateMeal = async (req, res) => {
    const userId = req.auth._id;
    const mealId = req.params.id;
    const { date, name, calories, notes } = req.body;

    // Try to update the meal entry
    try {
        const updatedMeal = await Meal.findOneAndUpdate(
            { _id: mealId, userId },
            { date, name, calories: parseInt(calories), notes },
            { new: true }
        );

        if (!updatedMeal) {
            return res.status(404).json({ message: 'Meal not found.' });
        }

        res.status(200).json(updatedMeal);
    } catch (err) {
        console.error("Error updating meal: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Deletes a specific meal entry for the authenticated user.
 * 
 * @function deleteMeal
 * @param {Object} req - Express request object with `params.id`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response confirming deletion or an error message.
 */
const deleteMeal = async (req, res) => {
    const userId = req.auth._id;
    const mealId = req.params.id;

    // Try to delete the meal entry
    try {
        const deletedMeal = await Meal.findOneAndDelete({ _id: mealId, userId }); // Find and delete the meal by ID and user ID

        if (!deletedMeal) {
            return res.status(404).json({ message: 'Meal not found.' }); // If no meal is found, return 404
        }

        res.status(200).json({ message: 'Meal deleted successfully.' }); // Return success message
    } catch (err) {
        console.error("Error deleting meal: ", err); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' }); // Return 500 for server errors
    }
};

module.exports = {
    getMealsByDate,
    addMeal,
    getMealById,
    updateMeal,
    deleteMeal
};