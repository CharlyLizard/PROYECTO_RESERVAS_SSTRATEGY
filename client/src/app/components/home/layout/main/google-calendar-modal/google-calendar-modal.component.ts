import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importa DatePipe

export interface GoogleCalendarModalDetails {
  serviceName: string;
  date: Date;
  time: string;
  // Añade más campos si son necesarios para mostrar en el modal
}

@Component({
  selector: 'app-google-calendar-modal',
  standalone: true,
  imports: [CommonModule], // DatePipe se provee a través de CommonModule en standalone
  providers: [DatePipe], // O añádelo aquí si es necesario explícitamente
  templateUrl: './google-calendar-modal.component.html',
})
export class GoogleCalendarModalComponent {
  @Input() appointmentDetails: GoogleCalendarModalDetails | null = null;

  @Output() addToCalendarAndConfirm = new EventEmitter<void>();
  @Output() confirmOnly = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onAddToCalendarAndConfirm(): void {
    this.addToCalendarAndConfirm.emit();
  }

  onConfirmOnly(): void {
    this.confirmOnly.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
