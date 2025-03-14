import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export type CreateCarDto = {
  licensePlate: string;
  chassis: string;
  registrationNumber: string;
  model: string;
  brand: string;
  year: string;
  imageUrl?: string;
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiBaseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  createAdmin(email: string) {
    const url = `${this.apiBaseUrl}/v1/auth/admin`;

    return this.http.post(url, { email }).pipe(
      tap((response) => {
        console.log('admin cadastrado com sucesso');
        alert('admin cadastrado com sucesso');
      }),
      catchError((err) => {
        const errorMessage =
          err.error?.message || 'Error ao cadastrar administrador';

        return throwError(() => ({
          status: err.status,
          message: errorMessage,
          error: err.error,
        }));
      })
    );
  }

  uploadImage(file: File) {
    const url = `${this.apiBaseUrl}/v1/upload/image`;
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post(url, formData).pipe(
      tap(
        (response) => {
          console.log('imagem enviada com sucesso');
          console.log(response);
        },
        catchError((err) => {
          const errorMessage = err.error?.message || 'erro ao enviar a imagem';
          return throwError(() => ({
            status: err.status,
            message: errorMessage,
            error: err.error,
          }));
        })
      )
    );
  }

  createCar(carDto: CreateCarDto) {
    const url = `${this.apiBaseUrl}/v1/car`;

    return this.http.post(url, carDto).pipe(
      tap((response) => {
        console.log('carro criado com sucesso');
        console.log(response);
      }),
      catchError((err) => {
        const errorMessage = err.error?.message || 'erro ao criar o carro';
        return throwError(() => ({
          status: err.status,
          message: errorMessage,
          error: err.error,
        }));
      })
    );
  }

  getAllCars() {
    const url = `${this.apiBaseUrl}/v1/car/all`;
    return this.http.get(url).pipe(
      catchError((err) => {
        const errorMessage = err.error?.message || 'erro ao buscar os carros';
        return throwError(() => ({
          status: err.status,
          message: errorMessage,
          error: err.error,
        }));
      })
    );
  }
}
