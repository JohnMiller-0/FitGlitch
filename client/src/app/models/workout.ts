/**
 * @file workout.ts
 * @project FitGlitch
 * @author John Miller
 * @interface Workout
 * @property {string} _id - Unique identifier for the workout.
 * @property {string} date - The date of the workout in ISO format (YYYY-MM-DD).
 * @property {number} calories - Total calories burned in the workout. 
 * @property {string} type - Type of workout (e.g., "Running", "Cycling", "Strength Training").
 * @property {string} [notes] - Optional notes about the workout.
 * @description
 * This interface defines the structure of a workout object used in the FitGlitch application.
 */
export interface Workout {
    _id: string; // Unique identifier for the workout
    date: string; // ISO date string
    calories: number; // Total calories burned in the workout
    type: string; // Type of workout (e.g., "Running", "Cycling", "Strength Training")
    notes?: string; // Optional notes about the workout
};