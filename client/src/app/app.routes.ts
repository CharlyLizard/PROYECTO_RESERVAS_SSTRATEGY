import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/admin/dashboard/dashboard-admin.component';
import { LoginWindowComponent } from './components/login/login-window/login-window.component';
import { RecoveryWindowComponent } from './components/login/recovery-window/recovery-window.component';
import { ClienteComponent } from './components/admin/clients/cliente.component';
import { ServiciosComponent } from './components/admin/servicios/servicios.component';
import { CategoriasComponent} from './components/admin/categorias/categorias.component';
import { ProveedoresComponent } from './components/admin/proveedores/proveedores.component';
import { SecretariosComponent } from './components/admin/secretarios/secretarios.component';
import { AdministradoresComponent } from './components/admin/administradores/administradores.component';
import { CuentaComponent } from './components/admin/cuenta/cuenta.component';
import { AcercaDeComponent } from './components/admin/acerca-de/acerca-de.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './Guards/auth.guards';

export const routes: Routes = [
  //Ruta home
  { path: '', component: HomeComponent },

  //Ruta admin, con todas sus funcionalidades
  // Rutas protegidas por AuthGuard
  { path: 'admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/appointments', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/customers', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/employees', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/reports', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/settings', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/clients', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'admin/services', component: ServiciosComponent, canActivate: [AuthGuard] },
  { path: 'admin/categories', component: CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'admin/providers', component: ProveedoresComponent, canActivate: [AuthGuard] },
  { path: 'admin/secretary', component: SecretariosComponent, canActivate: [AuthGuard] },
  { path: 'admin/administradores', component: AdministradoresComponent, canActivate: [AuthGuard] },
  { path: 'admin/cuenta', component: CuentaComponent, canActivate: [AuthGuard] },
  { path: 'admin/acerca-de', component: AcercaDeComponent, canActivate: [AuthGuard] },
  { path: 'admin/configuracion', component: SettingsComponent, canActivate: [AuthGuard] },



  //Ruta login
  { path: 'login', component: LoginWindowComponent },
  { path: 'recovery', component: RecoveryWindowComponent },

  //Redireccion
  { path: '**', redirectTo: '' }
];
