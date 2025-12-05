import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UserInfoService } from '../../core/user-info.service';
import { LivroService } from '../../core/services/livro.service';
import { Livro } from '../../core/models/livro.model';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  userName: string = '';
  totalLivrosAcervo: number = 0;
  livrosAlugados: number = 0;
  livrosRecentes: Livro[] = [];
  recomendacoes: Livro[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private livroService: LivroService
  ) {}

  ngOnInit() {
    // Verifica autenticação
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Carrega informações do usuário
    this.loadUserInfo();
    
    // Carrega estatísticas e livros
    this.loadStatistics();
    this.loadRecentBooks();
    this.loadRecommendations();
  }

  loadUserInfo() {
    this.userInfoService.getMe().subscribe({
      next: (user: any) => {
        this.userName = user.nome.split(' ')[0]; // Primeiro nome
      },
      error: () => {
        this.userName = 'Usuário';
      }
    });
  }

  loadStatistics() {
    this.livroService.findAll().subscribe({
      next: (livros: Livro[]) => {
        this.totalLivrosAcervo = livros.length;
        // TODO: Implementar contagem de livros alugados quando houver endpoint
        this.livrosAlugados = 0;
      }
    });
  }

  loadRecentBooks() {
    this.livroService.findAll().subscribe({
      next: (livros: Livro[]) => {
        // Ordena por ID (mais recentes primeiro) e pega os 6 primeiros
        this.livrosRecentes = livros
          .sort((a: Livro, b: Livro) => (b.id || 0) - (a.id || 0))
          .slice(0, 6);
      }
    });
  }

  loadRecommendations() {
    this.livroService.findAll().subscribe({
      next: (livros: Livro[]) => {
        // Pega livros aleatórios como recomendações
        const shuffled = [...livros].sort(() => Math.random() - 0.5);
        this.recomendacoes = shuffled.slice(0, 4);
      }
    });
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  verTodosRecentes() {
    this.router.navigate(['/acervo']);
  }
}
