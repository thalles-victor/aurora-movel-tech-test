import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css',
})
export class RootComponent {
  email: string = '';
  error: string = '';

  constructor(private readonly backendService: BackendService) {}

  createAdmin() {
    this.backendService.createAdmin(this.email).subscribe({
      next: (response) => {
        alert('administrador cadastrado');
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.error = err.message;
      },
    });
  }
}
