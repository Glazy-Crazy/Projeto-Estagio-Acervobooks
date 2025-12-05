import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../../core/services/livro.service';
import { AuthService } from '../../../core/auth.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-cadastrar-livro',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './cadastrar-livro.component.html',
  styleUrl: './cadastrar-livro.component.css'
})
export class CadastrarLivroComponent {
  livro = {
    titulo: '',
    autor: '',
    editora: '',
    isbn: '',
    anoPublicacao: new Date().getFullYear(),
    genero: '',
    sinopse: '',
    numeroPaginas: 0,
    idioma: 'Português',
    capaUrl: '',
    quantidadeTotal: 1,
    quantidadeDisponivel: 1
  };

  loading = signal(false);
  mensagem = signal('');
  erro = signal('');

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

  onSubmit() {
    this.loading.set(true);
    this.mensagem.set('');
    this.erro.set('');

    this.livroService.create(this.livro).subscribe({
      next: () => {
        this.mensagem.set('Livro cadastrado com sucesso!');
        this.loading.set(false);
        // Limpa o formulário
        this.livro = {
          titulo: '',
          autor: '',
          editora: '',
          isbn: '',
          anoPublicacao: new Date().getFullYear(),
          genero: '',
          sinopse: '',
          numeroPaginas: 0,
          idioma: 'Português',
          capaUrl: '',
          quantidadeTotal: 1,
          quantidadeDisponivel: 1
        };
        // Redireciona após 2 segundos
        setTimeout(() => this.router.navigate(['/acervo']), 2000);
      },
      error: (err) => {
        this.erro.set('Erro ao cadastrar livro: ' + (err.error?.message || err.message));
        this.loading.set(false);
      }
    });
  }

  updateQuantidadeDisponivel() {
    this.livro.quantidadeDisponivel = this.livro.quantidadeTotal;
  }
}
