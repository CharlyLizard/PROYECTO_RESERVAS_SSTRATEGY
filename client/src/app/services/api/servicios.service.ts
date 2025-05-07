import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../../models/servicios/servicio'; // Importa el modelo

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://localhost:8080/api/servicios';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<Servicio[]> { // Devuelve Observable<Servicio[]>
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Servicio[]>(this.apiUrl, { headers });
  }

  getServiciosSeleccionados(): Observable<Servicio[]> { // Devuelve Observable<Servicio[]>
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Servicio[]>(`${this.apiUrl}/seleccionados`, { headers });
  }

  gestionarServicio(accion: 'add' | 'edit' | 'delete', servicio: Partial<Servicio>): Observable<{servicios: Servicio[], servicio?: Servicio}> { // Tipa el parámetro y la respuesta
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<{servicios: Servicio[], servicio?: Servicio}>(
      `${this.apiUrl}/gestionar`,
      { accion, servicio },
      { headers }
    );
  }
}
