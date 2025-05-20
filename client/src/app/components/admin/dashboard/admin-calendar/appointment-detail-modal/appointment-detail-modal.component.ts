import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importa DatePipe
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-appointment-detail-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, DatePipe], // Agrega DatePipe a imports
  templateUrl: './appointment-detail-modal.component.html',
  styleUrls: ['./appointment-detail-modal.component.css']
})
export class AppointmentDetailModalComponent {
  @Input() appointment: any;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() modify = new EventEmitter<any>(); // Emit the appointment data for modification
  @Output() delete = new EventEmitter<any>();

  constructor() {}

  closeModal(): void {
    this.close.emit();
  }

  onModify(): void {
    this.modify.emit(this.appointment); // Emit the current appointment data
  }

  onDelete(): void {
    if (this.appointment && this.appointment.appointmentId
) {
      this.delete.emit(this.appointment.appointmentId
); // Emite el ID de la cita
    } else {
      console.error('Error: No se puede eliminar la cita sin un ID.');
    }
}

  get clientName(): string {
    return this.appointment?.client?.name || 'No especificado';
  }

  get serviceName(): string {
    return this.appointment?.service?.name || 'No especificado';
  }

  get serviceColor(): string {
    return this.appointment?.service?.color || '#cccccc';
  }
}
