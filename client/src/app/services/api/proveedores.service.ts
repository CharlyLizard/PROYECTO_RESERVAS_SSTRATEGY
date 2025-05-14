import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../../models/proveedor/proveedor.model';
import { GestionarProveedorResponse } from '../../models/proveedor/GestionarProveedorResponse';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = 'http://localhost:8080/api/proveedores';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/all`);
  }
  gestionarProveedor(accion: string, proveedor: Proveedor): Observable<GestionarProveedorResponse> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<GestionarProveedorResponse>(
      `${this.apiUrl}/gestionar`,
      { accion, proveedor },
      { headers }
    );
  }
}
