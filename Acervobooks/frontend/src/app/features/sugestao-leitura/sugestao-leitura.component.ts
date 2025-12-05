import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LivroService } from '../../core/services/livro.service';
import { EmprestimoService } from '../../core/services/emprestimo.service';
import { UserInfoService } from '../../core/user-info.service';
import { AuthService } from '../../core/auth.service';
import { Livro } from '../../core/models/livro.model';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-sugestao-leitura',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './sugestao-leitura.component.html',
  styleUrl: './sugestao-leitura.component.css'
})
export class SugestaoLeituraComponent implements OnInit {
  private livroService = inject(LivroService);
  private emprestimoService = inject(EmprestimoService);
  private userInfoService = inject(UserInfoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  livroSugerido: Livro | null = null;
  loading = true;
  usuarioId: number = 0;
  
  // Toast
  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'erro' | 'sucesso'>('erro');

  ngOnInit() {
    // Verifica se o usuário está autenticado antes de carregar dados
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Carregar informações do usuário
    this.userInfoService.getMe().subscribe({
      next: (usuario) => {
        this.usuarioId = usuario.id;
      },
      error: (err) => console.error('Erro ao carregar usuário:', err)
    });
    
    this.carregarSugestao();
  }

  carregarSugestao() {
    this.loading = true;
    this.livroService.findDisponiveis().subscribe({
      next: (livros) => {
        if (livros.length > 0) {
          const randomIndex = Math.floor(Math.random() * livros.length);
          this.livroSugerido = livros[randomIndex];
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  novaSugestao() {
    this.carregarSugestao();
  }

  alugarLivro() {
    console.log('=== ALUGAR LIVRO CHAMADO ===');
    console.log('Livro Sugerido:', this.livroSugerido);
    console.log('Usuario ID:', this.usuarioId);
    
    if (!this.livroSugerido || !this.livroSugerido.id || !this.usuarioId) {
      console.log('ERRO: Livro ou usuário inválido');
      this.mostrarPopup('Erro ao processar solicitação');
      return;
    }

    const livroId = this.livroSugerido.id;

    // Verificar quantos livros ativos o usuário tem
    this.emprestimoService.findEmprestimosAtivos(this.usuarioId).subscribe({
      next: (emprestimosAtivos) => {
        if (emprestimosAtivos.length >= 3) {
          this.mostrarPopup('Você atingiu o limite de 3 livros alugados');
          return;
        }

        // Se tiver menos de 3, permite alugar
        this.emprestimoService.realizarEmprestimo(this.usuarioId, livroId, 15).subscribe({
          next: () => {
            this.mostrarPopup('Livro alugado com sucesso!', 'sucesso');
            // Carregar nova sugestão após alugar
            setTimeout(() => {
              this.novaSugestao();
            }, 1500);
          },
          error: (err) => {
            console.error('Erro ao alugar livro:', err);
            this.mostrarPopup('Erro ao alugar livro');
          }
        });
      },
      error: (err) => {
        console.error('Erro ao verificar empréstimos ativos:', err);
        this.mostrarPopup('Erro ao verificar empréstimos');
      }
    });
  }

  mostrarPopup(mensagem: string, tipo: 'erro' | 'sucesso' = 'erro'): void {
    this.toastMessage.set(mensagem);
    this.toastType.set(tipo);
    this.showToast.set(true);
    
    // Auto-fechar após 3 segundos
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}
