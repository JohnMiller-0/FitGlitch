/**
 * @file DailyStat.ts
 * @project FitGlitch
 * @author John Miller
 * @interface DailyStat
 * @property {string} date - The date in ISO format (YYYY-MM-DD).
 * @property {number} caloriesConsumed - Total calories consumed on that date.
 * @property {number} caloriesBurned - Total calories burned through exercise on that date.
 * @property {number} netCalories - The net calories for the day (caloriesConsumed - caloriesBurned).
 * @property {number} goal - The user's daily calorie goal.
 * @property {number} difference - The difference between netCalories and goal (goal - netCalories).
 * @description
 * This interface defines the structure of a daily statistics object used to track a user's
 * calorie intake, expenditure, and net calories, along with their daily calorie goal and
 * the difference from that goal.
 */
export interface DailyStat {
    date: string; // ISO date string
    caloriesConsumed: number;
    caloriesBurned: number;
    netCalories: number; // caloriesConsumed - caloriesBurned
    goal: number; // daily calorie goal
    difference: number; // goal - netCalories
}