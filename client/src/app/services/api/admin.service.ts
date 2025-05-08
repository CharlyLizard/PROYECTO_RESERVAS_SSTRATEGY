import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../../models/admin/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<Admin[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Admin[]>(`${this.apiUrl}/all`, { headers });
  }

  gestionarAdmin(accion: 'add' | 'edit' | 'delete', admin: Partial<Admin>): Observable<{ administradores: Admin[], admin?: Admin }> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<{ administradores: Admin[], admin?: Admin }>(
      `${this.apiUrl}/gestionar`,
      { accion, admin },
      { headers }
    );
  }
}
