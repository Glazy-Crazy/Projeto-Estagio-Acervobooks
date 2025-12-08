import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { Emprestimo } from '../../../core/models/emprestimo.model';
import { StatusEmprestimo } from '../../../core/models/status-emprestimo.enum';

@Component({
  selector: 'app-gerenciar-emprestimos',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './gerenciar-emprestimos.component.html',
  styleUrls: ['./gerenciar-emprestimos.component.css']
})
export class GerenciarEmprestimosComponent implements OnInit {
  emprestimos: Emprestimo[] = [];
  emprestimosFiltrados: Emprestimo[] = [];
  searchTerm: string = '';
  filtroStatus: string = 'TODOS';
  isLoading: boolean = true;
  errorMessage: string = '';

  StatusEmprestimo = StatusEmprestimo;

  constructor(private emprestimoService: EmprestimoService) {}

  ngOnInit(): void {
    this.carregarEmprestimos();
  }

  carregarEmprestimos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.emprestimoService.findAll().subscribe({
      next: (data) => {
        this.emprestimos = data;
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar empréstimos:', error);
        this.errorMessage = 'Erro ao carregar empréstimos. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.emprestimos];

    // Filtro por status
    if (this.filtroStatus !== 'TODOS') {
      resultado = resultado.filter(emp => emp.status === this.filtroStatus);
    }

    // Filtro por busca
    if (this.searchTerm.trim()) {
      const termo = this.searchTerm.toLowerCase().trim();
      resultado = resultado.filter(emp => 
        emp.usuarioNome?.toLowerCase().includes(termo) ||
        emp.livroTitulo?.toLowerCase().includes(termo) ||
        emp.livroAutor?.toLowerCase().includes(termo)
      );
    }

    this.emprestimosFiltrados = resultado;
  }

  onSearchChange(): void {
    this.aplicarFiltros();
  }

  onStatusChange(): void {
    this.aplicarFiltros();
  }

  calcularDiasRestantes(dataPrevistaDevolucao: string): number {
    const dataPrevist = new Date(dataPrevistaDevolucao);
    const hoje = new Date();
    const diffTime = dataPrevist.getTime() - hoje.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getStatusClass(status: string): string {
    switch (status) {
      case StatusEmprestimo.ATIVO:
        return 'status-ativo';
      case StatusEmprestimo.ATRASADO:
        return 'status-atrasado';
      case StatusEmprestimo.DEVOLVIDO:
        return 'status-devolvido';
      default:
        return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case StatusEmprestimo.ATIVO:
        return 'Ativo';
      case StatusEmprestimo.ATRASADO:
        return 'Atrasado';
      case StatusEmprestimo.DEVOLVIDO:
        return 'Devolvido';
      default:
        return status;
    }
  }

  formatarData(data: string): string {
    if (!data) return '-';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  getTotalEmprestimos(): number {
    return this.emprestimos.length;
  }

  getEmprestimosAtivos(): number {
    return this.emprestimos.filter(e => e.status === StatusEmprestimo.ATIVO).length;
  }

  getEmprestimosAtrasados(): number {
    return this.emprestimos.filter(e => e.status === StatusEmprestimo.ATRASADO).length;
  }

  getEmprestimosDevolvidos(): number {
    return this.emprestimos.filter(e => e.status === StatusEmprestimo.DEVOLVIDO).length;
  }
}
