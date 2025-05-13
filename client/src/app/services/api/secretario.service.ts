import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Secretario } from '../../models/secretario/secretario.model';

@Injectable({
  providedIn: 'root',
})
export class SecretarioService {
  private apiUrl = 'http://localhost:8080/secretario';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAllSecretarios(): Observable<Secretario[]> {
    return this.http.get<Secretario[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  gestionarSecretario(
    accion: 'add' | 'edit' | 'delete',
    secretario: Partial<Secretario>
  ) {
    return this.http.post<{
      secretarios: Secretario[];
      secretario?: Secretario;
    }>(
      `${this.apiUrl}/gestionar`,
      { accion, secretario },
      { headers: this.getHeaders() }
    );
  }

  public asignarProveedorASecretario(
    secretarioId: number,
    proveedorId: number | null
  ): Observable<Secretario> {
    return this.http.put<Secretario>(
      `${this.apiUrl}/${secretarioId}/asignar-proveedor`,
      null,
      {
        params: proveedorId !== null ? { proveedorId: proveedorId.toString() } : {},
        headers: this.getHeaders(),
      }
    );
  }

  public getSecretariosParaDropdownProveedores(
    proveedorIdActual: number | null
  ): Observable<Secretario[]> {
    return this.http.get<Secretario[]>(
      `${this.apiUrl}/disponibles-para-dropdown`,
      {
        params: proveedorIdActual !== null
          ? { proveedorIdActual: proveedorIdActual.toString() }
          : {},
        headers: this.getHeaders(),
      }
    );
  }
}