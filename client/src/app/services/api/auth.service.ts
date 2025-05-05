import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlLogin = 'http://localhost:8080/auth/login'; // Ajusta el puerto si es necesario

  // BehaviorSubject para almacenar los datos del administrador
  private adminData = new BehaviorSubject<any>(null);
  adminData$ = this.adminData.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('admin', JSON.stringify(response.admin));
        this.setAdminData(response.admin); // Actualizar los datos del administrador
      })
    );
  }

  logout() {
    localStorage.clear();
    this.setAdminData(null); // Limpiar los datos del administrador
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getAdmin(): any {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  }

  setAdminData(data: any) {
    this.adminData.next(data);
  }

  getAdminData() {
    return this.adminData.getValue();
  }

  actualizarAdmin(admin: any) {
    return this.http.put<any>('http://localhost:8080/auth/admin', admin);
  }
}
