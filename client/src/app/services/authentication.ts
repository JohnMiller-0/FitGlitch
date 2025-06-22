/**
 * @file authentication.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains the AuthenticationService, which handles user authentication operations such as login,
 * registration, and token management. It interacts with the AuthorizationService to perform API calls
 * and manages the user's authentication state using browser storage.
 */
import {Inject, Injectable} from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { LoginPayload } from '../models/LoginPayload';
import { AuthorizationService } from './authorization';


import { AuthResponse } from '../models/authResponse';
import { RegisterPayload } from '../models/RegisterPayload';


/**
 * @service AuthenticationService
 * @description
 * This service provides methods for user authentication, including login, registration, and token management.
 * It uses the AuthorizationService to perform API calls and manages the authentication state using browser storage.
 * It provides methods to check if a user is logged in, save and retrieve tokens, and log out users.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /**
   * Constructor for the AuthenticationService.
   * @param storage - The browser storage service to manage tokens.
   * @param authService - The AuthorizationService to handle API calls for authentication.
   */
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage, 
    private authService: AuthorizationService
  ) {}

  /**
   * Retrieves the authentication token from browser storage.
   * @returns {string} The authentication token, or an empty string if not found.
   */
  private getToken(): string {
    return this.storage.getItem('fG-token') || '';
  }

  /**
   * Saves the authentication token to browser storage.
   * @param token - The authentication token to save.
   */
  private saveToken(token: string): void {
    this.storage.setItem('fG-token', token);
  }

  /**
   * Logs in a user with the provided credentials.
   * @param loginPayload - The payload containing login credentials (email and password).
   * @returns {Promise<any>} A promise that resolves when the login is successful and the token is saved.
   */
  public login(loginPayload: LoginPayload): Promise<any> {
    return this.authService.login(loginPayload)
        .then((response: AuthResponse) => 
            this.saveToken(response.token))
    }

  /**
   * Registers a new user with the provided registration details.
   * @param registerPayload - The payload containing registration details (email, password, goal weight, caloric goal, and weight loss preference).
   * @returns {Promise<any>} A promise that resolves when the registration is successful and the token is saved.
   */
  public register(registerPayload: RegisterPayload): Promise<any> {
    return this.authService.register(registerPayload)
      .then((response: AuthResponse) =>
        this.saveToken(response.token))
  }
    
  /**
   * Checks if the user is currently logged in by verifying the token's validity.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if(token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      return payload.exp > (Date.now() / 1000) // Check if the token is still valid
    } else {
        return false;
    }
  }

  /**
   * Logs out the user by removing the authentication token from browser storage.
   * @return {void}
   * This method clears the token stored in the browser, effectively logging out the user.
   */
  public logout(): void {
    this.storage.removeItem('fG-token');
  }
}


