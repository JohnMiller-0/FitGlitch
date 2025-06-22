/**
 * @file mealService.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains the MealService, which provides methods to interact with meal-related API endpoints.
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Meal } from "../models/meal";
import { CreateMeal } from "../models/createMeal";
import { environment } from "../../environments/environment";

/**
 * @service MealService
 * @description
 * This service provides methods to interact with meal-related API endpoints.
 * It allows fetching meals by date, adding new meals, updating existing meals,
 * deleting meals, and retrieving a meal by its ID.
 */
@Injectable( {
    providedIn: 'root'
})
export class MealService {
    apiBaseUrl: string = environment.apiUrl + '/meals'; // Base URL for the meals API, defined in the environment configuration
    
    /**
     * Constructor for the MealService.
     * @param http - Angular's HttpClient service for making HTTP requests.
     * @description
     * The MealService constructor initializes the service with the HttpClient.
     */
    constructor(private http: HttpClient) { }

    /**
     * Retrieves meals for a specific date.
     * @param date - The date in 'YYYY-MM-DD' format to fetch meals for.
     * @returns A promise that resolves with an array of Meal objects.
     * @description
     * This method makes an HTTP GET request to the API to fetch meals for the specified date
     * and returns a promise that resolves with the data.
     */
    getMealsByDate(date: string): Promise<Meal[]> {
        return firstValueFrom(
            this.http.get<Meal[]>(`${this.apiBaseUrl}/date/${date}`) 
        );
    }

    /**
     * Adds a new meal.
     * @param meal - The meal data to be added.
     * @returns A promise that resolves with the created Meal object.
     * @description
     * This method makes an HTTP POST request to the API to add a new meal
     * and returns a promise that resolves with the created meal data.
     */
    addMeal(meal: CreateMeal): Promise<Meal> {
        return firstValueFrom(
            this.http.post<Meal>(this.apiBaseUrl, meal) 
        );
    }

    /**
     * Retrieves a meal by its ID.
     * @param mealId - The ID of the meal to retrieve.
     * @returns A promise that resolves with the Meal object.
     * @description
     * This method makes an HTTP GET request to the API to fetch a meal by its ID
     * and returns a promise that resolves with the meal data.
     */
    getMealById(mealId: string): Promise<Meal> {
        return firstValueFrom(
            this.http.get<Meal>(`${this.apiBaseUrl}/${mealId}`)
        );
    }

    /**
     * Updates an existing meal.
     * @param meal - The updated meal data.
     * @returns A promise that resolves with the updated Meal object.
     * @description
     * This method makes an HTTP PUT request to the API to update an existing meal
     * and returns a promise that resolves with the updated meal data.
     */
    updateMeal(meal: Meal): Promise<Meal> {
        return firstValueFrom(
            this.http.put<Meal>(`${this.apiBaseUrl}/${meal._id}`, meal)
        );
    }

    /**
     * Deletes a meal by its ID.
     * @param mealId - The ID of the meal to delete.
     * @returns A promise that resolves with the deleted Meal object.
     * @description
     * This method makes an HTTP DELETE request to the API to delete a meal by its ID
     * and returns a promise that resolves with the deleted meal data.
     */
    deleteMeal(mealId: string): Promise<Meal> {
        return firstValueFrom(
            this.http.delete<Meal>(`${this.apiBaseUrl}/${mealId}`)
        );
    }

    /**
     * Retrieves the most recent meal.
     * @returns A promise that resolves with the most recent Meal object.
     * @description
     * This method makes an HTTP GET request to the API to fetch the most recent meal
     * and returns a promise that resolves with the meal data.
     */
    getMostRecentMeal(): Promise<Meal> {
        return firstValueFrom(
            this.http.get<Meal>(`${this.apiBaseUrl}/recent`)
        );
    }

}