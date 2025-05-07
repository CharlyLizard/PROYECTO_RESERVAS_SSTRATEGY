// filepath: client/src/app/services/api/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importar HttpHeaders
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Admin } from '../../models/admin/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Definir apiUrl (ajusta la base si es necesario)
  private adminDataSource = new BehaviorSubject<Admin | null>(null);
  adminData$ = this.adminDataSource.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getAccessToken() !== null); // Definir isLoggedInSubject
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Opcional: Cargar datos del admin desde localStorage al iniciar si es necesario
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      this.adminDataSource.next(JSON.parse(adminData));
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token && response.admin) {
          localStorage.setItem('accessToken', response.token);
          localStorage.setItem('admin', JSON.stringify(response.admin)); // Guardar admin en localStorage
          this.adminDataSource.next(response.admin as Admin);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('admin'); // Limpiar admin de localStorage
    this.adminDataSource.next(null); // Corregido: usar adminDataSource
    this.isLoggedInSubject.next(false);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getAdmin(): Admin | null { // Tipar el retorno
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) as Admin : null;
  }

  setAdminData(data: Admin | null) { // Tipar el parámetro
    this.adminDataSource.next(data); // Corregido: usar adminDataSource
    if (data) {
      localStorage.setItem('admin', JSON.stringify(data));
    } else {
      localStorage.removeItem('admin');
    }
  }

  getAdminData(): Admin | null { // Tipar el retorno
    return this.adminDataSource.getValue(); // Corregido: usar adminDataSource
  }

  actualizarAdmin(adminData: Partial<Admin>): Observable<Admin> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Corregir la URL para que coincida con el endpoint del backend
    return this.http.put<Admin>(`${this.apiUrl}/admin`, adminData, { headers })
      .pipe(
        tap(updatedAdmin => {
          this.adminDataSource.next(updatedAdmin);
          localStorage.setItem('admin', JSON.stringify(updatedAdmin));
        })
      );
  }
}
