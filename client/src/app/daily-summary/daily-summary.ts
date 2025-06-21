import { Component, OnInit } from '@angular/core';
import { formatDateToYyyyMmDd } from '../utils/dateUtils';
import { WeightService } from '../services/weightService';
import { DailyStatsService } from '../services/dailyStatsService';
import { UserInfoService } from '../services/userInfo';
import { Weight } from '../models/weight';
import { DailyStat } from '../models/dailyStat';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

/**
 * @component DailySummary
 * @selector app-daily-summary
 * @description
 * This component displays the user's daily summary, including today's date, weight, daily stats,
 * and formatted strings for calories and weight information.
 */
@Component({
  selector: 'app-daily-summary',
  imports: [CommonModule],
  templateUrl: './daily-summary.html',
  styleUrls: ['./daily-summary.css']
})
export class DailySummary implements OnInit {
  today: string = formatDateToYyyyMmDd(new Date()); // Today's date in YYYY-MM-DD format
  weight: Weight | null = null; // User's weight for today, initially null
  dailyStats: DailyStat[] | null = null; // User's daily stats for today, initially null
  user!: User; // User information, initially null
  caloriesString: string = ''; // String to hold formatted calories information
  weightString: string = ''; // String to hold formatted weight information

  /**
   * Constructor for the DailySummary component.
   * @param weightService - Service for weight-related API calls.
   * @param statsService - Service for daily stats-related API calls.
   * @param userInfoService - Service for user information-related API calls.
   */
  constructor(
    private weightService: WeightService,
    private statsService: DailyStatsService,
    private userInfoService: UserInfoService
  ) { }

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * It loads the daily summary data by calling the loadDailySummary method.
   */
  ngOnInit(): void {
    this.loadDailySummary(); // Load the daily summary data when the component initializes
  }

  /**
   * Loads the daily summary data, including user information, weight, and daily stats.
   * It handles errors by logging them to the console.
   * After loading the data, it prepares the formatted strings for calories and weight.
   */
  private async loadDailySummary() {
    try {
      this.user = await this.userInfoService.getUserInfo(); // Fetch user information
      this.weight = await this.weightService.getMostRecentWeight(); // Fetch the most recent weight record
      this.dailyStats = await this.statsService.getDailyStats(this.today, this.today); // Fetch daily stats for today
    } catch (error) {
      console.error("Error loading daily summary: ", error); // Log any errors that occur during data fetching
    }

    this.prepareStrings();
  }

  /**
   * @helper prepareStrings
   * @returns {void}
   * @description
   * This method checks if daily stats and weight data are available, formats them into strings,
   * and assigns them to the respective class properties (caloriesString and weightString).
   * It ensures that the user is informed about their caloric goal, net calories, remaining calories,
   * current weight, and progress towards their goal weight.
   * If no stats or weight records are available, it provides appropriate messages.
   */
  private prepareStrings() {
    // Check if daily stats are available and format the calories string
    if (this.dailyStats && this.dailyStats.length > 0) {
      const todaysStats: DailyStat = this.dailyStats[0]; // Get today's stats
      this.caloriesString = `Goal: ${this.user.caloricGoal} | Net: ${todaysStats.netCalories} 
            | Remaining: ${todaysStats.difference}`; // Format the calories string
    } else {
      this.caloriesString = `Caloric goal: ${this.user?.caloricGoal} | No stats available for today.`; // Provide a message if no stats are available
    }

    // Check if weight data is available and format the weight string
    if (this.weight && this.user.loseWeight) {
      const weightGoal = this.user.goalWeight; // Get the user's goal weight
      this.weightString = `Weight: ${this.weight.weight} lbs | Left to goal: ${this.weight.weight - weightGoal} lbs`; // Format the weight string
    } else if (this.weight) {
      this.weightString = `Weight: ${this.weight.weight} lbs`; // Provide weight information if no goal is set
    } else {
      this.weightString = 'No weight data available.'; // Provide a message if no weight records are available
    }
  }
}
