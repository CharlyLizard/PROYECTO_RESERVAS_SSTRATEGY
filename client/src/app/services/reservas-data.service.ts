import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicios/servicio';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasDataService {
  selectedDate: Date | null = null;
  selectedHour: string | null = null;
  selectedTimezone: string | null = null;

  private contactInfo: any = {};
  private servicioSeleccionado: Servicio | null = null;
  private apiUrl = 'http://localhost:8080/api';

  private currentStep = 0;

 private appointmentData: any = {};

  constructor(private http: HttpClient) {}

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

  clearData() {
    this.selectedDate = null;
    this.selectedHour = null;
    this.selectedTimezone = null;
    this.contactInfo = {};
  }

  isFirstStepComplete(): boolean {
    return this.selectedDate !== null &&
           this.selectedHour !== null &&
           this.selectedTimezone !== null;
  }

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
      appointment: appointmentData
    };
    return this.http.post<any>(`${this.apiUrl}/appointments/gestionar`, payload);
  }

  createAppointment(appointmentData: any): Observable<any> {
    return this.gestionarAppointment('add', appointmentData);
  }

  updateAppointment(appointmentId: number, appointmentData: any): Observable<any> {
    const dataWithId = { ...appointmentData, id: appointmentId };
    return this.gestionarAppointment('edit', dataWithId);
  }

  getAllAppointmentsWithDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments/details`);
  }
}
