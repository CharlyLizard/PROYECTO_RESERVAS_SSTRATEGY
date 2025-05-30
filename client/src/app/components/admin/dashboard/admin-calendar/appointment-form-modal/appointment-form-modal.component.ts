import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Cliente } from '../../../../../models/client/cliente.model';
import { Servicio } from '../../../../../models/servicios/servicio';
import { ClienteService } from '../../../../../services/api/clients.service';
import { ServiciosService } from '../../../../../services/api/servicios.service';
import { ConfiguracionService } from '../../../../../services/api/configuracion.service';
import { Inject } from '@angular/core';

export interface AppointmentFormData {
  id?: number;
  clientId: number | null;
  serviceId: number | null;
  date: string;
  time: string;
  notes: string;
  timezone: string;
}

@Component({
  selector: 'app-appointment-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  @Input() selectedDate: string = '';
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
    status: string;
  } = {
    date: '',
    time: '',
    clientId: null,
    serviceId: null,
    notes: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    status: ''
  };

  availableClients: any[] = [];
  availableServices: any[] = [];
  availableStatuses: string[] = [];

  public clients: Array<{ id: number, name: string }> = [];
  constructor(
    @Inject(ClienteService) private clienteService: ClienteService,
    private serviciosService: ServiciosService,
    private configuracionService: ConfiguracionService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadServices();
    this.loadAppointmentStatuses();
    if (this.selectedDate && this.mode === 'add') {
      this.formData.date = this.selectedDate;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      if (this.mode === 'add') {
        this.formData = {
          ...this.getInitialFormData(),
          date: this.selectedDate,
          status: this.availableStatuses.length > 0 ? this.availableStatuses[0] : ''
        };
        this.timeInput = '';
      } else if (this.mode === 'edit' && this.appointmentToEdit) {
        this.formData = {
          id: this.appointmentToEdit.appointmentId || this.appointmentToEdit.id,
          date: this.appointmentToEdit.date ? this.appointmentToEdit.date.substring(0, 10) : '',
          time: '',
          clientId: this.appointmentToEdit.client?.id || null,
          serviceId: this.appointmentToEdit.service?.id || null,
          notes: this.appointmentToEdit.notes || '',
          timezone: this.appointmentToEdit.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          status: this.appointmentToEdit.status || (this.availableStatuses.length > 0 ? this.availableStatuses[0] : '')
        };
        this.setTimeInputFromBackend(this.appointmentToEdit.time);
      }
    }
  }

  private getInitialFormData(): AppointmentFormData {
    return {
      clientId: null,
      serviceId: null,
      date: '',
      time: '',
      notes: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  private loadClients(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => { this.availableClients = clientes; },
      error: (err: any) => console.error('Error al cargar clientes:', err),
    });
  }

  private loadServices(): void {
    this.serviciosService.getServicios().subscribe({
      next: (servicios: Servicio[]) => { this.availableServices = servicios; },
      error: (err: any) => console.error('Error al cargar servicios:', err),
    });
  }

  loadAppointmentStatuses(): void {
    this.availableStatuses = this.configuracionService.currentLogicaNegocioConfig().estadosCitas;
    if (!this.formData.status && this.availableStatuses.length > 0 && this.mode === 'add') {
      this.formData.status = this.availableStatuses[0];
    }
  }

  timeInput: string = '';
  get formTime(): string {
    return this.timeInput;
  }

  set formTime(value: string) {
    this.timeInput = value;
    this.formData.time = value;
  }

  private setTimeInputFromBackend(backendTime: string | null | undefined): void {
    if (!backendTime) {
      this.timeInput = '';
      this.formData.time = '';
      return;
    }
    const already24HourMatch = backendTime.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
    if (already24HourMatch) {
        this.timeInput = backendTime;
        this.formData.time = backendTime;
        return;
    }

    const amPmMatch = backendTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (amPmMatch) {
      let hours = parseInt(amPmMatch[1], 10);
      const minutes = amPmMatch[2];
      const modifier = amPmMatch[3].toUpperCase();

      if (modifier === 'PM' && hours < 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }
      this.timeInput = `${hours.toString().padStart(2, '0')}:${minutes}`;
    } else {
      const timeParts = backendTime.split(':');
      if (timeParts.length >= 2) {
        this.timeInput = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;
      } else {
        this.timeInput = '';
      }
    }
    this.formData.time = this.timeInput;
  }

  onSubmit(form: NgForm): void {
    if (form.valid && this.formData.clientId && this.formData.serviceId && this.formData.date && this.formData.time && this.formData.status) {
+      this.save.emit({ ...this.formData });
    } else {
      alert('Por favor, complete todos los campos obligatorios (fecha, hora, cliente, servicio y estado).');
    }
  }

  closeModal(): void {
    this.close.emit();
  }

}
