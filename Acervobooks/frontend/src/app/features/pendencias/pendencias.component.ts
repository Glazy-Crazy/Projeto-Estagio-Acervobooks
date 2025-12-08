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
  emprestimosAtivos: Emprestimo[] = [];
  loading = true;
  mensagemSucesso = '';
  mensagemErro = '';

  ngOnInit() {
    // Verifica se o usuário está autenticado antes de carregar dados
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    const usuarioId = 1; // TODO: Pegar do AuthService
    this.carregarEmprestimos(usuarioId);
  }

  carregarEmprestimos(usuarioId: number) {
    this.loading = true;
    
    // Carregar pendências (atrasados)
    this.emprestimoService.findPendencias(usuarioId).subscribe({
      next: (data) => {
        this.pendencias = data;
      },
      error: () => this.loading = false
    });

    // Carregar empréstimos ativos
    this.emprestimoService.findEmprestimosAtivos(usuarioId).subscribe({
      next: (data) => {
        this.emprestimosAtivos = data;
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
          this.emprestimosAtivos = this.emprestimosAtivos.filter(e => e.id !== emprestimoId);
          this.mostrarSucesso('Livro devolvido com sucesso!');
        },
        error: (err) => this.mostrarErro('Erro ao devolver livro')
      });
    }
  }

  renovarEmprestimo(emprestimoId: number) {
    if (confirm('Deseja renovar o empréstimo por mais 7 dias?')) {
      this.emprestimoService.renovarEmprestimo(emprestimoId).subscribe({
        next: () => {
          this.mostrarSucesso('Empréstimo renovado com sucesso por mais 7 dias!');
          const usuarioId = 1; // TODO: Pegar do AuthService
          this.carregarEmprestimos(usuarioId);
        },
        error: (err) => {
          const mensagem = err.error?.message || 'Erro ao renovar empréstimo';
          this.mostrarErro(mensagem);
        }
      });
    }
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return 'Data não disponível';
    
    // Se já está no formato dd/MM/yyyy, retornar direto
    if (typeof date === 'string' && date.includes('/')) {
      return date;
    }
    
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'Data não disponível' : d.toLocaleDateString('pt-BR');
  }

  parseDataBrasileira(data: string | Date | undefined): Date | null {
    if (!data) return null;
    
    if (typeof data !== 'string') {
      return data instanceof Date ? data : null;
    }
    
    const partes = data.split('/');
    if (partes.length !== 3) return null;
    
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Mês em JS é 0-indexed
    const ano = parseInt(partes[2], 10);
    
    const dateObj = new Date(ano, mes, dia);
    return isNaN(dateObj.getTime()) ? null : dateObj;
  }

  calcularDiasRestantes(dataPrevista: string | Date | undefined): number {
    if (!dataPrevista) return 0;
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    let prevista: Date | null;
    if (typeof dataPrevista === 'string' && dataPrevista.includes('/')) {
      prevista = this.parseDataBrasileira(dataPrevista);
    } else {
      prevista = new Date(dataPrevista);
    }
    
    if (!prevista || isNaN(prevista.getTime())) return 0;
    prevista.setHours(0, 0, 0, 0);
    
    const diff = prevista.getTime() - hoje.getTime();
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dias;
  }

  calcularDiasAtraso(dataPrevista: string | Date | undefined): number {
    if (!dataPrevista) return 0;
    const hoje = new Date();
    const prevista = new Date(dataPrevista);
    const diff = hoje.getTime() - prevista.getTime();
    const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  }

  podeRenovar(emprestimo: Emprestimo): boolean {
    const diasRestantes = this.calcularDiasRestantes(emprestimo.dataPrevistaDevolucao);
    // Pode renovar se estiver no último dia ou faltando 1 dia
    return diasRestantes <= 1 && diasRestantes >= 0;
  }

  mostrarSucesso(mensagem: string) {
    this.mensagemSucesso = mensagem;
    this.mensagemErro = '';
    setTimeout(() => this.mensagemSucesso = '', 5000);
  }

  mostrarErro(mensagem: string) {
    this.mensagemErro = mensagem;
    this.mensagemSucesso = '';
    setTimeout(() => this.mensagemErro = '', 5000);
  }
}
