/**
 * @file dailyStats.js
 * @project FitGlitch
 * @author John Miller
 * @date 2025-05
 * @description Controller for aggregating daily net calorie data, including calories
 * consumed from meals and burned from workouts. Compares net intake to user's caloric goal.
 */

const aggregateDailyCalories = require('../utils/aggregateDailyCalories');
const Workout = require('../models/workout');
const Meal = require('../models/meal');
const User = require('../models/user');

/**
 * Aggregates and returns net daily calorie statistics for the authenticated user over a given date range.
 * 
 * Calculates daily totals for:
 * - Calories consumed (meals)
 * - Calories burned (workouts)
 * - Net calories (consumed - burned)
 * - Progress against the user's caloric goal
 * 
 * @function netDailyCalories
 * @param {Object} req - Express request object containing:
 *   - `auth._id`: The authenticated user's ID (from JWT middleware)
 *   - `query.baseStart`: The start date of the range (YYYY-MM-DD format)
 *   - `query.baseEnd`: The end date of the range (YYYY-MM-DD format)
 * @param {Object} res - Express response object used to return daily summaries or an error
 * @returns {Object[]} - JSON response containing an array of daily stats:
 *   - `date`: ISO string for the day
 *   - `caloriesConsumed`: Total calories consumed via meals
 *   - `caloriesBurned`: Total calories burned via workouts
 *   - `netCalories`: Net total (consumed - burned)
 *   - `goal`: User's caloric goal
 *   - `difference`: Difference between goal and net calories
 */
const netDailyCalories = async (req, res) => {
  const userId = req.auth._id;
  const { baseStart, baseEnd } = req.query;

  const startDate = new Date(`${baseStart}T00:00:00Z`);
  const endDate = new Date(`${baseEnd}T23:59:59.999Z`);

  // Validate date range
  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start date and end date are required.' });
  }

  try {
    const user = await User.findById(userId).select('caloricGoal');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    };
   
    // Aggregate daily calories consumed from meals and burned from workouts
    const workouts = await aggregateDailyCalories(Workout, userId, startDate, endDate);
    const meals = await aggregateDailyCalories(Meal, userId, startDate, endDate);

    // Create a map for quick lookup of workout calories by date
    const workoutMap = new Map(workouts.map(workout => [workout.date, workout.totalCalories]));

    // Prepare the daily stats by combining meal and workout data
    const dailyStats = meals.map(({ date, totalCalories }) => {
      // Get the calories burned from workouts for the same date
      const workoutCalories = workoutMap.get(date) || 0;
      // Calculate net calories (calories consumed - calories burned)
      const netCalories = totalCalories - workoutCalories;
      // Calculate the difference from the user's caloric goal
      const goalProgress = user.caloricGoal - netCalories;

      // Return the daily stats object
      return {
        date,
        caloriesConsumed: totalCalories,
        caloriesBurned: workoutCalories,
        netCalories,
        goal: user.calorieGoal,
        difference: goalProgress
      };
    });

    res.status(200).json(dailyStats);
  } catch (error) {
    console.error("Error fetching daily stats: ", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { netDailyCalories };