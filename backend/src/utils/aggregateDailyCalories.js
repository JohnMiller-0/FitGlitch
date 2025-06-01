/**
 * @file dailyStats.js
 * @Project FitGlitch
 * @Author John Miller
 * @Date 2025-05
 * @Description Utility function to aggregate daily calories from a Mongoose model.
 */
const mongoose = require('mongoose');
/**
 * @function aggregateMeals
 * @description Aggregates total calories per day for a user from a given model (e.g., Meal or Workout).
 * Groups data by date and returns a sorted list of daily totals.
 *
 * @param {Model} Model - A Mongoose model to query (e.g., Meal or Workout).
 * @param {string} userId - The authenticated user's ID.
 * @param {Date|string} startDate - The start date of the aggregation range.
 * @param {Date|string} endDate - The end date of the aggregation range.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of objects with:
 *   - `date` (string): Date in YYYY-MM-DD format.
 *   - `totalCalories` (number): Total calories for that date.
 *
 * @example
 * [
 *   { date: "2025-05-28", totalCalories: 1800 },
 *   { date: "2025-05-29", totalCalories: 2100 }
 * ]
 */
const aggregateMeals = async (Model, userId, startDate, endDate) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return await Model.aggregate([
    {
      $match: {
        userId: objectId,
        date: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" }
        },
        totalCalories: { $sum: "$calories" }
      }
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        totalCalories: 1
      }
    }
  ]);
};

module.exports = aggregateMeals;