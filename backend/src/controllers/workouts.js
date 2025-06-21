/**
 * @file workouts.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Controller functions for handling workout-related API requests.
 */

const Workout = require('../models/workout');

/**
 * Retrieves all workouts for a specific user on a given date.
 * 
 * @function getWorkoutsByDate
 * @param {Object} req - Express request object, with `auth._id` and `params.date`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with a list of workouts or error message.
 */
const getWorkoutsByDate = async (req, res) => {
    const userId = req.auth._id;
    const date = req.params.date;

    console.log("Fetching workouts for user ID: ", userId, " on date: ", date);

    // Fetch workouts for the authenticated user within the specified date range
    try {
        const workouts = await Workout.find({
            userId,
            date: date
        }).sort({ date: -1 });

        res.status(200).json(workouts);
    } catch (err) {
        console.error("Error fetching workouts: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Adds a new workout entry for the authenticated user.
 * 
 * @function addWorkout
 * @param {Object} req - Express request object with body containing `date`, `calories`, `type`, and optional `notes`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the created workout or error message.
 */
const addWorkout = async (req, res) => {
    const userId = req.auth._id;
    const { date, calories, type, notes } = req.body;

    if (!date || !calories || !type) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new workout entry
    try {
        const newWorkout = new Workout({
            userId,
            date: date,
            calories: parseInt(calories),
            type,
            notes: notes || ''
        });

        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (err) {
        console.error("Error adding workout: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Retrieves a specific workout by its ID for the authenticated user.
 * 
 * @function getWorkoutById
 * @param {Object} req - Express request object with `params.id`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the workout or error message.
 */
const getWorkoutById = async (req, res) => {
    const userId = req.auth._id;
    const { id } = req.params;
    console.log("Fetching workout with ID: ", id);

    // Fetch the workout by ID for the authenticated user
    try {
        const workout = await Workout.findOne({ _id: id, userId });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found.' });
        }
        res.status(200).json(workout);
    } catch (err) {
        console.error("Error fetching workout: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Updates a specific workout entry for the authenticated user.
 * 
 * @function editWorkout
 * @param {Object} req - Express request object with `params.id` and body containing updated fields.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with updated workout or error message.
 */
const editWorkout = async (req, res) => {
    const userId = req.auth._id;
    const { id } = req.params;
    const { date, calories, type, notes } = req.body;

    if (!date || !calories || !type) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
 

    // Update the workout entry
    try {
        const workout = await Workout.findOneAndUpdate(
            { _id: id, userId },
            { date: date, calories: parseInt(calories), type, notes: notes || '' },
            { new: true }
        );

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found.' });
        }

        res.status(200).json(workout);
    } catch (err) {
        console.error("Error editing workout: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Deletes a specific workout entry for the authenticated user.
 * 
 * @function deleteWorkout
 * @param {Object} req - Express request object with `params.id`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response confirming deletion or error message.
 */
const deleteWorkout = async (req, res) => {
    const userId = req.auth._id;
    const { id } = req.params;

    // Delete the workout entry by ID for the authenticated user
    try {
        const workout = await Workout.findOneAndDelete({ _id: id, userId });

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found.' });
        }

        res.status(200).json(workout);
    } catch (err) {
        console.error("Error deleting workout: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getWorkoutsByDate,
    addWorkout,
    getWorkoutById,
    editWorkout,
    deleteWorkout
};