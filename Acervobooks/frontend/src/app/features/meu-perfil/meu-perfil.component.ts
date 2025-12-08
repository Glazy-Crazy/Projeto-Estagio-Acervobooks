import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService, UsuarioInfo } from '../../core/user-info.service';
import { EmprestimoService } from '../../core/services/emprestimo.service';
import { LivroService } from '../../core/services/livro.service';
import { AuthService } from '../../core/auth.service';
import { Emprestimo } from '../../core/models/emprestimo.model';
import { Livro } from '../../core/models/livro.model';
import { StatusEmprestimo } from '../../core/models/status-emprestimo.enum';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

interface UsuarioEdit {
  nome: string;
  email: string;
  fotoUrl: string;
}

interface UsuarioInfoExtended extends UsuarioInfo {
  fotoUrl?: string;
}

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {
  usuario = signal<UsuarioInfoExtended | null>(null);
  ultimosEmprestimos = signal<Emprestimo[]>([]);
  recomendacoes = signal<Livro[]>([]);
  todosLivros = signal<Livro[]>([]);
  editMode = signal<boolean>(false);
  usuarioId: number = 0;
  
  // Toast/Popup
  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastType = signal<'erro' | 'sucesso'>('erro');
  
  usuarioEdit: UsuarioEdit = {
    nome: '',
    email: '',
    fotoUrl: ''
  };

  constructor(
    private userInfoService: UserInfoService,
    private emprestimoService: EmprestimoService,
    private livroService: LivroService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verifica se o usuário está autenticado antes de carregar dados
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.carregarDados();
  }

  carregarDados(): void {
    // Carregar informações do usuário
    this.userInfoService.getMe().subscribe({
      next: (usuario: UsuarioInfo) => {
        this.usuario.set(usuario as UsuarioInfoExtended);
        this.usuarioId = usuario.id;
        
        // Após obter o usuário, carregar seus empréstimos
        this.carregarEmprestimos(usuario.id);
      },
      error: (err: any) => console.error('Erro ao carregar usuário:', err)
    });

    // Carregar todos os livros
    this.livroService.findAll().subscribe({
      next: (livros: Livro[]) => {
        this.todosLivros.set(livros);
        
        // Gerar recomendações aleatórias
        const livrosDisponiveis = livros.filter((l: Livro) => l.quantidadeDisponivel > 0);
        const recomendacoesAleatorias = this.embaralhar(livrosDisponiveis).slice(0, 6);
        this.recomendacoes.set(recomendacoesAleatorias);
      },
      error: (err: any) => console.error('Erro ao carregar livros:', err)
    });
  }

  carregarEmprestimos(usuarioId: number): void {
    this.emprestimoService.findByUsuario(usuarioId).subscribe({
      next: (emprestimos: Emprestimo[]) => {
        // Ordena por data de empréstimo (mais recentes primeiro) e pega os 4 últimos
        const sorted = emprestimos.sort((a: Emprestimo, b: Emprestimo) => {
          const dateA = new Date(a.dataEmprestimo).getTime();
          const dateB = new Date(b.dataEmprestimo).getTime();
          return dateB - dateA;
        });
        this.ultimosEmprestimos.set(sorted.slice(0, 4));
      },
      error: (err: any) => console.error('Erro ao carregar empréstimos:', err)
    });
  }

  toggleEditMode(): void {
    const currentEditMode = this.editMode();
    if (!currentEditMode && this.usuario()) {
      // Entrando no modo de edição
      const user = this.usuario()!;
      this.usuarioEdit = {
        nome: user.nome,
        email: user.email,
        fotoUrl: (user as any).fotoUrl || ''
      };
    }
    this.editMode.set(!currentEditMode);
  }

  salvarPerfil(): void {
    const usuarioAtual = this.usuario();
    if (!usuarioAtual) return;

    // Prepara os dados para enviar ao backend
    const dadosAtualizacao = {
      id: usuarioAtual.id,
      nome: this.usuarioEdit.nome,
      email: this.usuarioEdit.email,
      cpf: usuarioAtual.cpf,
      fotoUrl: this.usuarioEdit.fotoUrl
    };

    // Envia para o backend
    this.userInfoService.updateUsuario(usuarioAtual.id, dadosAtualizacao).subscribe({
      next: (usuarioAtualizado) => {
        // Atualiza o estado local com os dados retornados do backend
        this.usuario.set(usuarioAtualizado as UsuarioInfoExtended);
        this.editMode.set(false);
        this.mostrarPopup('Perfil atualizado com sucesso!', 'sucesso');
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil:', err);
        this.mostrarPopup('Erro ao atualizar perfil');
      }
    });
  }

  cancelarEdicao(): void {
    this.editMode.set(false);
    this.usuarioEdit = {
      nome: '',
      email: '',
      fotoUrl: ''
    };
  }

  formatarData(data: string | undefined): string {
    if (!data) return '';
    
    // Se já estiver no formato dd/MM/yyyy, retorna direto
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      return data;
    }
    
    // Caso contrário, tenta converter
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  traduzirStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDENTE': 'Pendente',
      'ATIVO': 'Ativo',
      'DEVOLVIDO': 'Devolvido',
      'ATRASADO': 'Atrasado'
    };
    return statusMap[status] || status;
  }

  alugarLivro(livroId: number): void {
    if (!this.usuarioId) {
      console.error('Usuário não identificado');
      return;
    }

    // Verificar quantos livros ativos o usuário tem
    this.emprestimoService.findEmprestimosAtivos(this.usuarioId).subscribe({
      next: (emprestimosAtivos: Emprestimo[]) => {
        if (emprestimosAtivos.length >= 3) {
          this.mostrarPopup('Você tem livros demais');
          return;
        }

        // Se tiver menos de 3, permite alugar
        this.emprestimoService.realizarEmprestimo(this.usuarioId, livroId).subscribe({
          next: () => {
            console.log('Livro alugado com sucesso!');
            this.mostrarPopup('Livro alugado com sucesso!', 'sucesso');
            this.carregarDados(); // Recarrega os dados
          },
          error: (err: any) => {
            console.error('Erro ao alugar livro:', err);
            this.mostrarPopup('Erro ao alugar livro');
          }
        });
      },
      error: (err: any) => {
        console.error('Erro ao verificar empréstimos ativos:', err);
        this.mostrarPopup('Erro ao verificar empréstimos');
      }
    });
  }

  devolverLivro(emprestimoId: number): void {
    if (!emprestimoId) {
      console.error('ID do empréstimo não identificado');
      return;
    }

    this.emprestimoService.devolverLivro(emprestimoId).subscribe({
      next: () => {
        console.log('Livro devolvido com sucesso!');
        this.mostrarPopup('Livro devolvido com sucesso!', 'sucesso');
        this.carregarDados(); // Recarrega os dados
      },
      error: (err: any) => {
        console.error('Erro ao devolver livro:', err);
        this.mostrarPopup('Erro ao devolver livro');
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

  // Estatísticas do acervo
  totalLivros(): number {
    return this.todosLivros().reduce((sum, livro) => sum + livro.quantidadeTotal, 0);
  }

  livrosDisponiveis(): number {
    return this.todosLivros().reduce((sum, livro) => sum + livro.quantidadeDisponivel, 0);
  }

  livrosAlugados(): number {
    return this.totalLivros() - this.livrosDisponiveis();
  }

  generosDisponiveis(): number {
    const generos = new Set(this.todosLivros().map(livro => livro.genero));
    return generos.size;
  }

  // Função auxiliar para embaralhar array
  private embaralhar<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
