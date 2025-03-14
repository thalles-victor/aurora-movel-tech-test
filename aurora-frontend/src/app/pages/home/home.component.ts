import { Component } from '@angular/core';
import { CarCardComponent } from '../../components/car-card/car-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
