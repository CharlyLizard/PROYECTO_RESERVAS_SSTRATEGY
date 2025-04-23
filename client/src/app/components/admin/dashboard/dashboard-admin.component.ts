import { Component } from '@angular/core';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  adminName: string = 'Admin User';

  handleNotification(notification: any) {
    console.log('Notificación recibida:', notification);
  }
}
