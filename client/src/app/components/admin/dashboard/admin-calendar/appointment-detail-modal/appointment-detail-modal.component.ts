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

  constructor() {}

  closeModal(): void {
    this.close.emit();
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
