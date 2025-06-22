/**
 * @file CreateWeight.ts
 * @project FitGlitch
 * @author John Miller
 * @interface CreateWeight
 * @property {string} date - The date of the weight entry in ISO format (YYYY-MM-DD).
 * @property {number} weight - The weight value in kilograms.   
 * @description Defines the structure of a weight entry used when creating a new weight record.
 */
export interface CreateWeight {
    date: string,
    weight: number
}