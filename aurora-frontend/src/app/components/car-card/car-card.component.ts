import { Component, Input } from '@angular/core';

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

  deleteCar() {
    console.log('Deletar carro:', this.car.id);
  }
}
