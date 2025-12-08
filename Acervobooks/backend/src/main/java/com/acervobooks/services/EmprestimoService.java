package com.acervobooks.services;

import com.acervobooks.domains.Emprestimo;
import com.acervobooks.domains.Livro;
import com.acervobooks.domains.Usuario;
import com.acervobooks.domains.enums.StatusEmprestimo;
import com.acervobooks.repositories.EmprestimoRepository;
import com.acervobooks.services.exceptions.BusinessException;
import com.acervobooks.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroService livroService;

    @Autowired
    private UsuarioService usuarioService;

    public Emprestimo findById(Long id) {
        Optional<Emprestimo> obj = emprestimoRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Empréstimo não encontrado! Id: " + id));
    }

    public List<Emprestimo> findAll() {
        return emprestimoRepository.findAll();
    }

    public List<Emprestimo> findByUsuario(Long usuarioId) {
        return emprestimoRepository.findByUsuarioId(usuarioId);
    }

    public List<Emprestimo> findByStatus(StatusEmprestimo status) {
        return emprestimoRepository.findByStatus(status);
    }

    public List<Emprestimo> findEmprestimosAtivos(Long usuarioId) {
        return emprestimoRepository.findByUsuarioIdAndStatus(usuarioId, StatusEmprestimo.ATIVO);
    }

    public List<Emprestimo> findPendencias(Long usuarioId) {
        return emprestimoRepository.findEmprestimosAtrasadosByUsuario(usuarioId, LocalDate.now());
    }

    @Transactional
    public Emprestimo realizarEmprestimo(Long usuarioId, Long livroId, Integer diasEmprestimo) {
        Usuario usuario = usuarioService.findById(usuarioId);
        Livro livro = livroService.findById(livroId);

        // Validações
        if (livro.getQuantidadeDisponivel() <= 0) {
            throw new BusinessException("Livro não disponível para empréstimo no momento!");
        }

        // Verificar se usuário tem pendências
        List<Emprestimo> pendencias = findPendencias(usuarioId);
        if (!pendencias.isEmpty()) {
            throw new BusinessException("Usuário possui livros em atraso. Regularize a situação antes de realizar novo empréstimo!");
        }

        // Criar empréstimo com prazo padrão de 7 dias
        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setUsuario(usuario);
        emprestimo.setLivro(livro);
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataPrevistaDevolucao(LocalDate.now().plusDays(7));
        emprestimo.setStatus(StatusEmprestimo.ATIVO);

        // Atualizar quantidade disponível
        livro.setQuantidadeDisponivel(livro.getQuantidadeDisponivel() - 1);
        livroService.update(livro.getId(), new com.acervobooks.domains.dtos.LivroDTO(livro));

        return emprestimoRepository.save(emprestimo);
    }

    @Transactional
    public Emprestimo devolverLivro(Long emprestimoId) {
        Emprestimo emprestimo = findById(emprestimoId);

        if (emprestimo.getStatus() != StatusEmprestimo.ATIVO) {
            throw new BusinessException("Este empréstimo não está ativo!");
        }

        // Atualizar empréstimo
        emprestimo.setDataEfetivaDevolucao(LocalDate.now());
        emprestimo.setStatus(StatusEmprestimo.DEVOLVIDO);

        // Atualizar quantidade disponível
        Livro livro = emprestimo.getLivro();
        livro.setQuantidadeDisponivel(livro.getQuantidadeDisponivel() + 1);
        livroService.update(livro.getId(), new com.acervobooks.domains.dtos.LivroDTO(livro));

        return emprestimoRepository.save(emprestimo);
    }

    @Transactional
    public Emprestimo renovarEmprestimo(Long emprestimoId, Integer diasAdicionais) {
        Emprestimo emprestimo = findById(emprestimoId);

        if (emprestimo.getStatus() != StatusEmprestimo.ATIVO) {
            throw new BusinessException("Apenas empréstimos ativos podem ser renovados!");
        }

        // Verificar se está atrasado
        if (emprestimo.getDataPrevistaDevolucao().isBefore(LocalDate.now())) {
            throw new BusinessException("Não é possível renovar empréstimos em atraso!");
        }

        // Permitir renovação apenas no último dia (ou quando faltar 1 dia)
        long diasRestantes = java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), emprestimo.getDataPrevistaDevolucao());
        if (diasRestantes > 1) {
            throw new BusinessException("A renovação só pode ser feita no último dia do prazo de devolução!");
        }

        // Verificar se não ultrapassará 30 dias desde o empréstimo
        long diasTotaisAposRenovacao = java.time.temporal.ChronoUnit.DAYS.between(
            emprestimo.getDataEmprestimo(), 
            emprestimo.getDataPrevistaDevolucao().plusDays(7)
        );
        
        if (diasTotaisAposRenovacao > 30) {
            throw new BusinessException("Não é possível renovar! O prazo total de empréstimo não pode ultrapassar 30 dias.");
        }

        // Renovar por 7 dias adicionais
        emprestimo.setDataPrevistaDevolucao(
            emprestimo.getDataPrevistaDevolucao().plusDays(7)
        );

        return emprestimoRepository.save(emprestimo);
    }

    public void atualizarStatusAtrasados() {
        List<Emprestimo> atrasados = emprestimoRepository.findAllEmprestimosAtrasados(LocalDate.now());
        atrasados.forEach(emp -> {
            emp.setStatus(StatusEmprestimo.ATRASADO);
            emprestimoRepository.save(emp);
        });
    }

    public boolean podeRenovar(Long emprestimoId) {
        try {
            Emprestimo emprestimo = findById(emprestimoId);
            
            // Verificar se está ativo
            if (emprestimo.getStatus() != StatusEmprestimo.ATIVO) {
                return false;
            }
            
            // Verificar se está atrasado
            if (emprestimo.getDataPrevistaDevolucao().isBefore(LocalDate.now())) {
                return false;
            }
            
            // Verificar se está no último dia
            long diasRestantes = java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), emprestimo.getDataPrevistaDevolucao());
            if (diasRestantes > 1) {
                return false;
            }
            
            // Verificar se não ultrapassará 30 dias
            long diasTotaisAposRenovacao = java.time.temporal.ChronoUnit.DAYS.between(
                emprestimo.getDataEmprestimo(), 
                emprestimo.getDataPrevistaDevolucao().plusDays(7)
            );
            
            return diasTotaisAposRenovacao <= 30;
        } catch (Exception e) {
            return false;
        }
    }

    public long calcularDiasRestantes(Long emprestimoId) {
        Emprestimo emprestimo = findById(emprestimoId);
        return java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), emprestimo.getDataPrevistaDevolucao());
    }
}
