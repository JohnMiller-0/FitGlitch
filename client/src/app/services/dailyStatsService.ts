/**
 * @file dailyStatsService.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains the DailyStatsService, which retrieves daily statistics for users.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DailyStat } from '../models/dailyStat';
import { environment } from '../../environments/environment';

/**
 * @service DailyStatsService
 * @description
 * This service provides methods to retrieve daily statistics for users.
 * It interacts with the backend API to fetch statistics based on a date range.
 */
@Injectable({
    providedIn: 'root'
})
export class DailyStatsService {
    apiBaseUrl: string = environment.apiUrl + '/stats'; // Base URL for the daily stats API, defined in the environment configuration
    /**
     * Constructor for the DailyStatsService.
     * @param http - Angular's HttpClient service for making HTTP requests.
     * @description
     * The DailyStatsService constructor initializes the service with the HttpClient.
     */
    constructor(private http: HttpClient) { } 

    /**
     * Retrieves daily statistics for a specified date range.
     * @param startDate - The start date of the range in 'YYYY-MM-DD' format.
     * @param endDate - The end date of the range in 'YYYY-MM-DD' format.
     * @returns A promise that resolves with an array of DailyStat objects.
     * @description
     * This method makes an HTTP GET request to the API to fetch daily statistics
     * for the specified date range and returns a promise that resolves with the data.
     */
    getDailyStats(startDate: string, endDate: string): Promise<DailyStat[]> {
        return firstValueFrom(
            this.http.get<DailyStat[]>(`${this.apiBaseUrl}?startDate=${startDate}&endDate=${endDate}`)
        );
    }

    /**
     * Retrieves today's statistics.
     * @param today - Today's date in 'YYYY-MM-DD' format.
     * @returns A promise that resolves with a DailyStat object for today.
     * @description
     * This method makes an HTTP GET request to the API to fetch today's statistics
     * and returns a promise that resolves with the data.
     */
    getTodaysStats(today: string): Promise<DailyStat> {
        return firstValueFrom(
            this.http.get<DailyStat>(`${this.apiBaseUrl}?startDate=${today}&endDate=${today}`)
        );
    }
}