/**
 * @file register.ts
 * @project FitGlitch
 * @author John Miller
 * @description
 * This file contains the RegisterUser component, which allows users to register for the FitGlitch
 * application. It includes a form for user input, validation, and submission handling.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';
import { RegisterPayload } from '../models/RegisterPayload';


/**
 * @component RegisterUser
 * @selector app-register
 * @description
 * This component handles user registration. It provides a form for users to enter their email, password,
 * goal weight, caloric goal, and whether they want to lose weight. The form includes validation to ensure
 * that all fields are filled out correctly before submission. Upon successful registration, the user is redirected to the home page.
 * If there is an error during registration, it displays an error message. 
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterUser implements OnInit {
  public addForm!: FormGroup; // Reactive form for user registration
  public formError: string = ''; // Error message to display if registration fails
  submitted=false; // Flag to track form submission status

  /**
   * Constructor for the RegisterUser component.
   * @param formBuilder - Angular's FormBuilder service for creating reactive forms.
   * @param router - Angular's Router service for navigation.
   * @param authService - Service for handling authentication operations, such as user registration.
   */
 constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  /**
   * Lifecycle hook that initializes the reactive form with validation rules.
   * @returns {void}
   */
  ngOnInit(): void {
    /**
     * Initializes the form with controls and validation.
     * - email: required, must be a valid email format
     * - password: required, minimum length of 6 characters
     * - goalWeight: required, must be a positive number
     * - caloricGoal: required, must be a positive number
     * - loseWeight: required, must be selected (boolean)
     */
    this.addForm = this.formBuilder.group( {
      email: ["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(6)]],
      goalWeight: ["", [Validators.required, Validators.min(1.0)]],
      caloricGoal: ["", [Validators.required, Validators.min(1.0)]],
      loseWeight: ["", Validators.required]

    } )
  }

  /**
   * Handles form submission.
   * Validates the form and, if valid, sends the registration data to the authentication service.
   * If registration is successful, redirects the user to the home page.
   * If there is an error during registration, it sets the formError message to display.
   * @returns {void}
   * @throws {Error} If the form is invalid or registration fails.
   */
  public onSubmit(): void {
    this.submitted = true; // Track if the form has been submitted
    
    // Check if the form is valid
    if (this.addForm.valid) {
      // Clone form data
      const formValue = { ...this.addForm.value } as RegisterPayload;

      // Uncomment the line below to log the form value for debugging
      // console.log('Form Value:', formValue);

      // Call the authentication service to register the user
      this.authService.register(formValue)
        .then( () => this.router.navigateByUrl('') ) // Navigate to home page on successful registration
        .catch( (message) => this.formError = message); // Set formError message if registration fails
      }
  }
      // get the form short name to access the form fields
    get f() { 
        return this.addForm.controls; 
        }
    
    }

