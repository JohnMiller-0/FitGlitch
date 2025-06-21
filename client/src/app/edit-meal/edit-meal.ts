/**
 * @file edit-meal.ts
 * @project FitGlitch
 * @author John Miller
 * @description Component for editing existing meal entries using a reactive form.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Meal } from '../models/meal';
import { MealService } from '../services/mealService';


/**
 * @Component
 * @selector app-edit-meal
 * @description This component provides a form for users to edit existing meal entries.
 * It includes fields for date, name, calories, and optional notes.
 * The form is pre-populated with existing meal data fetched from the backend.
 * The form is validated to ensure required fields are filled and calories are non-negative.
 * Upon submission, the updated meal data is sent to the backend via the MealService.
 * If the submission is successful, the user is redirected to the meals list. 
 * If there is an error, it is logged to the console for debugging purposes. 
 */
@Component({
  selector: 'app-edit-meal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-meal.html',
  styleUrls: ['./edit-meal.css']
})
export class EditMealComponent implements OnInit {
  public editForm!: FormGroup; // Reactive form for editing meal entries
  public meal!: Meal; // Meal object to hold the meal data fetched from the service
  message: string = ""; // Message to display to the user, if needed
  submitted = false; // Flag to track form submission status

  // Constructor for dependency injection
  // Injects FormBuilder for form creation, Router for navigation, and MealService for API calls
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mealService: MealService
  ) { }

  /**
   * Lifecycle hook that initializes the reactive form with validation rules.
   * Fetches the meal ID from local storage and populates the form with existing meal data.
   * @returns {void}
   */
  ngOnInit(): void {
    let mealId = localStorage.getItem('mealId'); // Retrieve mealId from local storage
    
    // Uncomment the line below to log the mealId for debugging purposes
    // DEBUG:console.log(`mealId: ${mealId}`); // Log the mealId for debugging
    
    if (!mealId) {
      alert("Something went wrong, no mealId in storage"); // Alert if no mealId is found in local storage
      this.router.navigate(['']); // Navigate back to the home page if mealId is missing
      return;
    }

    // Initialize the form with controls and validation
    // _id: mealId (to identify the meal being edited)
    // date: required
    // name: required
    // calories: required, minimum value of 1
    // notes: optional
    this.editForm = this.formBuilder.group({
      _id: [mealId],
      date: ["", Validators.required],
      name: ["", Validators.required],
      calories: ["", [Validators.required, Validators.min(1)]],
      notes: [""]
    });

    // Fetch the meal data using the mealId and populate the form
    // This ensures that the form is pre-filled with existing meal data for editing
    // The getMeal method returns a promise, so we can use .then() to handle
    this.getMeal(mealId)
      .then(() => {
        // Populate the form with the fetched meal data
        this.editForm.patchValue({
          ...this.meal
        });
      });
  }

  /**
   * Fetches the meal data by ID and populates the component's meal property.
   * @param mealId The ID of the meal to fetch.
   * @returns {Promise<void>} A promise that resolves when the meal data is fetched.
   */
  async getMeal(mealId: string): Promise<void> {
    try {
      this.meal = await this.mealService.getMealById(mealId); // Call the meal service to fetch the meal by ID
      // Uncomment the line below to log the fetched meal for debugging purposes
      // DEBUG:console.log('Meal fetched successfully:', this.meal);
    } catch (error) { 
      console.error('Error fetching meal:', error); // Log any errors that occur while fetching the meal
      this.message = 'Failed to fetch meal data.'; // Set an error message to display
    }
  }

  /**
   * Handles form submission for editing an existing meal entry.
   * Validates the form, clones the form data, and calls the meal service to update the meal.
   * If successful, navigates back to the home page.
   * @returns {Promise<void>}
   */
  async onSubmit() {
    this.submitted = true; // Track if the form has been submitted

    if (this.editForm.valid) {
      // Clone form data
      const formValue = { ...this.editForm.value } as Meal;


      try {
        await this.mealService.updateMeal(formValue); // Call the meal service to update the meal with the form data

        // Uncomment the line below to log success message for debugging purposes
        // DEBUG:console.log('Meal updated successfully');
        
        this.router.navigate(['']); // Navigate back to the home page after successful update
      } catch (error) {
        console.error('Error updating meal:', error); // Log any errors that occur while updating the meal
        this.message = 'Failed to update meal.'; // Set an error message to display
      }
    }
  }

  /**
   * Getter for easy access to form control fields.
   * @returns {any} - The form's controls object.
   */
  get f() {
    return this.editForm.controls;
  }
}