import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/client/cliente.model';
import { Appointment } from '../../models/appointment/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getClientes(): Observable<Cliente[]> {
    const headers = this.getHeaders();
    return this.http.get<Cliente[]>(`${this.baseUrl}/all`, { headers });
  }

  gestionarCliente(accion: 'add' | 'edit' | 'delete', cliente: Cliente): Observable<{ clientes: Cliente[] }> {
    const headers = this.getHeaders();
    return this.http.post<{ clientes: Cliente[] }>(`${this.baseUrl}/gestionar`, { accion, cliente }, { headers });
  }

  getAppointmentsByClientId(clientId: number): Observable<Appointment[]> {
    const headers = this.getHeaders();
    return this.http.get<Appointment[]>(`http://localhost:8080/api/appointments/client/${clientId}`, { headers });
  }
}
