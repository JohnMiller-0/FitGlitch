/**
 * @file weight.ts
 * @project FitGlitch
 * @author John Miller
 * @interface Weight
 * @property {string} _id - The unique identifier for the weight entry.
 * @property {string} date - The date of the weight entry in ISO format (YYYY-MM-DD).
 * @property {number} weight - The weight value in pounds.
 * @description
 * This interface defines the structure of a weight entry used in the FitGlitch application.
 */
export interface Weight {
    _id: string;
    date: string; // ISO date string
    weight: number; // Weight in lbs
};
