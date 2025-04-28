import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../models/appointment/appointment.model';
import { firstValueFrom } from 'rxjs';
import { Servicio } from '../../models/servicios/servicio';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  reservationResponse = signal<Appointment | null>(null);

  constructor(private http: HttpClient) {}

  async sendReservationData(data: Appointment): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<Appointment>(`${this.baseUrl}/appointments`, data)
      );
      this.reservationResponse.set(response ?? null);
    } catch (err) {
      console.error('Error al enviar los datos:', err);
    }
  }

  getServicioSeleccionado() {
    return this.http.get<Servicio[]>(`${this.baseUrl}/servicios/seleccionados`);
  }
}
