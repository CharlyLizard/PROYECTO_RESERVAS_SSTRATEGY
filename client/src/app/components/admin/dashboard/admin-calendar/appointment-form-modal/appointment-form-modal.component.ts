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
import { ConfiguracionService } from '../../../../../services/api/configuracion.service'; // Importar ConfiguracionService
import { Inject } from '@angular/core';

export interface AppointmentFormData {
  id?: number;
  clientId: number | null;
  serviceId: number | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24-hour format, directly from <input type="time">)
  notes: string; // Cambiado de notes?: string
  timezone: string; // Cambiado de timezone?: string
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
  @Input() appointmentToEdit: any | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  formData: {
    id?: number;
    date: string;
    time: string;
    clientId: number | null;
    serviceId: number | null;
    notes: string;
    timezone: string;
    status: string; // Nuevo campo para el estado
  } = {
    date: '',
    time: '',
    clientId: null,
    serviceId: null,
    notes: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    status: '' // Inicializar estado
  };

  availableClients: any[] = [];
  availableServices: any[] = [];
  availableStatuses: string[] = []; // Para almacenar los estados de las citas

  public clients: Array<{ id: number, name: string }> = []; // <-- Suggested change

  // Inyectar ConfiguracionService
  constructor(
    @Inject(ClienteService) private clienteService: ClienteService,
    private serviciosService: ServiciosService,
    private configuracionService: ConfiguracionService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadServices();
    this.loadAppointmentStatuses(); // Cargar estados de las citas
    if (this.selectedDate && this.mode === 'add') {
      this.formData.date = this.selectedDate;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      if (this.mode === 'add') {
        this.formData = {
          ...this.getInitialFormData(), // Ahora 'notes' y 'timezone' son string
          date: this.selectedDate, // Use the date passed from the calendar
          // timezone: this.formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone, // Ya viene de getInitialFormData
          status: this.availableStatuses.length > 0 ? this.availableStatuses[0] : ''
        };
        this.timeInput = ''; // Reset time for a new appointment
      } else if (this.mode === 'edit' && this.appointmentToEdit) {
        this.formData = {
          id: this.appointmentToEdit.appointmentId || this.appointmentToEdit.id,
          date: this.appointmentToEdit.date ? this.appointmentToEdit.date.substring(0, 10) : '',
          time: '', // Se establecerá por setTimeInputFromBackend
          clientId: this.appointmentToEdit.client?.id || null,
          serviceId: this.appointmentToEdit.service?.id || null,
          notes: this.appointmentToEdit.notes || '', // Asegura que notes sea string
          timezone: this.appointmentToEdit.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone, // Asegura que timezone sea string
          status: this.appointmentToEdit.status || (this.availableStatuses.length > 0 ? this.availableStatuses[0] : '')
        };
        this.setTimeInputFromBackend(this.appointmentToEdit.time); // Esta línea ya convierte y asigna
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
      next: (clientes: Cliente[]) => { this.availableClients = clientes; }, // Tipar clientes
      error: (err: any) => console.error('Error al cargar clientes:', err), // Tipar err
    });
  }

  private loadServices(): void {
    this.serviciosService.getServicios().subscribe({
      next: (servicios: Servicio[]) => { this.availableServices = servicios; }, // Tipar servicios
      error: (err: any) => console.error('Error al cargar servicios:', err), // Tipar err
    });
  }

  loadAppointmentStatuses(): void {
    this.availableStatuses = this.configuracionService.currentLogicaNegocioConfig().estadosCitas;
    if (!this.formData.status && this.availableStatuses.length > 0 && this.mode === 'add') {
      this.formData.status = this.availableStatuses[0]; // Establecer un estado por defecto al agregar
    }
  }

  // This property is bound to the <input type="time">
  // It will hold the time in "HH:mm" (24-hour) format.
  timeInput: string = '';
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
    if (form.valid && this.formData.clientId && this.formData.serviceId && this.formData.date && this.formData.time && this.formData.status) {
      // The formData.time is already "HH:mm" (24-hour) from the input field
      this.save.emit({ ...this.formData });
    } else {
      alert('Por favor, complete todos los campos obligatorios (fecha, hora, cliente, servicio y estado).');
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  // Si necesitas una función parseAmPmTime aquí, deberías definirla:
  // private parseAmPmTime(timeStr: string | null | undefined): string {
  //   if (!timeStr) return '';
  //   // Lógica de conversión de AM/PM a HH:mm
  //   // Ejemplo (simplificado, adaptar de AdminCalendarComponent si es necesario):
  //   const amPmMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  //   if (amPmMatch) {
  //     let hours = parseInt(amPmMatch[1], 10);
  //     const minutes = amPmMatch[2];
  //     const modifier = amPmMatch[3].toUpperCase();
  //     if (modifier === 'PM' && hours < 12) hours += 12;
  //     if (modifier === 'AM' && hours === 12) hours = 0; // Midnight
  //     return `${hours.toString().padStart(2, '0')}:${minutes}`;
  //   }
  //   // Si ya está en formato HH:mm
  //   if (timeStr.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
  //       return timeStr;
  //   }
  //   return ''; // Fallback
  // }
}
