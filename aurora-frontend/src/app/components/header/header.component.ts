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
  isRoot: boolean = false;
  isAdmin: boolean = false;

  constructor(private readonly authService: AuthService) {
    this.user = authService.getCurrentUser();

    if (this.user?.roles.includes('ROOT')) {
      this.isRoot = true;
    }

    if (this.user?.roles.includes('ADMIN')) {
      this.isAdmin = true;
    }
  }

  logout() {
    this.authService.logout();
  }
}
