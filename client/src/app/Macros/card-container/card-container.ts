import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MacroCard } from '../macro-card/macro-card';
import { Input } from '@angular/core';
import { MacroResponse } from '../../models/macroResponse';
import { formatDateToYyyyMmDd } from '../../utils/dateUtils';
import { CreateMeal } from '../../models/createMeal';
import { MealService } from '../../services/mealService';
import { LoadingComponent } from '../../loading-component/loading-component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-card-container',
  imports: [CommonModule, MacroCard, LoadingComponent, ReactiveFormsModule],
  templateUrl: './card-container.html',
  styleUrls: ['./card-container.css']
})
export class CardContainer implements OnInit {
  @Input() macroList: MacroResponse[] = [];
  @Output() mealSaved = new EventEmitter<void>();
  isLoading = false;
  public saveForm!: FormGroup;
  submitted = false;

  constructor(
    private mealService: MealService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.saveForm = this.formBuilder.group({
      mealName: ["", Validators.required]
    });
  }

  // FIXME: Implement save functionality for macro cards
  saveMacros(): void {
    this.submitted = true; // Mark the form as submitted to trigger validation
    if (this.saveForm.invalid) {
      console.error('Form is invalid. Please fill in the required fields.'); // Log an error if the form is invalid
      return; // Exit the function if the form is invalid
    }
    const today = formatDateToYyyyMmDd(new Date());
    let totalCalories = 0;
    let ingredients = '';
    for (const macro of this.macroList)
    {
      totalCalories += macro.calories;
      ingredients += `${macro.itemName} (${macro.portionSize_g}g), `;
    }
    const meal: CreateMeal = {
      name: this.saveForm.get('mealName')?.value || 'Unnamed Meal',
      date: today,
      calories: totalCalories,
      notes: ingredients
    };

    this.macroList = []; // Clear the macro list after saving
    this.isLoading = true; // Set loading state to true while saving

    this.mealService.addMeal(meal).then(response => {
      console.log('Meal saved successfully:', response);
      this.isLoading = false; // Set loading state to false after saving
      this.mealSaved.emit(); // Emit an event to notify that the meal has been saved
    }).catch(error => {
      console.error('Error saving meal:', error);
      this.isLoading = false; // Set loading state to false if there's an error
    });
  }

  handleDelete(macro: MacroResponse): void {
    console.log('Deleting macro:', macro); // Log the macro being deleted for debugging
    this.macroList = this.macroList.filter(m => m !== macro); // Remove the deleted macro from the list'
  }

  get f() { return this.saveForm.controls; }
}
