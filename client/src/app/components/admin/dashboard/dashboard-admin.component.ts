import { Component } from '@angular/core';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/api/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AdminHeaderComponent,
    AdminCalendarComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    AdminHeaderComponent
  ]
})
export class DashboardAdminComponent {
  adminName: string = '';

  constructor(private authService: AuthService) {}


  handleNotification(notification: any) {
    console.log('Notificación recibida:', notification);
  }

  gOnInit(): void {
    // Suscribirse a los datos del administrador
    this.authService.adminData$.subscribe((data: any) => {
      if (data) {
        this.adminName = data.nombreUsuario; // Mostrar el nombre de usuario en el header
      }
    });
  }
}
