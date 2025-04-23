import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'horas-reserva',
  imports: [CommonModule],
  templateUrl: './horas-reserva.component.html'
})
export class HorasReservaComponent {
  @Input() initialHour: string | null = null;
  @Output() hourChange = new EventEmitter<string>();

  hours: string[] = [];
  selectedHour: string | null = null;

  constructor() {
    this.generateHours();
  }

  ngOnInit() {
    if (this.initialHour) {
      this.selectedHour = this.initialHour;
    }
  }

  generateHours() {
    const startHour = 8; // 8 AM
    const endHour = 20; // 8 PM
    const intervals = ['00', '15', '30', '45']; // Intervalos de 15 minutos

    for (let hour = startHour; hour < endHour; hour++) {
      for (let interval of intervals) {
        const hourString = hour < 10 ? `0${hour}` : `${hour}`; // Formatear la hora con dos dígitos
        const time = `${hourString}:${interval}`;
        const ampm = hour < 12 ? 'AM' : 'PM'; // AM o PM
        this.hours.push(`${time} ${ampm}`);
      }
    }
  }

  onHourSelected(hour: string) {
    this.selectedHour = hour;
    this.hourChange.emit(hour);
  }

  isSelected(hour: string): boolean {
    return hour === this.selectedHour;
  }
}
