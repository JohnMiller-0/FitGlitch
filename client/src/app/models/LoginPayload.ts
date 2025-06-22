/**
 * @file LoginPayload.ts
 * @project FitGlitch
 * @author John Miller
 * @interface LoginPayload
 * @property {string} email - The email address of the user attempting to log in.
 * @property {string} password - The password of the user attempting to log in.
 * @description
 * This interface defines the structure of the payload used when a user attempts to log in.
 */
export interface LoginPayload {
    email: string;
    password: string;
};
    