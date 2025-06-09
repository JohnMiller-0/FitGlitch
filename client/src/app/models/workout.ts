export interface Workout {
    date: string; // ISO date string
    calories: number; // Total calories burned in the workout
    type: string; // Type of workout (e.g., "Running", "Cycling", "Strength Training")
    notes?: string; // Optional notes about the workout
};