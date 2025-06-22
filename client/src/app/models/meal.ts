/**
 * @file meal.ts
 * @project FitGlitch
 * @author John Miller
 * @interface Meal
 * @property {string} _id - The unique identifier for the meal.
 * @property {string} date - The date of the meal in ISO format (YYYY-MM-DD).
 * @property {string} name - The name of the meal.
 * @property {number} calories - The total calories in the meal.
 * @property {string} [notes] - Optional notes about the meal.
 * @description
 * This interface defines the structure of a meal object used in the FitGlitch application.
 */
export interface Meal {
    _id: string; 
    date: string; // ISO date string
    name: string; // Name of the meal
    calories: number; // Total calories in the meal
    notes?: string; // Optional notes about the meal
};
