import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-component',
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './loading-component.html',
  styleUrls: ['./loading-component.css']
})
export class LoadingComponent {
  @Input() loading: boolean = false; // Input property to control the loading state

}
