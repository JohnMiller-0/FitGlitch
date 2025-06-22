/**
 * @file user.ts
 * @project FitGlitch
 * @author John Miller
 * @interface User
 * @property {number} goalWeight - The user's goal weight.
 * @property {number} caloricGoal - The user's daily caloric goal.
 * @property {boolean} loseWeight - Indicates whether the user aims to lose weight.
 * @description
 * This interface defines the structure of a user object used in the application to track
 * their weight loss goals and caloric intake.
 */
export interface User {
    goalWeight: number;
    caloricGoal: number;
    loseWeight: boolean;
    };

    