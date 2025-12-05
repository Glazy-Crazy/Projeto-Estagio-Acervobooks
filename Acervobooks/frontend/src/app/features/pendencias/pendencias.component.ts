import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmprestimoService } from '../../core/services/emprestimo.service';
import { AuthService } from '../../core/auth.service';
import { Emprestimo } from '../../core/models/emprestimo.model';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-pendencias',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './pendencias.component.html',
  styleUrl: './pendencias.component.css'
})
export class PendenciasComponent implements OnInit {
  private emprestimoService = inject(EmprestimoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  pendencias: Emprestimo[] = [];
  loading = true;

  ngOnInit() {
    // Verifica se o usuário está autenticado antes de carregar dados
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    const usuarioId = 1; // TODO: Pegar do AuthService
    this.emprestimoService.findPendencias(usuarioId).subscribe({
      next: (data) => {
        this.pendencias = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  devolverLivro(emprestimoId: number) {
    if (confirm('Confirmar devolução?')) {
      this.emprestimoService.devolverLivro(emprestimoId).subscribe({
        next: () => {
          this.pendencias = this.pendencias.filter(p => p.id !== emprestimoId);
          alert('Livro devolvido com sucesso!');
        },
        error: (err) => alert('Erro ao devolver livro')
      });
    }
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'Data não disponível';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  }

  calcularDiasAtraso(dataPrevista: string | Date | undefined): number {
    if (!dataPrevista) return 0;
    const hoje = new Date();
    const prevista = new Date(dataPrevista);
    const diff = hoje.getTime() - prevista.getTime();
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  }
}
