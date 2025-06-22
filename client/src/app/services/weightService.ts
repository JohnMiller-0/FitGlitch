/**
 * @file weightService.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains the WeightService, which provides methods to interact with weight-related API endpoints.
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Weight } from "../models/weight";
import { CreateWeight } from "../models/createWeight";
import { environment } from "../../environments/environment";

/**
 * @service WeightService
 * @description
 * This service provides methods to interact with weight-related API endpoints.
 * It allows fetching weights, adding new weights, deleting weights, and editing existing weights.
 * It uses Angular's HttpClient to make HTTP requests and returns promises for asynchronous operations.
 */
@Injectable( {
    providedIn: 'root'
})
export class WeightService {
    private apiBaseUrl = `${environment.apiUrl}/weights`; // Base URL for the weights API, defined in the environment configuration

    /**
     * Constructor for the WeightService.
     * @param http - Angular's HttpClient service for making HTTP requests.
     * @description
     * The WeightService constructor initializes the service with the HttpClient.
     */
    constructor(private http: HttpClient) {}

    /**
     * Retrieves all weights.
     * @returns A promise that resolves with an array of Weight objects.
     * @description
     * This method makes an HTTP GET request to the API to fetch all weights
     * and returns a promise that resolves with the data.
     */
    getWeights(): Promise<Weight[]> {
        return firstValueFrom(
            this.http.get<Weight[]>(this.apiBaseUrl)
        );
    }

    /**
     * Retrieves a weight by its ID.
     * @param id - The ID of the weight to retrieve.
     * @returns A promise that resolves with the Weight object.
     * @description
     * This method makes an HTTP GET request to the API to fetch a weight by its ID
     * and returns a promise that resolves with the data.
     */
    getWeightById(id: string): Promise<Weight> {
        return firstValueFrom(
            this.http.get<Weight>(`${this.apiBaseUrl}/${id}`)
        );
    }

    /**
     * Adds a new weight.
     * @param createWeight - The weight data to be added.
     * @returns A promise that resolves with the created Weight object.
     * @description
     * This method makes an HTTP POST request to the API to add a new weight
     * and returns a promise that resolves with the created weight data.
     */
    addWeight(createWeight: CreateWeight): Promise<Weight> {
        return firstValueFrom(
            this.http.post<Weight>(this.apiBaseUrl, createWeight)
        );
    }

    /**
     * Deletes a weight by its ID.
     * @param id - The ID of the weight to delete.
     * @returns A promise that resolves with the deleted Weight object.
     * @description
     * This method makes an HTTP DELETE request to the API to delete a weight by its ID
     * and returns a promise that resolves with the deleted weight data.
     */
    deleteWeight(id: string): Promise<Weight> {
        return firstValueFrom(
            this.http.delete<Weight>(`${this.apiBaseUrl}/${id}`)
        );
    }

    /**
     * Edits an existing weight.
     * @param formData - The updated weight data.
     * @returns A promise that resolves with the updated Weight object.
     * @description
     * This method makes an HTTP PUT request to the API to update an existing weight
     * and returns a promise that resolves with the updated weight data.
     */
    editWeight(formData: Weight): Promise<Weight> {
        return firstValueFrom(
            this.http.put<Weight>(`${this.apiBaseUrl}/${formData._id}`, formData)
        );
    }

    /**
     * Retrieves the most recent weight.
     * @returns A promise that resolves with the most recent Weight object.
     * @description
     * This method makes an HTTP GET request to the API to fetch the most recent weight
     * and returns a promise that resolves with the data.
     */
    getMostRecentWeight(): Promise<Weight | null> {
        return firstValueFrom(
            this.http.get<Weight | null>(`${this.apiBaseUrl}/most-recent`)
        );
    }
} 