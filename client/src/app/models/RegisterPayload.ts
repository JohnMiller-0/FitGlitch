/**
 * @file RegisterPayload.ts
 * @project FitGlitch
 * @author John Miller
 * @interface RegisterPayload
 * @property {string} email - The email address of the user registering.
 * @property {string} password - The password of the user registering.
 * @property {number} goalWeight - The user's goal weight in kilograms.
 * @property {number} caloricGoal - The user's daily caloric goal.
 * @property {boolean} loseWeight - Indicates whether the user aims to lose weight.
 * @description
 * This interface defines the structure of the payload used when a user registers for the application.
 */
export interface RegisterPayload {
    email: string;
    password: string;
    goalWeight: number;
    caloricGoal: number;
    loseWeight: boolean;
};