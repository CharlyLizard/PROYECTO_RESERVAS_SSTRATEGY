import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginWindowComponent } from './components/login/login-window/login-window.component';
import { RecoveryWindowComponent } from './components/login/recovery-window/recovery-window.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'login', component: LoginWindowComponent }, // Ruta para login
  { path: 'recovery', component: RecoveryWindowComponent }, // Ruta para login
];
