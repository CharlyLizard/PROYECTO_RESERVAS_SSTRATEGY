import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/orm/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Categoria[]>(this.apiUrl, { headers });
  }

  gestionarCategoria(accion: 'add' | 'edit' | 'delete', categoria: Categoria): Observable<{categorias: Categoria[], categoria?: Categoria}> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<{categorias: Categoria[], categoria?: Categoria}>(
      `${this.apiUrl}/gestionar`,
      { accion, categoria },
      { headers }
    );
  }
}
