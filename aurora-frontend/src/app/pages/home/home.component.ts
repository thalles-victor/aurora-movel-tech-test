import { Component } from '@angular/core';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { BackendService } from '../../services/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cars: any;

  constructor(private readonly backendService: BackendService) {
    this.backendService.getAllCars().subscribe({
      next: (response) => {
        this.cars = response;
      },
    });
  }
}
