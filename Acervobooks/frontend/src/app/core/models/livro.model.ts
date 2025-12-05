export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn?: string;
  editora?: string;
  anoPublicacao?: number;
  genero?: string;
  sinopse?: string;
  descricao?: string;
  numeroPaginas?: number;
  idioma?: string;
  quantidadeDisponivel: number;
  quantidadeTotal: number;
  capaUrl?: string;
}
