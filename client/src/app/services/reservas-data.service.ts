import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservasDataService {
  // Datos de la reserva
  selectedDate: Date | null = null;
  selectedHour: string | null = null;
  selectedTimezone: string | null = null;

  constructor() { }

  // Métodos para actualizar los datos
  setDate(date: Date | null) {
    this.selectedDate = date;
  }

  setHour(hour: string) {
    this.selectedHour = hour;
  }

  setTimezone(timezone: string) {
    this.selectedTimezone = timezone;
  }

  // Método para limpiar todos los datos
  clearData() {
    this.selectedDate = null;
    this.selectedHour = null;
    this.selectedTimezone = null;
  }
}
