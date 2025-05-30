import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionService } from '../../../../../../services/api/configuracion.service';

@Component({
  selector: 'horas-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horas-reserva.component.html'
})
export class HorasReservaComponent implements OnInit, OnChanges {
  @Input() initialHour: string | null = null;
  @Input() selectedDate: Date | null = null;
  @Input() serviceDurationMinutes: number = 30;
  @Input() intervalMinutes: number = 15;

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
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] || changes['serviceDurationMinutes'] || changes['intervalMinutes']) {
      this.loadAvailableHours();
      if (this.selectedHour && !this.hours.includes(this.selectedHour)) {
        this.selectedHour = null;
        this.hourChange.emit('');
      }
    }
  }

  loadAvailableHours(): void {
    console.log('[HorasReserva] loadAvailableHours - Selected Date:', this.selectedDate);
    console.log('[HorasReserva] loadAvailableHours - Service Duration:', this.serviceDurationMinutes);
    console.log('[HorasReserva] loadAvailableHours - Interval Minutes:', this.intervalMinutes);

    this.hours = [];
    if (this.selectedDate && this.serviceDurationMinutes > 0) {
      const availableSlots24Hour = this.configuracionService.getAvailableTimeSlots(
        this.selectedDate,
        this.serviceDurationMinutes,
        this.intervalMinutes
      );
      console.log('[HorasReserva] loadAvailableHours - Slots from service (24h):', availableSlots24Hour);
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
    hours = hours ? hours : 12;
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
