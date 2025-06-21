/**
 * @file userInfo.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains the UserInfoService, which provides methods to retrieve user information from the API
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { User } from "../models/user";
import { DailyStat } from "../models/dailyStat";
import { Weight } from "../models/weight";
/**
 * @service UserInfoService
 * @description
 * This service provides methods to retrieve user information from the API.
 * It uses Angular's HttpClient to make HTTP requests and returns promises for asynchronous operations.
 */
@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    private apiBaseUrl = 'http://localhost:3000/api/userinfo'; // Base URL for the API endpoints

    constructor(private http: HttpClient) {}

    /**
     * Retrieves user information from the API.
     * @returns {Promise<User>} A promise that resolves with the user information.
     */
    public async getUserInfo(): Promise<User> {
        try {
            return await firstValueFrom(this.http.get<User>(this.apiBaseUrl));
        } catch (error) {
            console.error('Error fetching user info:', error);
            throw error;
        }
    }

}