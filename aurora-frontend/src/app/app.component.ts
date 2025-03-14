import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarCardComponent } from './components/car-card/car-card.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'aurora-frontend';
}
