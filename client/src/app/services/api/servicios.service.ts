import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../../models/servicios/servicio';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private apiUrl = 'http://localhost:8080/api/servicios';
  private categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<Servicio[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Servicio[]>(this.apiUrl, { headers });
  }

  getCategorias(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(this.categoriasUrl, { headers });
  }
}
