import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MacroService } from '../../services/macroService';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardContainer } from '../../Macros/card-container/card-container';
import { LoadingComponent } from '../../loading-component/loading-component';
import { MacroResponse } from '../../models/macroResponse';



@Component({
  selector: 'app-macros',
  imports: [CommonModule, ReactiveFormsModule, CardContainer, LoadingComponent],
  standalone: true,
  templateUrl: './macros.html',
  styleUrls: ['./macros.css']
})
export class Macros implements OnInit {
  public macroForm!: FormGroup; // Form model for macro query input
  submitted = false
  fetchedData: any; // Variable to hold the retrieved macro data
  loading = false; // Variable to indicate loading state
  macroList: MacroResponse[] = []; // List to hold macro card components
  
  @Output() mealSaved = new EventEmitter<void>(); // Event emitter to notify when a meal is saved
  
  constructor(
    private formBuilder: FormBuilder,
    private macroService: MacroService
  ) { }

  ngOnInit(): void {
    this.macroForm = this.formBuilder.group({
      query: ["", [Validators.required, Validators.maxLength(1500)]] // Initialize the query field to an empty string with validation
    })
  }

  async onSubmit(): Promise<void> {
    this.submitted = true; // Mark the form as submitted
    console.log(this.macroForm.value) // Log the form values for debugging
    
    if (this.macroForm.valid) {
      const query = this.macroForm.value.query; // Get the query value from the form
      try {
        this.loading = true; // Set loading state to true before API call
        this.fetchedData = await this.macroService.getMacros(query); // Call the macro service to get macros based on the query
      } catch (error) {
        console.error('Error fetching macros:', error); // Log any errors that occur during the API call
      } finally {
        this.macroList = this.fetchedData || []; // Update the macro list with the fetched data or an empty array if no data is returned
        this.loading = false; // Set loading state to false after API call is complete
        this.macroForm.reset(); // Reset the form after submission
        this.submitted = false; // Reset the submitted state
      }
    }
    
  }

  handleMealSaved(): void {
    console.log('Meal saved event received in Macros component');
    this.macroList = []; // Clear the macro list after a meal is saved
    this.mealSaved.emit(); // Emit an event to notify that the meal has been saved
  }

  get f() {
    return this.macroForm.controls; // Getter for easy access to form controls in the template
  }
}
