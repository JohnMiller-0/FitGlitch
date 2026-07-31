/**
 * @file edit-workout.ts
 * @project FitGlitch
 * @author John Miller
 * @description Component for editing existing workout entries using a reactive form.
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Workout } from '../../models/workout';
import { WorkoutService } from '../../services/workoutService';
import { LoadingComponent } from '../../loading-component/loading-component';

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
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './edit-workout.html',
  styleUrls: ['./edit-workout.css']
})
export class EditWorkoutComponent implements OnInit {
  public editForm!: FormGroup; // Reactive form for editing workout entries
  public workout!: Workout; // Workout object to hold the workout data fetched from the service
  message: string = "";   // Message to display to the user, if needed
  submitted = false; // Flag to track form submission status
  loading: boolean = false; // Flag to indicate if data is being loaded
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>(); // Event emitter to notify parent component of form submission

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
     * Initializes the reactive form with validation rules.er
     * @type {FormGroup}
     * @property {string} _id - The ID of the workout being edited, set
     * to the workoutId retrieved from local storage
     * @property {string} date - The date of the workout, required
     * @property {string} type - The type of workout, required
     * @property {number} calories - The number of calories burned, required and must be
     * greater than 0
     * @property {string} notes - Optional field for additional notes about the workout
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
      this.loading = true; // Set loading flag to true while fetching data
      this.workout = await this.workoutService.getWorkoutById(workoutId); // Call the workout service to get the workout data by ID
      
      // Uncomment the line below to log the fetched workout for debugging purposes
      // DEBUG:console.log('Workout fetched successfully:', this.workout);

    } catch (error) {
      console.error('Error fetching workout:', error); // Log any error that occurs during fetching
      this.message = "Error fetching workout."; // Set an error message to display to the user
    } finally {
      this.loading = false; // Set loading flag to false after data fetching is complete
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
        this.loading = true; // Set loading flag to true while updating data
        await this.workoutService.updateWorkout(formValue); // Call the workout service to update the workout with the form data
      } catch (error) {
        console.error('Error updating workout:', error); // Log any error that occurs during updating
        this.message = "Error updating workout."; // Set an error message to display to the user
      } finally {
        this.loading = false; // Set loading flag to false after updating data
        this.formSubmitted.emit(); // Emit the formSubmitted event to notify the parent component of the successful form submission
      }
    }
  }

  cancel(): void {
    this.formSubmitted.emit(); // Emit the formSubmitted event to notify the parent component to close the form without making changes
  }
  
  /**
   * Getter for accessing form controls easily in the template.
   * @returns {any} The form controls of the editForm
   */
  get f() {
    return this.editForm.controls;
  }
}
