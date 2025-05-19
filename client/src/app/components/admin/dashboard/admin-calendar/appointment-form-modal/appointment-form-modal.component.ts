import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // FormsModule for ngModel and NgForm
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Assuming these models and services are correctly defined and located
import { Cliente } from '../../../../../models/client/cliente.model';
import { Servicio } from '../../../../../models/servicios/servicio';
import { ClienteService } from '../../../../../services/api/clients.service';
import { ServiciosService } from '../../../../../services/api/servicios.service';
import { Inject } from '@angular/core';

export interface AppointmentFormData {
  id?: number;
  clientId: number | null;
  serviceId: number | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24-hour format, directly from <input type="time">)
  notes?: string;
  timezone?: string;
}

@Component({
  selector: 'app-appointment-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Required for ngModel and form features
    MatIconModule,
    MatButtonModule
  ],
  providers: [ClienteService, ServiciosService],
  templateUrl: './appointment-form-modal.component.html',
  styleUrls: ['./appointment-form-modal.component.css']
})
export class AppointmentFormModalComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() selectedDate: string = ''; // Expected format: YYYY-MM-DD (for add mode)
  @Input() appointmentToEdit: any | null = null; // Full appointment object from backend for edit mode

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<AppointmentFormData>();

  formData: AppointmentFormData = this.getInitialFormData();

  clients: Cliente[] = [];
  services: Servicio[] = [];

  // This property is bound to the <input type="time">
  // It will hold the time in "HH:mm" (24-hour) format.
  timeInput: string = '';
  constructor(
    @Inject(ClienteService) private clienteService: ClienteService,
    @Inject(ServiciosService) private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadServices();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      if (this.mode === 'add') {
        this.formData = {
          ...this.getInitialFormData(),
          date: this.selectedDate, // Use the date passed from the calendar
          timezone: this.formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        this.timeInput = ''; // Reset time for a new appointment
      } else if (this.mode === 'edit' && this.appointmentToEdit) {
        this.formData = {
          id: this.appointmentToEdit.appointmentId || this.appointmentToEdit.id,
          clientId: this.appointmentToEdit.client?.id || null,
          serviceId: this.appointmentToEdit.service?.id || null,
          date: this.appointmentToEdit.date ? this.appointmentToEdit.date.substring(0, 10) : '',
          time: '', // This will be set by setTimeInputFromBackend
          notes: this.appointmentToEdit.notes || '',
          timezone: this.appointmentToEdit.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        // Convert backend time (e.g., "08:00 AM") to "HH:mm" for the input field
        this.setTimeInputFromBackend(this.appointmentToEdit.time);
      }
    }
  }

  private getInitialFormData(): AppointmentFormData {
    return {
      clientId: null,
      serviceId: null,
      date: '',
      time: '', // Will store "HH:mm"
      notes: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  private loadClients(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => { this.clients = clientes; },
      error: (err) => console.error('Error al cargar clientes:', err),
    });
  }

  private loadServices(): void {
    this.serviciosService.getServicios().subscribe({
      next: (servicios) => { this.services = servicios; },
      error: (err) => console.error('Error al cargar servicios:', err),
    });
  }

  // Getter and Setter for timeInput to interact with formData.time
  get formTime(): string {
    return this.timeInput;
  }

  set formTime(value: string) { // value is "HH:mm" from <input type="time">
    this.timeInput = value;
    this.formData.time = value; // Store "HH:mm" directly
  }

  private setTimeInputFromBackend(backendTime: string | null | undefined): void {
    if (!backendTime) {
      this.timeInput = '';
      this.formData.time = '';
      return;
    }
    // Check if backendTime is already in HH:mm format (e.g., from a previous edit not yet saved)
    const already24HourMatch = backendTime.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
    if (already24HourMatch) {
        this.timeInput = backendTime;
        this.formData.time = backendTime;
        return;
    }

    const amPmMatch = backendTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (amPmMatch) {
      let hours = parseInt(amPmMatch[1], 10);
      const minutes = amPmMatch[2]; // This is already a string like "00"
      const modifier = amPmMatch[3].toUpperCase();

      if (modifier === 'PM' && hours < 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) { // Midnight case: 12 AM should be 00 hours
        hours = 0;
      }
      this.timeInput = `${hours.toString().padStart(2, '0')}:${minutes}`;
    } else {
      // Fallback for other formats or if parsing fails, try to take first 5 chars if it looks like HH:mm
      const timeParts = backendTime.split(':');
      if (timeParts.length >= 2) {
        this.timeInput = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;
      } else {
        this.timeInput = ''; // Default to empty if cannot parse
      }
    }
    this.formData.time = this.timeInput; // Ensure formData.time is also updated
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.formData.clientId && this.formData.serviceId && this.formData.date && this.formData.time) {
      // The formData.time is already "HH:mm" (24-hour) from the input field
      this.save.emit({ ...this.formData });
    } else {
      alert('Por favor, complete todos los campos obligatorios (fecha, hora, cliente y servicio).');
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
