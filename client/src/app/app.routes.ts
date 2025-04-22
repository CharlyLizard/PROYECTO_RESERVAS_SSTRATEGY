import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/admin/dashboard/dashboard-admin.component';
import { LoginWindowComponent } from './components/login/login-window/login-window.component';
import { RecoveryWindowComponent } from './components/login/recovery-window/recovery-window.component';
import { ClientsComponent } from './components/admin/clients/cliente.component';
import { ServiciosComponent } from './components/admin/servicios/servicios.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'admin', component: DashboardAdminComponent }, // Ruta para admin dashboard
  { path: 'admin/appointments', component: DashboardAdminComponent }, // Dashboard con citas
  { path: 'admin/customers', component: DashboardAdminComponent }, // Dashboard con clientes
  { path: 'admin/employees', component: DashboardAdminComponent }, // Dashboard con empleados
  { path: 'admin/reports', component: DashboardAdminComponent }, // Dashboard con reportes
  { path: 'admin/settings', component: DashboardAdminComponent }, // Dashboard con configuración
  { path: 'login', component: LoginWindowComponent },
  { path: 'recovery', component: RecoveryWindowComponent },
  {path: 'admin/clients',component: ClientsComponent},
  {path: 'admin/services',component: ServiciosComponent},
  { path: '**', redirectTo: '' } // Redirección para rutas no encontradas
];
