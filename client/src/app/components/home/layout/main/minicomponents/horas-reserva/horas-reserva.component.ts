import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'horas-reserva',
  imports: [CommonModule],
  templateUrl: './horas-reserva.component.html'
})
export class HorasReservaComponent {
  @Output() hourChange = new EventEmitter<string>();
  hours: string[] = [];

  constructor() {
    this.generateHours();
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
    this.hourChange.emit(hour);
  }
}
