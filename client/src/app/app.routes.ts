import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  //{ path: 'login/:perfil', component: LoginComponent }, // Ruta para login
  //{ path: '**', redirectTo: '' } // Redirección para rutas no encontradas
];
