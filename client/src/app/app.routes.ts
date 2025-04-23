import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/admin/dashboard/dashboard-admin.component';
import { LoginWindowComponent } from './components/login/login-window/login-window.component';
import { RecoveryWindowComponent } from './components/login/recovery-window/recovery-window.component';
import { ClientsComponent } from './components/admin/clients/cliente.component';
import { ServiciosComponent } from './components/admin/servicios/servicios.component';
import { CategoriasComponent } from './components/admin/categorias/categorias.component';
import { ProveedoresComponent } from './components/admin/proveedores/proveedores.component';
import { SecretariosComponent } from './components/admin/secretarios/secretarios.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'admin',
    component: DashboardAdminComponent,
    children: [
      { path: '', redirectTo: 'appointments', pathMatch: 'full' },
      { path: 'appointments', component: DashboardAdminComponent },
      { path: 'customers', component: DashboardAdminComponent },
      { path: 'employees', component: DashboardAdminComponent },
      { path: 'reports', component: DashboardAdminComponent },
      { path: 'settings', component: DashboardAdminComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'services', component: ServiciosComponent },
      { path: 'categories', component: CategoriasComponent },
      { path: 'providers', component: ProveedoresComponent },
      { path: 'secretary', component: SecretariosComponent }
    ]
  },

  { path: 'login', component: LoginWindowComponent },
  { path: 'recovery', component: RecoveryWindowComponent },
  { path: '**', redirectTo: '' }
];
