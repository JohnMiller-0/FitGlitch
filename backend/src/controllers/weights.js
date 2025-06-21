/**
 * @file weights.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Controller functions for handling weight-related API requests.
 */


const Weight = require('../models/weight');

/**
 * GET /api/weights
 * Retrieves a list of weight entries for the authenticated user.
 * @param {Object} req - Express request object, must include `auth` with user ID.
 * @param {Object} res - Express response object.
 * @returns {Object[]} JSON array of weight entries or error response.
 */
const weightsList = async (req, res) => {
    const userId = req.auth._id;
    
    // Uncomment the following line to log the user ID for debugging
    // console.log("User ID: ", userId);

    // Fetch the weights for the authenticated user from the database
    try {
        const weights = await Weight.find({ userId }).sort({ date: -1 });
        res.status(200).json(weights);
    } catch (err) {
        console.error("Error fetching weights: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/weights/recent
 * Retrieves the most recent weight entry for the authenticated user.
 * @param {Object} req - Express request object, must include `auth` with user ID.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object of the most recent weight entry or error response. 
 */
const getMostRecentWeight = async (req, res) => {
    const userId = req.auth._id;

    // Fetch the most recent weight entry for the authenticated user
    try {
        const mostRecentWeight = await Weight.findOne({ userId }).sort({ date: -1 });
        if (!mostRecentWeight) {
            return res.status(404).json({ message: 'No weight entries found' });
        }
        res.status(200).json(mostRecentWeight);
    } catch (err) {
        console.error("Error fetching most recent weight: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * POST /api/weights
 * Adds a new weight entry for the authenticated user.
 * Enforces one entry per user per day via unique index on { userId, date }.
 * @param {Object} req - Express request object with weight and date in body.
 * @param {Object} res - Express response object.
 * @returns {Object} Newly created weight entry or error response.
 */
const addWeight = async (req, res) => {
    const userId = req.auth._id;
    const { weight, date } = req.body;
    
    // Check if all required fields are present
    // If any field is missing, return a 400 status with an error message
    if (!weight || !date) {
        return res.status(400).json({ message: 'All fields are required.' });
    };

    // try to create a new weight entry
    // Enforces one weight entry per user per day via a compound unique index on { userId, date } in the Weight schema
    // If the entry already exists, return a 409 status with an error message
    try {
        const newWeight = new Weight({ userId, weight, date });
        await newWeight.save();
        
        // Uncomment the following line to log the new weight for debugging
        // console.log("New weight added: ", newWeight);
        
        res.status(201).json(newWeight);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Weight entry already exists for this date' });
        }
        console.error("Error adding weight: ", err);
        res.status(500).json({ message: 'Internal server error' });
    };
};

/**
 * Retrieves a specific weight entry by ID for the authenticated user.
 *
 * @param {Object} req - The request object containing auth info and route parameters.
 * @param {Object} res - The response object used to return data or error messages.
 * @returns {Object} - JSON response with the weight entry or an error message.
 */
const getWeight = async (req, res) => {
    const userId = req.auth._id;
    const weightId = req.params.weightId;

    try {
        // Find the weight entry by ID and confirm it belongs to the authenticated user
        // DEBUG: Uncomment to log the user ID and date range being queried
        // console.log("Fetching weight for user ID: ", userId, " on date: ", startDate, " and", endDate);
        const weight = await Weight.findOne({ weightId, userId});
        if (!weight) {
            return res.status(404).json({ message: 'Weight not found' });
        }

        // DEBUG: Uncomment to log retrieved weight entry
        // console.log("Weight fetched: ", weight);
        
        return res.status(200).json(weight);
    } catch (err) {
        console.error("Error fetching weight: ", err);
        return res.status(500).json({ message: 'Internal server error' });
    };
};

/**
 * PUT /api/weights/:id
 * Updates an existing weight entry for the authenticated user.
 * @param {Object} req - Express request object with updated weight and date.
 * @param {Object} res - Express response object.
 * @returns {Object} Updated weight entry or error response.
 */
const editWeight = async (req, res) => {
    const userId = req.auth._id;
    const weightId = req.params.id;
    var { weight, date } = req.body;

    // Check if all required fields are present
    // If any field is missing, return a 400 status with an error message
    if (!weight || !date) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    // try to update the weight entry
    // If the entry does not exist, return a 404 status with an error message
    try {
        const updatedWeight = await Weight.findOneAndUpdate(
            { _id: weightId, userId }, // Ensure the weight entry belongs to the authenticated user
            { weight, date }, // Update the weight and date fields
            { new: true } // Return the updated document
        );

        if (!updatedWeight) {
            return res.status(404).json({ message: 'Weight not found' });
        }
        
        // Uncomment the following line to log the updated weight for debugging
        // console.log("Weight updated: ", updatedWeight);
        
        res.status(200).json(updatedWeight);
    } catch (err) {
        console.error("Error updating weight: ", err);
        res.status(500).json({ message: 'Internal server error' });
    };
};

/**
 * DELETE /api/weights/:id
 * Deletes a weight entry for the authenticated user.
 * @param {Object} req - Express request object with weight ID in params.
 * @param {Object} res - Express response object.
 * @returns {Object} Deleted weight entry or error response.
 */
const deleteWeight = async (req, res) => {
    const userId = req.auth._id;
    const weightId = req.params.id;

    // try to delete the weight entry
    // If the entry does not exist, return a 404 status with an error message
    try {
        const deletedWeight = await Weight.findOneAndDelete({ _id: weightId, userId });

        if (!deletedWeight) {
            return res.status(404).json({ message: 'Weight not found' });
        }
        // Uncomment the following line to log the deleted weight for debugging
        // console.log("Weight deleted: ", deletedWeight);
        
        res.status(200).json(deletedWeight);
    } catch (err) {
        console.error("Error deleting weight: ", err);
        res.status(500).json({ message: 'Internal server error' });
    };
};



module.exports = {
    weightsList,
    addWeight,
    editWeight,
    deleteWeight,
    getWeight,
    getMostRecentWeight
};
    