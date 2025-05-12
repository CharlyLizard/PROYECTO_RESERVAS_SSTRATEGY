import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Secretario } from '../../models/secretario/secretario.model';

@Injectable({
  providedIn: 'root'
})
export class SecretarioService {
  private apiUrl = 'http://localhost:8080/secretario';

  constructor(private http: HttpClient) {}

  getAllSecretarios(): Observable<Secretario[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Secretario[]>(`${this.apiUrl}/all`, { headers });
  }

  gestionarSecretario(accion: 'add' | 'edit' | 'delete', secretario: Partial<Secretario>) {
  const token = localStorage.getItem('accessToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.post<{ secretarios: Secretario[], secretario?: Secretario }>(
    `${this.apiUrl}/gestionar`,
    { accion, secretario },
    { headers }
  );
}
}
