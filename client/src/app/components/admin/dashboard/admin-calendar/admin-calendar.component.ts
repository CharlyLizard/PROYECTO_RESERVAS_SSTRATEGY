import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AdminCalendarComponent {
  selectedDate: Date = new Date();

  // Método para resetear la fecha al día actual
  resetToToday(): void {
    this.selectedDate = new Date();
  }

  dateChanged(event: Date) {
    this.selectedDate = event;
    // Aquí podrías cargar las citas para esta fecha
  }

  hasAppointments(date: Date): boolean {
    // Lógica para verificar si hay citas en esta fecha
    return Math.random() > 0.6; // Para demostración, aleatorio
  }
}
