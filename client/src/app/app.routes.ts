import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/admin/dashboard/dashboard-admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'admin', component: DashboardAdminComponent }, // Ruta para admin dashboard
  { path: 'admin/appointments', component: DashboardAdminComponent }, // Dashboard con citas
  { path: 'admin/customers', component: DashboardAdminComponent }, // Dashboard con clientes
  { path: 'admin/employees', component: DashboardAdminComponent }, // Dashboard con empleados
  { path: 'admin/reports', component: DashboardAdminComponent }, // Dashboard con reportes
  { path: 'admin/settings', component: DashboardAdminComponent }, // Dashboard con configuración
  { path: '**', redirectTo: '' } // Redirección para rutas no encontradas
];
