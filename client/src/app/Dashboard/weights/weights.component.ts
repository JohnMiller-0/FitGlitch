/**
 * @file weights.component.ts
 * @project FitGlitch
 * @author John Miller
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightService } from '../../services/weightService';
import { Weight } from '../../models/weight';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../loading-component/loading-component';
import { AddWeight } from '../../Add-Forms/add-weight/add-weight';
import { EditWeight } from '../../Edit-Forms/edit-weight/edit-weight';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * @component WeightsComponent
 * @selector app-weights
 * @description
 * This component displays a list of weights, allows users to add new weights,
 * edit existing weights, and delete weights. It fetches the weights from the WeightService
 * and handles navigation using Angular's Router.
 */
@Component({
  selector: 'app-weights',
  standalone: true,
  imports: [
    CommonModule, LoadingComponent, AddWeight, EditWeight, MatCardModule, 
    MatButtonModule, MatIconModule, MatListModule, MatTooltipModule],
  templateUrl: './weights.component.html',
  styleUrls: ['./weights.component.css']
})
export class WeightsComponent implements OnInit {
  weights: Weight[] = []; // Array to hold the list of weights
  loading: boolean = false; // Flag to indicate if data is being loaded
  addWeightFlag: boolean = false; // Flag to indicate if the add weight form is visible
  editWeightFlag: boolean = false; // Flag to indicate if the edit weight form is visible

  /**
   * Constructor for the WeightsComponent.
   * @param weightService - Service to interact with weight-related API endpoints.
   * @param router - Angular's Router service for navigation.
   * @description
   * The WeightsComponent constructor initializes the component with the WeightService and Router.
   */
  constructor(
    private weightService: WeightService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * It fetches the weights from the WeightService.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getWeights();
  }

  /**
   * Fetches the list of weights from the WeightService.
   * If an error occurs, it logs the error to the console.
   * @returns {Promise<void>}
   */
  async getWeights(): Promise<void> {
    try {
      this.loading = true; // Set loading flag to true while fetching data
      this.weights = await this.weightService.getWeights(); // Fetch weights from the service
    } catch (error) {
      console.error('Error fetching weights', error); // Log any errors that occur during the fetch
    } finally {
      this.loading = false; // Set loading flag to false after data fetching is complete
    }
  }

  /**
   * Deletes a weight by its ID.
   * @param id - The ID of the weight to delete.
   * @returns {Promise<void>}
   * @description
   * This method calls the WeightService to delete a weight and refreshes the weights list after deletion.
   */
  async deleteWeight(id: string): Promise<void> {
    try {
      const deletedWeight = await this.weightService.deleteWeight(id); // Delete the weight using the service
      
      // Uncomment the line below to log the deleted weight if needed
      //console.log('Weight Deleted', deletedWeight);

      this.getWeights(); // Refresh the weights list after deletion
    } catch (error) {
      console.error('Error deleting weight', error); // Log any errors that occur during the deletion
    }
  }
  
  /**
   * Navigates to the edit weight page with the specified weight ID.
   * @param id - The ID of the weight to edit.
   * @returns {void}
   * @description
   * This method stores the weight ID in localStorage and navigates to the edit weight page.
   */
  editWeight(id: string): void {
    this.editWeightFlag = true; // Set the flag to show the edit weight form
    localStorage.removeItem('weightId'); // Clear any previous weightId
    localStorage.setItem('weightId', id); // Store the weightId in localStorage
  }

  /**
   * Navigates to the add weight page.
   * @returns {void}
   * @description
   * This method navigates the user to the add weight page.
   */
  addWeight(): void {
    this.addWeightFlag = true; // Set the flag to show the add weight form
  }


  handleFormSubmission(): void {
    this.addWeightFlag = false;
    this.editWeightFlag = false;
    this.getWeights(); // Refresh the weights list after a new weight has been added
  }
}