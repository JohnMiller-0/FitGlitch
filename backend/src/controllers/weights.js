/*
    @File: weights.js
    @Project: FitGlitch
    @Author: John Miller
    @Date: 2025-05
    @Purpose: This file contains the controller functions for handling weight-related API requests.
*/
const Weight = require('../models/weight');


// /api/weights
const weightsList = async (req, res) => {

    if (!req.auth) {
        return res.status(401).json({ message: 'Unauthorized — missing payload' });
    }

    const userId = req.auth._id;
    console.log("User ID: ", userId);

    try {
        const weights = await Weight.find({ userId }).sort({ date: -1 });
        res.status(200).json(weights);
    } catch (err) {
        console.error("Error fetching weights: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// /api/addWeight
const addWeight = async (req, res) => {
    const userId = req.auth._id;
    var { weight, date } = req.body;

    date = normalizeToDateOnly(date);


    if (!weight || !date) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newWeight = new Weight({ userId, weight, date });
        await newWeight.save();
        console.log("New weight added: ", newWeight);
        res.status(201).json(newWeight);
    } catch (err) {
        console.error("Error adding weight: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// /api/editWeight/:id
const editWeight = async (req, res) => {
    const userId = req.auth._id;
    const weightId = req.params.id;
    var { weight, date } = req.body;

    date = normalizeToDateOnly(date);

    if (!weight || !date) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const updatedWeight = await Weight.findOneAndUpdate(
            { _id: weightId, userId },
            { weight, date },
            { new: true }
        );

        if (!updatedWeight) {
            return res.status(404).json({ message: 'Weight not found' });
        }

        console.log("Weight updated: ", updatedWeight);
        res.status(200).json(updatedWeight);
    } catch (err) {
        console.error("Error updating weight: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// /api/deleteWeight/:id
const deleteWeight = async (req, res) => {
    const userId = req.auth._id;
    const weightId = req.params.id;

    try {
        const deletedWeight = await Weight.findOneAndDelete({ _id: weightId, userId });

        if (!deletedWeight) {
            return res.status(404).json({ message: 'Weight not found' });
        }

        console.log("Weight deleted: ", deletedWeight);
        res.status(200).json(deletedWeight);
    } catch (err) {
        console.error("Error deleting weight: ", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const normalizeToDateOnly = (isoDate) => {
  const date = new Date(isoDate);
  date.setHours(0, 0, 0, 0);
  return date;
};

module.exports = {
    weightsList,
    addWeight,
    editWeight,
    deleteWeight
};
    