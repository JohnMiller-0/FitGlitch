/**
 * @file authResponse.ts
 * @project FitGlitch
 * @author John Miller
 * @interface AuthResponse
 * @property {string} token - The JWT token used for authentication.
 * @description Defines the structure of the authentication response received from the server.
 * This response includes a JWT token used for authenticating subsequent requests.
 */
export interface AuthResponse {
    token: string; // JWT token for authentication
};