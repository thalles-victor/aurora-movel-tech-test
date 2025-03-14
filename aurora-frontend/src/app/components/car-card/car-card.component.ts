import { Component, Input } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

export interface Car {
  id: string;
  WYSIWYGId: any;
  deletedAt: any;
  createdAt: string;
  updateAt: string;
  brand: string;
  licensePlate: string;
  chassis: string;
  registrationNumber: string;
  year: string;
  model: string;
  imageUrl: string;
}

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  @Input() car!: Car;

  constructor(
    private readonly backendService: BackendService,
    private router: Router
  ) {}

  softDeleteCar() {
    this.backendService.softDeleteCar(this.car.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        alert('error ao deletar o carro');
      },
    });
  }
}
