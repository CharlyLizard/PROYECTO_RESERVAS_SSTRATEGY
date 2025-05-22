import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionService } from '../../../../../../services/api/configuracion.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'horas-reserva',
  standalone: true, // Asegúrate de que sea standalone si no lo es ya
  imports: [CommonModule],
  templateUrl: './horas-reserva.component.html'
})
export class HorasReservaComponent implements OnInit, OnChanges {
  @Input() initialHour: string | null = null;
  @Input() selectedDate: Date | null = null; // Nueva entrada para la fecha seleccionada
  @Input() serviceDurationMinutes: number = 30; // Duración del servicio en minutos, por defecto 30
  @Input() intervalMinutes: number = 15; // Intervalo para generar slots, por defecto 15

  @Output() hourChange = new EventEmitter<string>();

  hours: string[] = [];
  selectedHour: string | null = null;

  private configuracionService = inject(ConfiguracionService);

  constructor() {}

  ngOnInit() {
    this.loadAvailableHours();
    if (this.initialHour && this.hours.includes(this.initialHour)) {
      this.selectedHour = this.initialHour;
    } else if (this.hours.length > 0 && !this.initialHour) {
      // Opcional: seleccionar la primera hora disponible si no hay hora inicial
      // this.onHourSelected(this.hours[0]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] || changes['serviceDurationMinutes'] || changes['intervalMinutes']) {
      this.loadAvailableHours();
      // Si la hora seleccionada previamente ya no está en la nueva lista, deseleccionarla
      if (this.selectedHour && !this.hours.includes(this.selectedHour)) {
        this.selectedHour = null;
        this.hourChange.emit(''); // Emitir vacío o null para indicar deselección
      }
    }
  }

  loadAvailableHours(): void {
    console.log('[HorasReserva] loadAvailableHours - Selected Date:', this.selectedDate);
    console.log('[HorasReserva] loadAvailableHours - Service Duration:', this.serviceDurationMinutes);
    console.log('[HorasReserva] loadAvailableHours - Interval Minutes:', this.intervalMinutes);

    this.hours = []; // Limpiar horas anteriores
    if (this.selectedDate && this.serviceDurationMinutes > 0) {
      const availableSlots24Hour = this.configuracionService.getAvailableTimeSlots(
        this.selectedDate,
        this.serviceDurationMinutes,
        this.intervalMinutes
      );
      console.log('[HorasReserva] loadAvailableHours - Slots from service (24h):', availableSlots24Hour);
      // Convertir de "HH:mm" a "HH:mm AM/PM" para la visualización
      this.hours = availableSlots24Hour.map(time24 => this.convertToAmPm(time24));
      console.log('[HorasReserva] loadAvailableHours - Processed hours (AM/PM):', this.hours);
    } else {
      console.log('[HorasReserva] loadAvailableHours - Conditions not met to load hours.');
    }
  }

  private convertToAmPm(time24: string): string {
    if (!time24) return '';
    const [hoursStr, minutesStr] = time24.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    if (isNaN(hours) || isNaN(minutes)) return '';

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // la hora '0' debe ser '12'
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  onHourSelected(hour: string): void {
    this.selectedHour = hour;
    this.hourChange.emit(hour);
  }

  isSelected(hour: string): boolean {
    return hour === this.selectedHour;
  }
}
