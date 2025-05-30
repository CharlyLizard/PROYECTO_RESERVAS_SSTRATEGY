import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Admin } from '../../models/admin/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private adminDataSource = new BehaviorSubject<Admin | null>(null);
  adminData$ = this.adminDataSource.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getAccessToken() !== null);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
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
          localStorage.setItem('admin', JSON.stringify(response.admin));
          this.adminDataSource.next(response.admin as Admin);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('admin');
    this.adminDataSource.next(null);
    this.isLoggedInSubject.next(false);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getAdmin(): Admin | null {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) as Admin : null;
  }

  setAdminData(data: Admin | null) {
    this.adminDataSource.next(data);
    if (data) {
      localStorage.setItem('admin', JSON.stringify(data));
    } else {
      localStorage.removeItem('admin');
    }
  }

  getAdminData(): Admin | null {
    return this.adminDataSource.getValue();
  }

  actualizarAdmin(adminData: Partial<Admin>): Observable<Admin> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Admin>(`${this.apiUrl}/admin`, adminData, { headers })
      .pipe(
        tap(updatedAdmin => {
          this.adminDataSource.next(updatedAdmin);
          localStorage.setItem('admin', JSON.stringify(updatedAdmin));
        })
      );
  }
}
