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
    if (!dataPrevistaDevolucao) return 0;
    
    // Converter data do formato dd/MM/yyyy para Date
    const dataPrevist = this.parseDataBrasileira(dataPrevistaDevolucao);
    if (!dataPrevist) return 0;
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataPrevist.setHours(0, 0, 0, 0);
    
    const diffTime = dataPrevist.getTime() - hoje.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  parseDataBrasileira(data: string): Date | null {
    if (!data) return null;
    const partes = data.split('/');
    if (partes.length !== 3) return null;
    
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Mês em JS é 0-indexed
    const ano = parseInt(partes[2], 10);
    
    const dateObj = new Date(ano, mes, dia);
    return isNaN(dateObj.getTime()) ? null : dateObj;
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
    
    // Se já está no formato dd/MM/yyyy, retornar direto
    if (data.includes('/')) {
      return data;
    }
    
    // Caso contrário, parsear e formatar
    const date = new Date(data);
    return isNaN(date.getTime()) ? '-' : date.toLocaleDateString('pt-BR');
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

  podeRenovar(emprestimo: Emprestimo): boolean {
    if (emprestimo.status !== StatusEmprestimo.ATIVO) return false;
    const diasRestantes = this.calcularDiasRestantes(emprestimo.dataPrevistaDevolucao);
    if (diasRestantes < 0 || diasRestantes > 1) return false;
    
    // Verificar se não ultrapassará 30 dias
    const dataEmprestimo = this.parseDataBrasileira(emprestimo.dataEmprestimo);
    const dataPrevista = this.parseDataBrasileira(emprestimo.dataPrevistaDevolucao);
    if (!dataEmprestimo || !dataPrevista) return false;
    
    const diasTotais = Math.ceil((dataPrevista.getTime() - dataEmprestimo.getTime()) / (1000 * 60 * 60 * 24));
    
    return (diasTotais + 7) <= 30;
  }

  renovarEmprestimo(emprestimoId: number): void {
    if (!confirm('Deseja renovar este empréstimo por mais 7 dias?')) return;

    this.emprestimoService.renovarEmprestimo(emprestimoId).subscribe({
      next: () => {
        alert('Empréstimo renovado com sucesso!');
        this.carregarEmprestimos();
      },
      error: (err) => {
        console.error('Erro ao renovar empréstimo:', err);
        alert(err.error?.message || 'Erro ao renovar empréstimo. Verifique as regras de renovação.');
      }
    });
  }

  devolverLivro(emprestimoId: number): void {
    if (!confirm('Confirma a devolução deste livro?')) return;

    this.emprestimoService.devolverLivro(emprestimoId).subscribe({
      next: () => {
        alert('Livro devolvido com sucesso!');
        this.carregarEmprestimos();
      },
      error: (err) => {
        console.error('Erro ao devolver livro:', err);
        alert('Erro ao devolver livro. Tente novamente.');
      }
    });
  }
}
