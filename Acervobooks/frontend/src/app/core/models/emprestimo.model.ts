import { StatusEmprestimo } from './status-emprestimo.enum';
import { Livro } from './livro.model';

export interface Emprestimo {
  id?: number;
  usuarioId: number;
  usuarioNome?: string;
  livroId: number;
  livroTitulo?: string;
  livroAutor?: string;
  livroCapaUrl?: string;
  livro?: Livro; // Objeto completo do livro
  dataEmprestimo: string;
  dataPrevistaDevolucao: string;
  dataEfetivaDevolucao?: string;
  status: StatusEmprestimo;
  observacoes?: string;
}
