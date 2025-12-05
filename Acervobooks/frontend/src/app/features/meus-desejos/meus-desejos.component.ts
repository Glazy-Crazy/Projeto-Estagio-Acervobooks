import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DesejoService } from '../../core/services/desejo.service';
import { UserInfoService } from '../../core/user-info.service';
import { AuthService } from '../../core/auth.service';
import { Livro } from '../../core/models/livro.model';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-meus-desejos',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './meus-desejos.component.html',
  styleUrl: './meus-desejos.component.css'
})
export class MeusDesejosComponent implements OnInit {
  private desejoService = inject(DesejoService);
  private userInfoService = inject(UserInfoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  livros = signal<Livro[]>([]);
  loading = signal<boolean>(true);
  usuarioId: number = 0;

  ngOnInit() {
    // Verifica se o usuário está autenticado antes de carregar dados
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.carregarUsuario();
  }

  carregarUsuario(): void {
    this.userInfoService.getMe().subscribe({
      next: (usuario) => {
        this.usuarioId = usuario.id;
        this.carregarDesejos();
      },
      error: (err) => console.error('Erro ao carregar usuário:', err)
    });
  }

  carregarDesejos(): void {
    if (!this.usuarioId) return;

    this.desejoService.findByUsuarioId(this.usuarioId).subscribe({
      next: (desejos) => {
        this.livros.set(desejos.map(desejo => desejo.livro));
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar desejos:', err);
        this.loading.set(false);
      }
    });
  }

  removerDesejo(livroId: number): void {
    if (!this.usuarioId) return;

    this.desejoService.toggleDesejo(this.usuarioId, livroId).subscribe({
      next: () => {
        this.carregarDesejos();
      },
      error: (err) => console.error('Erro ao remover desejo:', err)
    });
  }
}
