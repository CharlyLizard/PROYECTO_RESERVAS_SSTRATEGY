import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicios/servicio';
import { HttpClient } from '@angular/common/http'; // Asegúrate de que HttpClient esté importado
import { Observable } from 'rxjs'; // Asegúrate de que Observable esté importado

@Injectable({
  providedIn: 'root'
})
export class ReservasDataService {
  // Datos de la reserva
  selectedDate: Date | null = null;
  selectedHour: string | null = null;
  selectedTimezone: string | null = null;

  private contactInfo: any = {};
  private servicioSeleccionado: Servicio | null = null;
  private apiUrl = 'http://localhost:8080/api'; // Define una URL base para la API

  private currentStep = 0;

  // Datos de la cita
  private appointmentData: any = {};

  constructor(private http: HttpClient) {} // Inyecta HttpClient

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

  setContactInfo(info: any) {
    this.contactInfo = info;
  }

  getContactInfo() {
    return this.contactInfo;
  }

  getReservationDetails() {
    return {
      date: this.selectedDate,
      hour: this.selectedHour,
      timezone: this.selectedTimezone,
      contactInfo: this.contactInfo,
    };
  }
  setServicioSeleccionado(servicio: Servicio) {
    this.servicioSeleccionado = servicio;
  }

  getServicioSeleccionado(): Servicio | null {
    return this.servicioSeleccionado;
  }

  // Método para limpiar todos los datos
  clearData() {
    this.selectedDate = null;
    this.selectedHour = null;
    this.selectedTimezone = null;
    this.contactInfo = {};
  }

  // Método para verificar si todos los datos del primer paso están completos
  isFirstStepComplete(): boolean {
    return this.selectedDate !== null &&
           this.selectedHour !== null &&
           this.selectedTimezone !== null;
  }

  // Métodos para manejar los pasos
  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  getCurrentStep() {
    return this.currentStep;
  }

  getAllAppointmentsWithDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments/details`);
  }
}
