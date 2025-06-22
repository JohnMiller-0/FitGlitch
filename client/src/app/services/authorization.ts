/**
 * @file authorization.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains the AuthorizationService, which handles user authentication operations such as login and registration.
 * It interacts with the backend API to perform these operations and returns the authentication response.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/authResponse';
import { LoginPayload } from '../models/LoginPayload';
import { RegisterPayload } from '../models/RegisterPayload';

import { HttpHeaders } from '@angular/common/http';

/**
 * @service AuthorizationService
 * @description
 * This service provides methods for user authentication, including login and registration.
 * It interacts with the backend API to perform these operations and returns the authentication response.
 * It uses Angular's HttpClient to make HTTP requests and handles errors appropriately.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  /**
   * Constructor for the AuthorizationService.
   * @param http - Angular's HttpClient service for making HTTP requests.
   * @description
   * The AuthorizationService constructor initializes the service with the HttpClient.
   */
  constructor(
    private http: HttpClient,

  ) {}


  apiBaseUrl: string = environment.apiUrl; // Base URL for the API, defined in the environment configuration

  /**
   * Handles errors that occur during API calls.
   * @param error - The error object returned from the API call.
   * @returns A rejected promise with the error message.
   * @description
   * This method logs the error to the console and returns a rejected promise with the error message.
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // Log the error to the console
    return Promise.reject(error.message || error); // Return a rejected promise with the error message
  }
  
  /**
   * Makes an API call to the specified endpoint with the provided payload.
   * @param urlPath - The path of the API endpoint (e.g., 'login', 'register').
   * @param payload - The payload containing login or registration data.
   * @returns A promise that resolves with the authentication response.
   * @description
   * This method constructs the full URL for the API call, sets the necessary headers, and makes a POST request
   * to the specified endpoint. It returns a promise that resolves with the authentication response or handles errors.
   */
  private async makeApiCall(urlPath: string, payload: LoginPayload | RegisterPayload): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`; // Construct the full URL for the API endpoint
    const headers = new HttpHeaders( { 'Skip-Auth' : 'true' }); // Set headers to skip authentication for these endpoints
    try {
        return await lastValueFrom(this.http.post<AuthResponse>(url, payload, { headers } ) ); // Make a POST request to the API endpoint with the payload and headers
    } catch (error) {
        return this.handleError(error); // Handle any errors that occur during the API call
    }
  }

  /**
   * Logs in a user with the provided credentials.
   * @param loginPayload - The payload containing login credentials (email and password).
   * @returns A promise that resolves with the authentication response.
   * @description
   * This method calls the API endpoint for user login and returns the authentication response.
   */
  public login(loginPayload: LoginPayload): Promise<AuthResponse> {
    return this.makeApiCall('login', loginPayload);
  }

  /**
   * Registers a new user with the provided registration details.
   * @param registerPayload - The payload containing registration details (email, password, goal weight, caloric goal, and weight loss preference).
   * @returns A promise that resolves with the authentication response.
   * @description
   * This method calls the API endpoint for user registration and returns the authentication response.
   */
  public register(registerPayload: RegisterPayload): Promise<AuthResponse> {
    return this.makeApiCall('register', registerPayload);
  }
}