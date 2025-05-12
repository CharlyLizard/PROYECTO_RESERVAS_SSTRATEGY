import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../../models/proveedor/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = 'http://localhost:8080/api/proveedores';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/all`);
  }

  gestionarProveedor(accion: string, proveedor: Proveedor): Observable<any> {
    return this.http.post(`${this.apiUrl}/gestionar`, {
      accion,
      proveedor
    });
  }
}
