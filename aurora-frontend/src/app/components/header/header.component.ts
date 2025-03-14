import { Component } from '@angular/core';
import { User } from '../../../@shared/types';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: User | null = null;

  constructor(private readonly authService: AuthService) {
    this.user = authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}
