/**
 * @file home.component.ts
 * @project FitGlitch
 * @author John Miller
 * @description Home component that serves as the main dashboard for the application.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyStats } from '../daily-stats/daily-stats';
import { MealsComponent } from '../meals/meals';
import { WorkoutsComponent } from '../workouts/workouts';
import { WeightsComponent } from '../weights/weights.component';
import { LoginComponent } from '../login/login.component';
import { DailySummary } from '../daily-summary/daily-summary';

import { AuthenticationService } from '../services/authentication';
import { Router } from '@angular/router';

/**
 * @component HomeComponent
 * @selector app-home
 * @description
 *  * HomeComponent serves as the main dashboard for the FitGlitch application.
 * It provides access to various features such as daily stats, meals, workouts, and weights.
 * The component also handles user authentication and logout functionality.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoginComponent,
    DailyStats,
    MealsComponent,
    WorkoutsComponent,
    WeightsComponent,
    DailySummary
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /**
   * 
   * @param authService AuthenticationService used for managing user authentication.
   * Handles login, logout, and checking if the user is logged in.
   * @param router Router used for navigating between different views.
   */
  constructor(
  public authService: AuthenticationService,
  private router: Router
  ) {}

  /**
   * Logs out the user and navigates to the home page.
   * This method calls the logout method from the AuthenticationService
   * and redirects the user to the home route.
   * 
   * @returns {void}
   */
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  /**
   * Checks if the user is currently logged in.
   * This method uses the AuthenticationService to determine the login status.
   * 
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();

    
  }

}