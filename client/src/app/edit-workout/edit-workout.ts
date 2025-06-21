/**
 * @file edit-workout.ts
 * @project FitGlitch
 * @author John Miller
 * @description Component for editing existing workout entries using a reactive form.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Workout } from '../models/workout';
import { WorkoutService } from '../services/workoutService';

/**
 * @component
 * @selector app-edit-workout
 * @description This component provides a form for users to edit existing workout entries.
 * It includes fields for date, type, calories burned, and optional notes.
 * The form is validated to ensure required fields are filled and calories are non-negative.
 * Upon submission, the updated workout data is sent to the backend via the WorkoutService.
 * If the submission is successful, the user is redirected to the home page.
 * If there is an error, it is logged to the console for debugging purposes.
 */
@Component({
  selector: 'app-edit-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-workout.html',
  styleUrls: ['./edit-workout.css']
})
export class EditWorkoutComponent implements OnInit {
  public editForm!: FormGroup; // Reactive form for editing workout entries
  public workout!: Workout; // Workout object to hold the workout data fetched from the service
  message: string = "";   // Message to display to the user, if needed
  submitted = false; // Flag to track form submission status

  // Constructor for dependency injection
  // Injects FormBuilder for form creation, Router for navigation, and WorkoutService for API calls
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private workoutService: WorkoutService
  ) { }

  /**
   * Lifecycle hook that initializes the reactive form with validation rules.
   * Fetches the workout ID from local storage and populates the form with existing workout data.
   * @returns {void}
   */
  ngOnInit(): void {
    let workoutId = localStorage.getItem('workoutId');  // Retrieve workoutId from local storage
    console.log(`workoutId: ${workoutId}`); // Log the workoutId for debugging
    if (!workoutId) {
      alert("Something went wrong, no workoutId in storage"); // Alert if no workoutId is found in local storage
      this.router.navigate(['']); // Navigate back to the home page if workoutId is missing
      return;
    }

    /**
     * Initializes the form with controls and validation.
     * - _id: The ID of the workout (set from local storage)
     * - date: required field for the workout date 
     * - type: required field for the type of workout
     * - calories: required field for calories burned, must be a positive number
     * - notes: optional field for additional notes about the workout
     */
    this.editForm = this.formBuilder.group({
      _id: [workoutId],
      date: ["", Validators.required],
      type: ["", Validators.required],
      calories: ["", [Validators.required, Validators.min(1)]],
      notes: [""]
    })

    // Fetch the workout data using the workoutId
    this.getWorkout(workoutId)
      .then(() => {
        // Populate the form with the fetched workout data
        this.editForm.patchValue({
          ...this.workout
        });
      })
      .catch(error => {
        console.error('Error fetching workout:', error); // Log any error that occurs during fetching
        this.message = "Error fetching workout."; // Set an error message to display to the user
      });

  }

  /**
   * Fetches the workout data by ID and populates the component's workout property.
   * @param workoutId The ID of the workout to fetch
   * @returns {Promise<void>} A promise that resolves when the workout data is fetched
   */
  async getWorkout(workoutId: string): Promise<void> {
    try {
      this.workout = await this.workoutService.getWorkoutById(workoutId); // Call the workout service to get the workout data by ID
      
      // Uncomment the line below to log the fetched workout for debugging purposes
      // DEBUG:console.log('Workout fetched successfully:', this.workout);

    } catch (error) {
      console.error('Error fetching workout:', error); // Log any error that occurs during fetching
      this.message = "Error fetching workout."; // Set an error message to display to the user
    }
  }

  /**
   * Submits the form data to update the workout entry.
   * Validates the form and sends the updated workout data to the backend service.
   * If successful, navigates back to the home page.
   * @returns {Promise<void>} A promise that resolves when the workout is updated
   */
  public async onSubmit(): Promise<void> {
    this.submitted = true; // Track if the form has been submitted

    
    if (this.editForm.valid) {
      // Clone form data
      const formValue = { ...this.editForm.value } as Workout;

      try {
        await this.workoutService.updateWorkout(formValue); // Call the workout service to update the workout with the form data
        this.router.navigate(['']); // Navigate back to the home page after successful update
      } catch (error) {
        console.error('Error updating workout:', error); // Log any error that occurs during updating
        this.message = "Error updating workout."; // Set an error message to display to the user
      }
    }
  }

  /**
   * Getter for accessing form controls easily in the template.
   * @returns {any} The form controls of the editForm
   */
  get f() {
    return this.editForm.controls;
  }
}
