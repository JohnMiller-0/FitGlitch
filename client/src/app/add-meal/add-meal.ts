/**
 * @file add-meal.ts
 * @project FitGlitch
 * @author John Miller
 * @description Component for adding new meal entries using a reactive form.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateMeal } from '../models/createMeal';
import { MealService } from '../services/mealService';

/**
 * @component
 * @selector app-add-meal
 * @description This component provides a form for users to add new meal entries.
 * It includes fields for date, name, calories, and optional notes.
 * The form is validated to ensure required fields are filled and calories are non-negative.
 * Upon submission, the meal data is sent to the backend via the MealService.
 * If the submission is successful, the user is redirected to the meals list.
 * If there is an error, it is logged to the console for debugging purposes. 
 */
@Component({
  selector: 'app-add-meal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-meal.html',
  styleUrls: ['./add-meal.css']
})
export class AddMealComponent implements OnInit {
  public addForm!: FormGroup; // Reactive form for adding meal entries
  submitted = false; // Flag to track form submission status

  /**
   * Constructor for the AddMealComponent.
   * @param formBuilder - Angular's FormBuilder service for creating reactive forms.
   * @param router - Angular's Router service for navigation.
   * @param mealService - Service for handling meal-related operations, such as adding meals.
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mealService: MealService
  ) { }

  /**
   * Lifecycle hook that initializes the reactive form with validation rules.
   * @returns {void}
   */
  ngOnInit(): void {
    /**
     * Initializes the form with controls and validation.
     * - date: required
     * - name: required
     * - calories: required, minimum value of 1
     * - notes: optional
     */
    this.addForm = this.formBuilder.group({
      date: ["", Validators.required],
      name: ["", Validators.required],
      calories: ["", [Validators.required, Validators.min(1)]],
      notes: [""]
    })
  }
  /**
   * Handles form submission for adding a new meal entry.
   * Validates the form, clones the form data, and calls the meal service to add the meal.
   * If successful, navigates back to the meals list.
   * @returns {Promise<void>} 
   */
  async addMeal(): Promise<void> {
    this.submitted = true; // Track if the form has been submitted

    if (this.addForm.valid) {
      // Clone form data
      const formValue = { ...this.addForm.value } as CreateMeal;

      // Uncomment the line below to log the form value for debugging
      //console.log('Form Value:', formValue);

      try {
        // Call the meal service to add the meal
        await this.mealService.addMeal(formValue);
        
        // Uncomment the line below to log success message for debugging
        //console.log('Meal added successfully');
        
        // Navigate back to the meals list
        this.router.navigate(['']);
      }
      catch (error) {
        console.error('Error adding meal:', error);
        // Handle the error appropriately, e.g., show a notification
      }
    }
  }

  /**
   * Getter for form controls to simplify template access.
   * This allows easy access to form controls in the template.
   * @returns {any} The form controls of the addForm.
   */
  get f() {
    return this.addForm.controls;
  }

}

