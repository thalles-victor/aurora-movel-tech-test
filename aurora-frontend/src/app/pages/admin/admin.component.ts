import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService, CreateCarDto } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  vehicle: CreateCarDto = {
    licensePlate: '',
    chassis: '',
    registrationNumber: '',
    model: '',
    brand: '',
    year: '',
    imageUrl: '',
  };
  error: string | null = '';

  constructor(
    private readonly backendService: BackendService,
    private readonly router: Router
  ) {}

  createCar() {
    console.log(this.vehicle);

    if (!this.vehicle.imageUrl) {
      this.error = 'você precisa selecionar uma imagem';
      return;
    }

    if (
      this.vehicle.imageUrl &&
      this.error === 'você precisa selecionar uma imagem'
    ) {
      this.error = '';
    }

    this.backendService.createCar(this.vehicle).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.error = err.message || 'error ao criar o carrog';
        console.error('error whe create the car ', err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.backendService.uploadImage(file).subscribe({
        next: (response: any) => {
          this.vehicle.imageUrl = response.url;
          this.error = null;
          console.log('imagem enviada com sucesso'), response;
        },
        error: (err) => {
          this.error = err.message || 'error ao enviar a image';
          console.error('error no upload', err);
        },
      });
    }
  }
}
