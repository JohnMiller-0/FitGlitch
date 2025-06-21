/**
 * @file CreateWorkout.ts
 * @project FitGlitch
 * @author John Miller
 * @interface CreateWorkout
 * @property {string} type - The type of workout (e.g., "running", "cycling").
 * @property {number} calories - The number of calories burned during the workout.
 * @property {string} date - The date of the workout in ISO format (YYYY-MM-DD).
 * @property {string} [notes] - Optional notes about the workout.
 * @description
 * This interface defines the structure of a workout object used when creating a new workout.
 */
export interface CreateWorkout {
    type: string;
    calories: number;
    date: string;
    notes?: string;
}
