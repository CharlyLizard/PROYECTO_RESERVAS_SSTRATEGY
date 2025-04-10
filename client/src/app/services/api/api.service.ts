import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  // Signal para almacenar el estado de la respuesta
  reservationResponse = signal<any | null>(null);

  constructor(private http: HttpClient) {}

  // Método para enviar datos al servidor y actualizar el signal
  sendReservationData(data: any): void {
    this.http.post(`${this.baseUrl}/reservations`, data).subscribe({
      next: (response) => {
        this.reservationResponse.set(response); // Actualiza el signal con la respuesta
      },
      error: (error) => {
        console.error('Error al enviar los datos:', error);
        this.reservationResponse.set(null); // Maneja el error
      },
    });
  }
}
