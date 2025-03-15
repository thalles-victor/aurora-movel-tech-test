import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StateKey, TransferState, makeStateKey } from '@angular/core'; // Atualizado para Angular 19
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse, User } from '../../@shared/types';
import { environment } from '../../environments/environment';

const USER_KEY: StateKey<User> = makeStateKey<User>('currentUser');
const TOKEN_KEY: StateKey<string> = makeStateKey<string>('accessToken');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiBaseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState
  ) {
    this.initializeState();
  }

  private initializeState() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('accessToken');
      if (storedUser && storedToken) {
        this.currentUserSubject.next(JSON.parse(storedUser));
        this.transferState.set(USER_KEY, JSON.parse(storedUser));
        this.transferState.set(TOKEN_KEY, storedToken);
      }
    } else {
      const user = this.transferState.get(USER_KEY, null);
      if (user) {
        this.currentUserSubject.next(user);
      }
    }
  }

  createAccount(
    name: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    const apiUrl = `${this.apiBaseUrl}/v1/auth/sign-up`;
    return this.http.post<AuthResponse>(apiUrl, { name, email, password }).pipe(
      tap((response) => {
        this.currentUserSubject.next(response.user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('accessToken', response.accessToken.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }

        this.transferState.set(USER_KEY, response.user);
        this.transferState.set(TOKEN_KEY, response.accessToken.token);
      }),
      catchError((err) => {
        const errorMessage =
          err.error?.message ||
          'Erro ao registrar. Verifique os dados fornecidos.';
        return throwError(() => ({
          status: err.status,
          message: errorMessage,
          error: err.error,
        }));
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const apiUrl = `${this.apiBaseUrl}/v1/auth/sign-in`;
    return this.http.post<AuthResponse>(apiUrl, { email, password }).pipe(
      tap((response) => {
        this.currentUserSubject.next(response.user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('accessToken', response.accessToken.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }

        this.transferState.set(USER_KEY, response.user);
        this.transferState.set(TOKEN_KEY, response.accessToken.token);
      }),
      catchError((err) => {
        const errorMessage =
          err.error?.message ||
          'Erro ao fazer login. Verifique suas credenciais.';
        return throwError(() => ({
          status: err.status,
          message: errorMessage,
          error: err.error,
        }));
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      window.location.reload();
    }
    this.transferState.remove(USER_KEY);
    this.transferState.remove(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('accessToken');
    }
    return !!this.transferState.get(TOKEN_KEY, null);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('accessToken');
    }
    return this.transferState.get(TOKEN_KEY, null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.roles.includes(role) : false;
  }
}
