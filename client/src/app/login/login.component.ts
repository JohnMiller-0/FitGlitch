/**
 * @file login.component.ts
 * @project FitGlitch
 * @author John Miller
 * @description Component for user login functionality.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginPayload } from '../models/LoginPayload';

/**
 * @component
 * @selector app-login
 * @description This component provides a login form for users to authenticate themselves.
 * It includes fields for email and password, with validation to ensure both fields are filled.
 * Upon submission, the credentials are sent to the backend via the AuthenticationService.
 * If the login is successful, the user is redirected to the main page. If there is an error,
 * it is displayed on the form.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public formError: string = ''; // Error message to display if form submission fails
  public credentials!: FormGroup; // Form group to hold user credentials (email and password)
  public submitted: boolean = false; // Flag to indicate if the form has been submitted

  /**
   * @constructor
   * @param {Router} router - Angular's Router service for navigation.
   * @param {AuthenticationService} authenticationService - Service for handling authentication operations.
   * @param {FormBuilder} formBuilder - Angular's FormBuilder service for creating reactive forms.
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Lifecycle hook that initializes the reactive form with validation rules.
   * It sets up the form controls for email and password with required validation.
   * @returns {void}
   */
  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email field with required and email validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password field with required and minLength validation
    });
  }

  /**
   * Handles the form submission when the user clicks the login button.
   * It checks if the form is valid and if not, sets an error message.
   * If the form is valid, it calls the doLogin method to authenticate the user.
   * @returns {void}
  */
  public onLoginSubmit(): void {
    this.formError = ''; // Reset form error message

    if (this.credentials.invalid) { // Check if the form is invalid
      this.formError = 'Please fill in both email and password.'; // Set error message if form is invalid
      return; // Exit the method if form is invalid
    } else {
      this.doLogin(); // Call the doLogin method to authenticate the user
    }

  }

  /**
   * Authenticates the user using the AuthenticationService.
   * If the login is successful, it redirects the user to the main page.
   * If there is an error, it sets the formError message to display the error.
   * @returns {void}
   */
  private doLogin(): void {
    this.submitted = true; // Set submitted flag to true to indicate form submission
    this.formError = ''; // Reset form error message
    // Clone the form values to create a LoginPayload object
    const loginPayload: LoginPayload = {
      email: this.credentials.value.email, // Get the email from the form
      password: this.credentials.value.password // Get the password from the form
    };
    
    this.authenticationService.login(loginPayload) // Call the login method from AuthenticationService with user credentials
      .then(() => this.router.navigateByUrl('')) // If login is successful, navigate to the home page
      .catch((message) => this.formError = message); // If there is an error, set the formError message to display the error
  }

  /**
   * Navigates the user to the registration page.
   * This method is called when the user clicks on the "Register" link.
   * @returns {void}
   */
  public onRegisterSubmit(): void {
    this.router.navigateByUrl('/register');
  }

  /**
   * Getter for form controls to simplify template access.
   * This allows easy access to form controls in the template.
   * @returns {any} The form controls of the credentials form group.
   */
  get f() {
    return this.credentials.controls; // Getter for form controls to simplify template access
  }

}