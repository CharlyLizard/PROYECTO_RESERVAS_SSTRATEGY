import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule]
})
export class AdminSidebarComponent {
  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/admin', active: true },
    { name: 'Citas', icon: 'calendar_today', route: '/admin/appointments' },
    { name: 'Clientes', icon: 'people', route: '/admin/customers' },
    { name: 'Empleados', icon: 'badge', route: '/admin/employees' },
    { name: 'Reportes', icon: 'analytics', route: '/admin/reports' },
    { name: 'Configuración', icon: 'settings', route: '/admin/settings' }
  ];
}
