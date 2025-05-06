import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    console.log('Llamando a /categorias con headers:', headers); // LOG para depuración
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  gestionarCategoria(accion: 'add' | 'edit' | 'delete', categoria: any) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(
      'http://localhost:8080/categorias/gestionar',
      { accion, categoria },
      { headers }
    );
  }
}
