import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/admin/dashboard/dashboard-admin.component';
import { LoginWindowComponent } from './components/login/login-window/login-window.component';
import { RecoveryWindowComponent } from './components/login/recovery-window/recovery-window.component';
import { ClientsComponent } from './components/admin/clients/cliente.component';
import { ServiciosComponent } from './components/admin/servicios/servicios.component';
import { CategoriasComponent} from './components/admin/categorias/categorias.component';
import { ProveedoresComponent } from './components/admin/proveedores/proveedores.component';

export const routes: Routes = [
  //Ruta home
  { path: '', component: HomeComponent },

  //Ruta admin, con todas sus funcionalidades
  { path: 'admin', component: DashboardAdminComponent },
  { path: 'admin/appointments', component: DashboardAdminComponent },
  { path: 'admin/customers', component: DashboardAdminComponent },
  { path: 'admin/employees', component: DashboardAdminComponent },
  { path: 'admin/reports', component: DashboardAdminComponent },
  { path: 'admin/settings', component: DashboardAdminComponent },
  {path: 'admin/clients',component: ClientsComponent},
  {path: 'admin/services',component: ServiciosComponent},
  {path: 'admin/categories',component: CategoriasComponent },
  {path: 'admin/providers',component: ProveedoresComponent },

  //Ruta login
  { path: 'login', component: LoginWindowComponent },
  { path: 'recovery', component: RecoveryWindowComponent },

  //Redireccion
  { path: '**', redirectTo: '' }
];
