/**
 * @file add-workout.ts
 * @project FitGlitch
 * @author John Miller
 * @description Component for adding new workout entries using a reactive form.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateWorkout } from '../models/createWorkout';
import { WorkoutService } from '../services/workoutService';

/**
 * @component
 * @description This component provides a form for users to add new workout entries.
 * It includes fields for date, type, calories burned, and optional notes.
 * The form is validated to ensure required fields are filled and calories are non-negative.
 * Upon submission, the workout data is sent to the backend via the WorkoutService.
 * If the submission is successful, the user is redirected to the workouts list.
 * If there is an error, it is logged to the console for debugging purposes.
 */
@Component({
  selector: 'app-add-workout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-workout.html',
  styleUrls: ['./add-workout.css']
})
export class AddWorkoutComponent implements OnInit {
  public addForm!: FormGroup; // Reactive form for adding workout entries
  submitted = false; // Flag to track form submission status
  
  /**
   * Constructor for the AddWorkoutComponent.
   * @param formBuilder - Angular's FormBuilder service for creating reactive forms.
   * @param router - Angular's Router service for navigation.
   * @param workoutService - Service for handling workout-related operations, such as adding workouts.
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private workoutService: WorkoutService
  ) { }
  
  /**
   * Lifecycle hook that initializes the reactive form with validation rules.
   * @returns {void}
   */
  ngOnInit(): void {
    /**
     * Initializes the form with controls and validation.
     * - date: required
     * - type: required
     * - calories: required, minimum value of 0
     * - notes: optional
     */
    this.addForm = this.formBuilder.group({
      date: ["", Validators.required],
      type: ["", Validators.required],
      calories: ["", [Validators.required, Validators.min(0)]],
      notes: [""]
    });
  }

  /**
   * Handles form submission for adding a new workout entry.
   * Validates the form, clones the form data, and calls the workout service to add the workout.
   * If successful, navigates back to the workouts list.
   * @returns {Promise<void>}
   */
  async addWorkout(): Promise<void> {
    this.submitted = true;

    if (this.addForm.valid) {
      // Clone form data
      const formValue = { ...this.addForm.value } as CreateWorkout;

      // Uncomment the line below to log the form value for debugging
      //console.log('Form Value:', formValue);

      try {
        // Call the workout service to add the workout
        await this.workoutService.addWorkout(formValue);
        console.log('Workout added successfully');
        // Navigate back to the workouts list
        this.router.navigate(['']);
      } catch (error) {
        console.error('Error adding workout:', error);
        // Handle the error appropriately, e.g., show a notification
      }
    }
  }
  // get the form short name to access the form fields
  get f() {
    return this.addForm.controls;
  }

}
