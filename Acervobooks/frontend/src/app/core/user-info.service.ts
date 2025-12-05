import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioInfo {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataCriacao: string;
  fotoUrl?: string;
  senha?: string; // campo opcional para edição
}

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  // Ajustado para usar o endpoint /usuarios/me
  private apiUrl = '/usuarios/me';
  private baseUrl = '/usuarios';

  constructor(private http: HttpClient) {}

  getMe(): Observable<UsuarioInfo> {
    return this.http.get<UsuarioInfo>(this.apiUrl);
  }

  updateUsuario(id: number, usuario: Partial<UsuarioInfo>): Observable<UsuarioInfo> {
    return this.http.put<UsuarioInfo>(`${this.baseUrl}/${id}`, usuario);
  }
}