import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = '/livros';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  findById(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  findDisponiveis(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/disponiveis`);
  }

  findByTitulo(titulo: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/buscar/titulo/${titulo}`);
  }

  findByAutor(autor: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/buscar/autor/${autor}`);
  }

  findByGenero(genero: string): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/buscar/genero/${genero}`);
  }

  create(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  update(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
