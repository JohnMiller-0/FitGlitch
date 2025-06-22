/** 
 * @file edit-weight.ts
 * @project FitGlitch
 * @author John Miller
 * @description Component for editing existing weight entries using a reactive form.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WeightService } from '../services/weightService';
import { Weight } from '../models/weight';

/**
 * @Component
 * @selector app-edit-weight
 * @description This component provides a form for users to edit existing weight entries.
 * It includes fields for date and weight, with validation to ensure required fields are filled
 * and weight is a positive number. Upon submission, the updated weight data is sent to the backend via the WeightService.
 * If the submission is successful, the user is redirected to the main page. If there is an error,
 * it is logged to the console for debugging purposes.
 */
@Component({
  selector: 'app-edit-weight',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-weight.html',
  styleUrls: ['./edit-weight.css']
})
export class EditWeight implements OnInit {
  public editForm !: FormGroup; // Reactive form for editing weight entries
  weight !: Weight; // Weight object to hold the weight data fetched from the service
  submitted = false; // Flag to track form submission status
  message : string = ""; // Message to display to the user, if needed

  /**
   * Constructor for the EditWeight component.
   * @param formBuilder - Angular's FormBuilder service for creating reactive forms.
   * @param router - Angular's Router service for navigation.
   * @param weightService - Service for handling weight-related operations, such as editing weights.
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private weightService: WeightService
  ) {}

  /**
   * Lifecycle hook that initializes the reactive form with validation rules.
   * Fetches the weight ID from local storage and populates the form with existing weight data.
   * @returns {void}
   */
  ngOnInit(): void {
    let weightId = localStorage.getItem('weightId'); // Retrieve weightId from local storage
    if(!weightId)
    {
      alert("Something wrong, no weightId in storage"); // Alert if no weightId is found in local storage
      this.router.navigate(['']); // Navigate back to the home page if weightId is missing
      return;
    }
    
    /**
     * Initializes the form with controls and validation.
     * - _id: The ID of the weight entry (used for editing).
     * - date: Required field for the date of the weight entry.
     * - weight: Required field for the weight value, must be a positive number. 
     */
    this.editForm = this.formBuilder.group({
      _id: [weightId],
      date: ["", Validators.required],
      weight: ["", [Validators.required, Validators.min(1.0)] ]
    })

    // Fetch the weight data using the weightId and populate the form
    // This will call the getWeight method to retrieve the weight details
    // and then patch the form with the fetched data
    this.getWeight(weightId)
      .then(() => {
        // Populate the form with the fetched weight data
        this.editForm.patchValue({
          ...this.weight
        });
      })
      .catch(error => {
        console.error('Error fetching weight:', error); // Log any error that occurs during fetching
        this.message = "Error fetching weight."; // Set an error message to display to the user
      });
  }

  /**
   * Fetches the weight data by ID and populates the component's weight property.
   * @param weightId The ID of the weight entry to fetch.
   * @returns {Promise<void>} A promise that resolves when the weight is fetched.
   */
  async getWeight(weightId: string): Promise<void> {
    try {
      this.weight = await this.weightService.getWeightById(weightId); // Call the weight service to get the weight data by ID
      
      // Uncomment the line below to log the fetched weight for debugging purposes
      // DEBUG:console.log('Weight fetched successfully:', this.weight);
    } catch (error) {
      console.error('Error fetching weight:', error); // Log any error that occurs during fetching
      this.message = "Error fetching weight.";  // Set an error message to display to the user
    }
  }

  /**
   * Handles form submission for editing an existing weight entry.
   * Validates the form, clones the form data, and calls the weight service to update the weight.
   * If successful, navigates back to the home page.
   * @returns {Promise<void>}
   */
  async onSubmit(): Promise<void> {
    this.submitted = true; // Track if the form has been submitted

    if (this.editForm.valid) {
      // Clone the form value to avoid mutating the original object
      const formValue = this.editForm.value as Weight;

      try {
        await this.weightService.editWeight(formValue); // Call the weight service to update the weight entry
        this.router.navigate(['']); // Navigate back to the home page after successful update
      } catch (error) {
        console.error('Error updating weight:', error); // Log any error that occurs during the update
        this.message = "Error updating weight."; // Set an error message to display to the user
      }
    }
  }
  
  /**
   * Getter for accessing form controls easily in the template.
   * @returns {any} The form controls of the editForm.
   */
  get f() {
    return this.editForm.controls;
  }
}