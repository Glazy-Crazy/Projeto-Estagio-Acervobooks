import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../core/services/livro.service';
import { DesejoService } from '../../core/services/desejo.service';
import { EmprestimoService } from '../../core/services/emprestimo.service';
import { UserInfoService } from '../../core/user-info.service';
import { AuthService } from '../../core/auth.service';
import { Livro } from '../../core/models/livro.model';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-acervo',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './acervo.component.html',
  styleUrl: './acervo.component.css'
})
export class AcervoComponent implements OnInit {
  private livroService = inject(LivroService);
  private desejoService = inject(DesejoService);
  private emprestimoService = inject(EmprestimoService);
  private userInfoService = inject(UserInfoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  livros = signal<Livro[]>([]);
  livrosFiltrados = signal<Livro[]>([]);
  loading = signal<boolean>(true);
  usuarioId: number = 0;

  // Filtros
  searchTerm = signal<string>('');
  selectedGenero = signal<string>('');
  selectedDisponibilidade = signal<string>('');
  generos = signal<string[]>([]);

  // Toast
  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'sucesso' | 'erro'>('sucesso');

  ngOnInit() {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }

    this.userInfoService.getMe().subscribe({
      next: (user: any) => {
        this.usuarioId = user.id;
      },
      error: (err) => {
        console.error('Erro ao carregar usuário:', err);
        // Não redireciona, apenas define ID padrão
        this.usuarioId = 0;
      }
    });

    // Carrega livros independentemente
    this.carregarLivros();
  }

  carregarLivros() {
    this.loading.set(true);
    this.livroService.findAll().subscribe({
      next: (livros: Livro[]) => {
        this.livros.set(livros);
        this.livrosFiltrados.set(livros);
        this.extrairGeneros(livros);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.mostrarToast('Erro ao carregar livros', 'erro');
      }
    });
  }

  extrairGeneros(livros: Livro[]) {
    const generosUnicos = [...new Set(livros.map(l => l.genero).filter(g => g))] as string[];
    this.generos.set(generosUnicos);
  }

  aplicarFiltros() {
    let resultado = this.livros();

    // Filtro de busca
    if (this.searchTerm()) {
      const termo = this.searchTerm().toLowerCase();
      resultado = resultado.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo) ||
        livro.genero?.toLowerCase().includes(termo) ||
        livro.editora?.toLowerCase().includes(termo)
      );
    }

    // Filtro de gênero
    if (this.selectedGenero()) {
      resultado = resultado.filter(livro => livro.genero === this.selectedGenero());
    }

    // Filtro de disponibilidade
    if (this.selectedDisponibilidade() === 'disponivel') {
      resultado = resultado.filter(livro => (livro.quantidadeDisponivel || 0) > 0);
    } else if (this.selectedDisponibilidade() === 'indisponivel') {
      resultado = resultado.filter(livro => (livro.quantidadeDisponivel || 0) === 0);
    }

    this.livrosFiltrados.set(resultado);
  }

  limparFiltros() {
    this.searchTerm.set('');
    this.selectedGenero.set('');
    this.selectedDisponibilidade.set('');
    this.livrosFiltrados.set(this.livros());
  }

  adicionarDesejo(livroId: number) {
    if (!this.usuarioId) {
      this.mostrarToast('Erro: Usuário não identificado', 'erro');
      return;
    }

    this.desejoService.toggleDesejo(this.usuarioId, livroId).subscribe({
      next: (response: any) => {
        if (response.adicionado) {
          this.mostrarToast('❤️ Livro adicionado à lista de desejos!', 'sucesso');
        } else {
          this.mostrarToast('💔 Livro removido da lista de desejos', 'sucesso');
        }
      },
      error: (err) => {
        console.error('Erro ao alternar desejo:', err);
        this.mostrarToast('Erro ao processar desejo. Tente novamente.', 'erro');
      }
    });
  }

  alugarLivro(livroId: number) {
    if (!this.usuarioId) {
      this.mostrarToast('Erro: Usuário não identificado', 'erro');
      return;
    }

    this.emprestimoService.realizarEmprestimo(this.usuarioId, livroId).subscribe({
      next: () => {
        this.mostrarToast('Livro alugado com sucesso! Prazo: 7 dias', 'sucesso');
        this.carregarLivros(); // Recarrega para atualizar disponibilidade
      },
      error: (err: any) => {
        const mensagem = err.error?.message || err.error || 'Erro ao alugar livro';
        this.mostrarToast(mensagem, 'erro');
      }
    });
  }

  mostrarToast(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.toastMessage.set(mensagem);
    this.toastType.set(tipo);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }
}
