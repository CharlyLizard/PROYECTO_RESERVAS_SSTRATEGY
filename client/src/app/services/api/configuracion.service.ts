import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigGeneral } from '../../models/admin/config-general.model'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private apiUrl = 'http://localhost:8080/api/configuracion'; // URL base para la API de configuración

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken'); // O tu método para obtener el token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Obtener la configuración general desde el backend
  getGeneralConfig(): Observable<ConfigGeneral> {
    return this.http.get<ConfigGeneral>(`${this.apiUrl}/general`, { headers: this.getHeaders() });
  }

  // Guardar la configuración general en el backend
  saveGeneralConfig(config: Omit<ConfigGeneral, 'selectedFile'>): Observable<ConfigGeneral> {
    return this.http.post<ConfigGeneral>(`${this.apiUrl}/general`, config, { headers: this.getHeaders() });
  }

  // Subir el logotipo al backend
  uploadLogo(file: File): Observable<{ logotipoUrl: string }> {
    const formData = new FormData();
    formData.append('logo', file, file.name);

    return this.http.post<{ logotipoUrl: string }>(`${this.apiUrl}/general/logo`, formData, {
      headers: this.getHeaders()
    });
  }
}
