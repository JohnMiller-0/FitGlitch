/**
  *@file daily-stats.ts
  *@project FitGlitch
  *@author John Miller
  *@description Component for displaying daily calorie statistics between a selected date range.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyStat } from '../models/dailyStat';
import { DailyStatsService } from '../services/dailyStatsService';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { formatDateToYyyyMmDd } from '../utils/dateUtils';

/**
 * Component for displaying daily calorie statistics between a selected date range.
 * Uses the DailyStatsService to retrieve and display user-specific calorie data.
 * @component
 * @selector app-daily-stats
 * @description
 * This component allows users to select a date range and view their daily calorie intake,
 * exercise, and weight statistics. It fetches data from the DailyStatsService and displays
 * it in a user-friendly format. The component handles loading states and error messages
 * to ensure a smooth user experience.
 */
@Component({
  selector: 'app-daily-stats',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './daily-stats.html',
  styleUrls: ['./daily-stats.css']
})
export class DailyStats {
  todayStats: DailyStat | null = null; // Today's statistics, initially null
  dailyStats: DailyStat[] = []; // Array to hold daily statistics data
  loading = false; // Flag to indicate if data is being loaded
  errorMsg = ''; // Error message to display if data fetching fails
  start: string = ''; // Start date of the range (YYYY-MM-DD)
  end: string = ''; // End date of the range (YYYY-MM-DD)
  today: string = formatDateToYyyyMmDd(new Date()); // Today's date in YYYY-MM-DD format

  /**
   * Constructs the DailyStats component with the required services.
   * @param statsService Service used to fetch daily calorie stats from the API
   */
  constructor(private statsService: DailyStatsService) {}

  /**
   * Fetches daily stats for the given date range and updates component state.
   * @param startDate Start date of the range (YYYY-MM-DD)
   * @param endDate End date of the range (YYYY-MM-DD)
   * @returns Promise that resolves when stats are fetched
   * @throws Error if the API call fails, which sets an error message
   * @description This method sets the loading state to true while fetching data,
   * and resets the error message. If the API call is successful, it updates the
   * `dailyStats` array with the retrieved data. If an error occurs, it logs the error
   * and sets an error message to be displayed in the UI. Finally, it sets the loading state to false.  
   */
  async getStats(startDate: string, endDate: string): Promise<void> {
    this.loading = true;
    this.errorMsg = '';
    try {
      this.dailyStats = await this.statsService.getDailyStats(startDate, endDate);
    } catch (err: any) {
      console.error(err);
      this.errorMsg = 'Failed to fetch stats.';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Submits the selected date range and fetches stats for that range.
   * @returns void
   * @description This method checks if both start and end dates are provided.
   * If they are, it calls `getStats` to fetch the daily statistics for the specified date range.
   * If either date is missing, it does not perform any action.
   */
  submitRange(): void {
    if (this.start && this.end) {
      this.getStats(this.start, this.end);
    }
  }
}