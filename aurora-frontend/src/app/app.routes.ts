import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { RootComponent } from './pages/root/root.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'criar-conta',
    component: CreateAccountComponent,
  },
  {
    path: '',
    component: HomeComponent,
    // canActivate: [authGuard],
    // data: { role: 'USER' },
  },
  {
    path: 'root',
    component: RootComponent,
    canActivate: [authGuard],
    data: { role: 'ROOT' },
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
