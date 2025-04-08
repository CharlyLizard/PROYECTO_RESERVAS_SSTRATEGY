import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule]
})
export class AdminHeaderComponent {
  @Input() adminName: string = '';

  notifications = [
    { id: 1, message: 'Nueva reserva creada', time: '10:30 AM' },
    { id: 2, message: 'Cancelación de cita', time: '12:15 PM' },
    { id: 3, message: 'Recordatorio: Reunión a las 3PM', time: '2:00 PM' }
  ];

  unreadNotifications = 3;
}
