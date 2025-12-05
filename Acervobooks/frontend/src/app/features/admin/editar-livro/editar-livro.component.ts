import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../../core/services/livro.service';
import { AuthService } from '../../../core/auth.service';
import { Livro } from '../../../core/models/livro.model';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-editar-livro',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './editar-livro.component.html',
  styleUrl: './editar-livro.component.css'
})
export class EditarLivroComponent implements OnInit {
  livros = signal<Livro[]>([]);
  livroSelecionado = signal<Livro | null>(null);
  loading = signal(false);
  loadingLivros = signal(true);
  mensagem = signal('');
  erro = signal('');
  termoBusca = signal('');

  constructor(
    private livroService: LivroService,
    private authService: AuthService,
    public router: Router
  ) {
    // Verifica se é admin
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.carregarLivros();
  }

  carregarLivros() {
    this.loadingLivros.set(true);
    this.livroService.findAll().subscribe({
      next: (livros) => {
        this.livros.set(livros);
        this.loadingLivros.set(false);
      },
      error: (err) => {
        this.erro.set('Erro ao carregar livros: ' + err.message);
        this.loadingLivros.set(false);
      }
    });
  }

  selecionarLivro(livro: Livro) {
    this.livroSelecionado.set({ ...livro });
    this.mensagem.set('');
    this.erro.set('');
  }

  cancelarEdicao() {
    this.livroSelecionado.set(null);
    this.mensagem.set('');
    this.erro.set('');
  }

  salvarAlteracoes() {
    const livro = this.livroSelecionado();
    if (!livro || !livro.id) return;

    this.loading.set(true);
    this.mensagem.set('');
    this.erro.set('');

    this.livroService.update(livro.id, livro).subscribe({
      next: () => {
        this.mensagem.set('Livro atualizado com sucesso!');
        this.loading.set(false);
        this.carregarLivros();
        setTimeout(() => {
          this.livroSelecionado.set(null);
          this.mensagem.set('');
        }, 2000);
      },
      error: (err) => {
        this.erro.set('Erro ao atualizar livro: ' + (err.error?.message || err.message));
        this.loading.set(false);
      }
    });
  }

  excluirLivro(id: number) {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;

    this.livroService.delete(id).subscribe({
      next: () => {
        this.mensagem.set('Livro excluído com sucesso!');
        this.carregarLivros();
        if (this.livroSelecionado()?.id === id) {
          this.livroSelecionado.set(null);
        }
        setTimeout(() => this.mensagem.set(''), 3000);
      },
      error: (err) => {
        this.erro.set('Erro ao excluir livro: ' + (err.error?.message || err.message));
      }
    });
  }

  get livrosFiltrados() {
    const termo = this.termoBusca().toLowerCase();
    if (!termo) return this.livros();
    
    return this.livros().filter(livro => 
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo)
    );
  }

  updateQuantidadeDisponivel() {
    const livro = this.livroSelecionado();
    if (livro && livro.quantidadeDisponivel > livro.quantidadeTotal) {
      livro.quantidadeDisponivel = livro.quantidadeTotal;
    }
  }
}
