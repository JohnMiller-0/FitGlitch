import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MacroResponse } from '../../models/macroResponse';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-macro-card',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './macro-card.html',
  styleUrls: ['./macro-card.css']
})
export class MacroCard implements OnInit {

  @Input() itemMacros: MacroResponse | null = null;
  @Output() delete = new EventEmitter<MacroResponse>();

  constructor() { }

  ngOnInit(): void {
  }

  // FIXME: Implement delete functionality for macro card items
  deleteItem(): void {
    console.log(this.itemMacros) // Log the item macros for debugging
    if (this.itemMacros) {
      this.delete.emit(this.itemMacros);
    }
  }

}