import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  createAccount() {
    this.authService
      .createAccount(this.name, this.email, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error('Erro completo:', err);

          if (err.status === 401) {
            this.error = err.message;
          } else {
            this.error = 'Erro ao registrar. Tente novamente.';
          }
        },
      });
  }
}
