/**
 * @file createMeal.ts
 * @project FitGlitch
 * @author John Miller
 * @interface CreateMeal
 * @property {string} date - The date of the meal in ISO format (YYYY-MM-DD).
 * @property {string} name - The name of the meal.
 * @property {number} calories - The total calories in the meal.
 * @property {string} [notes] - Optional notes about the meal.  
 * @description Defines the structure of a meal object used when creating a new meal.
 */
export interface CreateMeal {
    date: string; // ISO date string
    name: string; // Name of the meal
    calories: number; // Total calories in the meal
    notes?: string; // Optional notes about the meal
};
