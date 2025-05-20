import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Importa 'of' para simular respuestas
import { ConfigGeneral } from '../../components/settings/config-general/config-general.component'; // Ajusta la ruta si es necesario

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

  getGeneralConfig(): Observable<ConfigGeneral | null> {
    // TODO: Reemplazar con la llamada HTTP real cuando el backend esté listo
    // return this.http.get<ConfigGeneral>(`${this.apiUrl}/general`, { headers: this.getHeaders() });

    // Simulación mientras no hay backend:
    console.warn('ConfiguracionService: Usando datos simulados para getGeneralConfig()');
    const mockConfig: ConfigGeneral = {
      nombreEmpresa: 'Mi Empresa Fantástica',
      emailEmpresa: 'contacto@empresa.com',
      enlaceEmpresa: 'https://empresa.com',
      logotipoUrl: 'https://via.placeholder.com/150/439B84/FFFFFF?Text=Logo', // URL de un placeholder
      colorCorporativo: '#FF5733',
      tema: 'Oscuro',
      formatoFecha: 'MDY',
      primerDiaSemana: 'Domingo',
      idiomaPredeterminado: 'English',
      zonaHorariaPredeterminada: 'America/New_York'
    };
    return of(mockConfig); // Devuelve un Observable con datos simulados
  }

  saveGeneralConfig(config: Omit<ConfigGeneral, 'selectedFile'>): Observable<ConfigGeneral> {
    // TODO: Reemplazar con la llamada HTTP real
    // return this.http.post<ConfigGeneral>(`${this.apiUrl}/general`, config, { headers: this.getHeaders() });

    // Simulación:
    console.warn('ConfiguracionService: Usando simulación para saveGeneralConfig()');
    console.log('Guardando en simulación:', config);
    return of({ ...config, logotipoUrl: config.logotipoUrl || this.generarUrlSimuladaLogo() } as ConfigGeneral);
  }

  uploadLogo(file: File): Observable<{ logotipoUrl: string }> {
    const formData = new FormData();
    formData.append('logo', file, file.name);

    // TODO: Reemplazar con la llamada HTTP real
    // return this.http.post<{ logotipoUrl: string }>(`${this.apiUrl}/general/logo`, formData, { headers: this.getHeaders() /* Ajustar headers para FormData si es necesario */ });

    // Simulación:
    console.warn('ConfiguracionService: Usando simulación para uploadLogo()');
    return of({ logotipoUrl: this.generarUrlSimuladaLogo(file.name) });
  }

  private generarUrlSimuladaLogo(fileName?: string): string {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return `https://via.placeholder.com/150/${randomColor}/FFFFFF?Text=${fileName ? fileName.substring(0,3) : 'Logo'}`;
  }
}
