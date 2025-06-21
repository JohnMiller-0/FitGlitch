/**
 * @file workouts.ts
 * @project FitGlitch
 * @author John Miller
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../models/workout';
import { Router } from '@angular/router';
import { WorkoutService } from '../services/workoutService';
import { formatDateToYyyyMmDd } from '../utils/dateUtils';


/**
 * @component WorkoutsComponent
 * @selector app-workouts
 * @description
 * This component displays a list of workouts for the current date, allows users to add, edit, and delete workouts,
 * and handles navigation using Angular's Router.
 */
@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workouts.html',
  styleUrls: ['./workouts.css']
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = []; // Array to hold the list of workouts
  todaysDate: string = formatDateToYyyyMmDd(new Date()); // Today's date in YYYY-MM-DD format
  message: string = ''; // Message to display to the user


  /**
   * Constructor for the WorkoutsComponent.
   * @param workoutService - Service to interact with workout-related API endpoints.
   * @param router - Angular's Router service for navigation.
   * @description
   * The WorkoutsComponent constructor initializes the component with the WorkoutService and Router.
   */
  constructor(
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * It fetches the workouts for today's date.
   * @returns {void}
   */
  ngOnInit(): void {
    // Uncomment the line below to log today's date for debugging purposes
    //console.log(`Todays date: ${this.todaysDate}`);
    this.getWorkouts(this.todaysDate); // Fetch workouts for today's date
  }

  async getWorkouts(date: string): Promise<void> {
    // Fetch workouts for the specified date
    try {
      this.workouts = await this.workoutService.getWorkoutsByDate(date); // Fetch workouts from the service
      // if no workouts are found, set a message to inform the user
      if (this.workouts.length === 0) {
        this.message = 'No workouts found for today.';
      } else {
        this.message = '';
      }
    } catch (error) {
      console.error(`Error fetching workouts for date ${date}`, error); // Log any errors that occur during the fetch
      this.message = 'Error fetching workouts. Please try again later.'; // Set an error message to inform the user
    }
  }

  /**
   * Deletes a workout by its ID.
   * @param workoutId - The ID of the workout to delete.
   * @returns {Promise<void>}
   * @description
   * This method calls the WorkoutService to delete a workout and refreshes the workouts list after
   * deletion.
   */
  async deleteWorkout(workoutId: string): Promise<void> {
    try {
      await this.workoutService.deleteWorkout(workoutId); // Delete the workout using the service
      // Uncomment the line below to log the deleted workout if needed
      //console.log(`Workout with ID ${workoutId} deleted successfully.`);
      this.getWorkouts(this.todaysDate); // Refresh the workouts list
    } catch (error) {
      console.error(`Error deleting workout with ID ${workoutId}`, error); // Log any errors that occur during the deletion
    }
  }

  /**
   * Navigates to the edit workout page with the specified workout ID.
   * @param workoutId - The ID of the workout to edit.
   * @returns {void}
   * @description
   * This method sets the workoutId in localStorage and navigates to the edit-workout route.
   */
  editWorkout(workoutId: string): void {
    // Uncomment the line below to log the workout ID for debugging purposes
    // console.log(`Editing workout with ID: ${workoutId}`); 

    localStorage.removeItem('workoutId'); // Clear any previous workoutId
    localStorage.setItem('workoutId', workoutId); // Store the workoutId in localStorage
    this.router.navigate(['edit-workout']); // Navigate to the edit workout page
  }

  /**
   * Navigates to the add workout page.
   * @returns {void}
   * @description
   * This method navigates the user to the add-workout route to create a new workout.
   */
  addWorkout(): void {
    // Uncomment the line below to log the addition of a new workout
    // console.log('Adding a new workout');
    this.router.navigate(['add-workout']); // Navigate to the add workout page
  }

}