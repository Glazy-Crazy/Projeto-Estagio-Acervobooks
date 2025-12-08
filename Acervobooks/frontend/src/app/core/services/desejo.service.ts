import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';

export interface Desejo {
  id?: number;
  usuarioId: number;
  livroId: number;
  livroTitulo: string;
  livroAutor: string;
  livroGenero: string;
  livroEditora: string;
  livroAnoPublicacao: number;
  livroCapaUrl: string;
  livroQuantidadeDisponivel: number;
  dataCriacao?: string;
}

@Injectable({ providedIn: 'root' })
export class DesejoService {
  private apiUrl = '/desejos';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  findByUsuarioId(usuarioId: number): Observable<Desejo[]> {
    return this.http.get<Desejo[]>(`${this.apiUrl}/usuario/${usuarioId}`, {
      headers: this.getHeaders()
    });
  }

  toggleDesejo(usuarioId: number, livroId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/toggle`,
      { usuarioId, livroId },
      { headers: this.getHeaders() }
    );
  }

  removerDesejo(usuarioId: number, livroId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${usuarioId}/livro/${livroId}`, {
      headers: this.getHeaders()
    });
  }

  verificarDesejo(usuarioId: number, livroId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/usuario/${usuarioId}/livro/${livroId}/exists`, {
      headers: this.getHeaders()
    });
  }
}
