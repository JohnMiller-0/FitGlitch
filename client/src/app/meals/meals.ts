/**
 * @file MealsComponent
 * @project FitGlitch
 * @author John Miller
 * @description Displays a list of meals for the current date, allows adding, editing, and
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Meal } from '../models/meal';
import { MealService } from '../services/mealService';
import { formatDateToYyyyMmDd } from '../utils/dateUtils';

/**
 * @component
 * @selector app-meals
 * @description This component displays a list of meals for the current date.
 * It allows users to add, edit, and delete meals. The meals are fetched from the MealService.
 */
@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meals.html',
  styleUrls: ['./meals.css'],
})
export class MealsComponent implements OnInit {
  meals: Meal[] = []; // Array to hold meals for the current date

  readonly todaysDate = formatDateToYyyyMmDd(new Date()); // Today's date formatted as 'YYYY-MM-DD'

  /**
   * @constructor
   * @param {MealService} mealService - Service for handling meal-related operations.
   * @param {Router} router - Angular's Router service for navigation.
   */
  constructor(
    private mealService: MealService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that initializes the component.
   * It fetches meals for today's date when the component is loaded.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getMeals(this.todaysDate);
  }

  /**
   * Fetches meals for a specific date.
   * @param {string} date - The date in 'YYYY-MM-DD' format to fetch meals for.
   * @returns {Promise<void>} - A promise that resolves when the meals are fetched.
   */
  async getMeals(date: string): Promise<void> {
    try {
      this.meals = await this.mealService.getMealsByDate(date); // Fetch meals for the specified date
    } catch (error) {
      console.error('Error retrieving meals:', error); // Log any errors that occur during the fetch
      this.meals = []; // Reset meals to an empty array in case of error
    }
  }

  /**
   * Deletes a meal by its ID.
   * @param {string} mealId - The ID of the meal to delete.
   * @returns {Promise<void>} - A promise that resolves when the meal is deleted.
   */
  async deleteMeal(mealId: string): Promise<void> {
    try {
      await this.mealService.deleteMeal(mealId); // Call the service to delete the meal by ID
      this.getMeals(this.todaysDate); // Refresh the meals list after deletion
    } catch (error) {
      console.error(`Error deleting meal with ID: ${mealId}`, error); // Log any errors that occur during deletion
    }
  }

  editMeal(mealId: string): void {
    localStorage.removeItem('mealId'); // Clear any existing mealId in localStorage
    localStorage.setItem('mealId', mealId); // Store the new mealId in localStorage
    this.router.navigate(['edit-meal']); // Navigate to the edit meal page
  }

  /**
   * Navigates to the add meal page.
   * @returns {void}
   */
  addMeal(): void {
    this.router.navigate(['add-meal']);
  }
}