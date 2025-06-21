/**
 * @file workoutService.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains the WorkoutService, which provides methods to interact with workout-related API endpoints.
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Workout } from "../models/workout";
import { CreateWorkout } from "../models/createWorkout";

/**
 * @service WorkoutService
 * @description
 * This service provides methods to interact with workout-related API endpoints.
 * It allows fetching workouts by date, adding new workouts, updating existing workouts,
 * deleting workouts, and retrieving a workout by its ID.
 */
@Injectable( {
    providedIn: 'root'
})
export class WorkoutService {
    private apiBaseUrl = 'http://localhost:3000/api/workouts'; // Base URL for the API endpoints

    /**
     * Constructor for the WorkoutService.
     * @param http - Angular's HttpClient service for making HTTP requests.
     * @description
     * The WorkoutService constructor initializes the service with the HttpClient.
     */
    constructor(private http: HttpClient) { }

    /**
     * Retrieves workouts for a specific date.
     * @param date - The date in 'YYYY-MM-DD' format to fetch workouts for.
     * @returns A promise that resolves with an array of Workout objects.
     * @description
     * This method makes an HTTP GET request to the API to fetch workouts for the specified date
     * and returns a promise that resolves with the data.
     */
    getWorkoutsByDate(date: string): Promise<Workout[]> {
        return firstValueFrom(
            this.http.get<Workout[]>(`${this.apiBaseUrl}/date/${date}`)
        );
    }

    /**
     * Retrieves a workout by its ID.
     * @param id - The ID of the workout to retrieve.
     * @returns A promise that resolves with the Workout object.
     * @description
     * This method makes an HTTP GET request to the API to fetch a workout by its ID
     * and returns a promise that resolves with the data.
     */
    getWorkoutById(id: string): Promise<Workout> {
        return firstValueFrom(
            this.http.get<Workout>(`${this.apiBaseUrl}/${id}`)
        );
    }

    /**
     * Adds a new workout.
     * @param workout - The workout data to be added.
     * @returns A promise that resolves with the created Workout object.
     * @description
     * This method makes an HTTP POST request to the API to add a new workout
     * and returns a promise that resolves with the created workout data.
     */
    addWorkout(workout: CreateWorkout): Promise<Workout> {
        return firstValueFrom(
            this.http.post<Workout>(this.apiBaseUrl, workout)
        );
    }

    /**
     * Updates an existing workout.
     * @param workout - The workout data to be updated.
     * @returns A promise that resolves with the updated Workout object.
     * @description
     * This method makes an HTTP PUT request to the API to update an existing workout
     * and returns a promise that resolves with the updated workout data.
     */
    updateWorkout(workout: Workout): Promise<Workout> {
        return firstValueFrom(
            this.http.put<Workout>(`${this.apiBaseUrl}/${workout._id}`, workout)
        );
    }

    /**
     * Deletes a workout by its ID.
     * @param id - The ID of the workout to delete.
     * @returns A promise that resolves with the deleted Workout object.
     * @description
     * This method makes an HTTP DELETE request to the API to delete a workout by its ID
     * and returns a promise that resolves with the deleted workout data.
     */
    deleteWorkout(id: string): Promise<Workout> {
        return firstValueFrom(
            this.http.delete<Workout>(`${this.apiBaseUrl}/${id}`)
        );
    }

}