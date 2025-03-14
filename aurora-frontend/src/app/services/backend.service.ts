import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

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
}
