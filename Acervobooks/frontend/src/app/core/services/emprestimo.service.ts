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

  realizarEmprestimo(usuarioId: number, livroId: number): Observable<Emprestimo> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId.toString())
      .set('livroId', livroId.toString());
    
    return this.http.post<Emprestimo>(`${this.apiUrl}/realizar`, null, { params });
  }

  devolverLivro(emprestimoId: number): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(`${this.apiUrl}/${emprestimoId}/devolver`, null);
  }

  renovarEmprestimo(emprestimoId: number): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(`${this.apiUrl}/${emprestimoId}/renovar`, null);
  }

  podeRenovar(emprestimoId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${emprestimoId}/pode-renovar`);
  }

  calcularDiasRestantes(emprestimoId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${emprestimoId}/dias-restantes`);
  }
}
