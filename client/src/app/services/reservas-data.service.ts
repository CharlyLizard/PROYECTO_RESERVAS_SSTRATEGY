import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicios/servicio';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Asegúrate de que HttpClient y HttpHeaders estén importados
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

  gestionarAppointment(accion: 'add' | 'edit' | 'delete', appointmentData: any): Observable<any> {
    const payload = {
      accion: accion,
      appointment: appointmentData // Para 'delete', appointmentData sería { id: appointmentId }
    };
    return this.http.post<any>(`${this.apiUrl}/appointments/gestionar`, payload);
  }

  createAppointment(appointmentData: any): Observable<any> {
    // Esta función podría ser una llamada específica si 'gestionarAppointment' no la cubre para 'add'
    // o simplemente llamar a gestionarAppointment
    return this.gestionarAppointment('add', appointmentData);
  }

  updateAppointment(appointmentId: number, appointmentData: any): Observable<any> {
    // Similar a createAppointment
    const dataWithId = { ...appointmentData, id: appointmentId };
    return this.gestionarAppointment('edit', dataWithId);
  }

  getAllAppointmentsWithDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments/details`);
  }
}
