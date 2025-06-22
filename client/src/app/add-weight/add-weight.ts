/**
 * @file add-weight.ts
 * @project FitGlitch
 * @author John Miller
 * @description Component for adding new weight entries using a reactive form.
 *              Handles validation, submission, and feedback toast messaging.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateWeight } from '../models/createWeight';
import { WeightService } from '../services/weightService';

/**
 * @component
 * @selector app-add-weight
 * @description This component provides a form for users to add new weight entries.
 * It includes fields for weight and date, with validation to ensure required fields are filled
 * and weight is a positive number. Upon submission, the weight data is sent to the backend via the WeightService.
 * If the submission is successful, the user is redirected to the main page. If there is an error,
 * it is logged to the console for debugging purposes.
 */
@Component({
  selector: 'app-add-weight',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-weight.html',
  styleUrls: ['./add-weight.css']
})
export class AddWeight implements OnInit {
  public addForm!: FormGroup; // Reactive form for adding weight entries
  submitted = false; // Flag to track form submission status

  /**
   * Constructor for the AddWeight component.
   * @param formBuilder - Angular's FormBuilder service for creating reactive forms.
   * @param router - Angular's Router service for navigation.
   * @param weightService - Service for handling weight-related operations, such as adding weights.
   */
 constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private weightService: WeightService
  ) { }

  /**
   * Lifecycle hook that initializes the reactive form with validation rules.
   * @returns {void}
   */
  ngOnInit(): void {
   
    /**
     * Initializes the form with controls and validation.
     * - weight: required, minimum value of 1
     * - date: required
     */
    this.addForm = this.formBuilder.group( {
      weight:["", [Validators.required, Validators.min(1)]],
      date:["", Validators.required]
    } )
  }

  /**
   * Handles form submission for adding a new weight entry.
   * Displays a toast message based on the success or failure of the request.
   * @returns {Promise<void>}
   */
  async addWeight(): Promise<void> {

    this.submitted = true; // Track if the form has been submitted
    if (this.addForm.invalid) return; // If the form is invalid, do not proceed

    const formValue: CreateWeight = { ...this.addForm.value }; // Clone form data to prevent direct mutation

    try {
      await this.weightService.addWeight(formValue); // Call the weight service to add the new weight entry
      this.router.navigate(['']); // Navigate back to the main page after successful submission
    } catch (err: any) { // Handle errors from the weight service
      console.error('Error adding weight:', err);
    }
  }


  /**
   * Getter for easy access to form control fields.
   * @returns {any} - The form's controls object.
   */
  get f() { 
    return this.addForm.controls; 
    }

}
