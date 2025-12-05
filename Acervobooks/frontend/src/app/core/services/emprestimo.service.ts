import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo } from '../models/emprestimo.model';
import { StatusEmprestimo } from '../models/status-emprestimo.enum';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private apiUrl = '/emprestimos';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  findById(id: number): Observable<Emprestimo> {
    return this.http.get<Emprestimo>(`${this.apiUrl}/${id}`);
  }

  findByUsuario(usuarioId: number): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  findEmprestimosAtivos(usuarioId: number): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/usuario/${usuarioId}/ativos`);
  }

  findPendencias(usuarioId: number): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/usuario/${usuarioId}/pendencias`);
  }

  findByStatus(status: StatusEmprestimo): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/status/${status}`);
  }

  realizarEmprestimo(usuarioId: number, livroId: number, diasEmprestimo: number = 14): Observable<Emprestimo> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId.toString())
      .set('livroId', livroId.toString())
      .set('diasEmprestimo', diasEmprestimo.toString());
    
    return this.http.post<Emprestimo>(`${this.apiUrl}/realizar`, null, { params });
  }

  devolverLivro(emprestimoId: number): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(`${this.apiUrl}/${emprestimoId}/devolver`, null);
  }

  renovarEmprestimo(emprestimoId: number, diasAdicionais: number = 7): Observable<Emprestimo> {
    const params = new HttpParams().set('diasAdicionais', diasAdicionais.toString());
    return this.http.put<Emprestimo>(`${this.apiUrl}/${emprestimoId}/renovar`, null, { params });
  }
}
