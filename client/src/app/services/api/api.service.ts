import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  // Signals para manejar el estado de la petición
  reservationResponse = signal<any | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  // Método para enviar datos al servidor usando signals
  async sendReservationData(data: any): Promise<void> {
    this.isLoading.set(true); // Indica que la petición está en curso
    this.error.set(null); // Limpia errores previos

    try {
      const response = await this.http
        .post(`${this.baseUrl}/reservations`, data)
        .toPromise(); // Convierte el observable en una promesa
      this.reservationResponse.set(response); // Actualiza el signal con la respuesta
    } catch (err: any) {
      console.error('Error al enviar los datos:', err);
      this.error.set(err.message || 'Error desconocido'); // Maneja el error
    } finally {
      this.isLoading.set(false); // Finaliza el estado de carga
    }
  }
}
