package com.acervobooks.repositories;

import com.acervobooks.domains.Emprestimo;
import com.acervobooks.domains.enums.StatusEmprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    
    List<Emprestimo> findByUsuarioId(Long usuarioId);
    
    List<Emprestimo> findByLivroId(Long livroId);
    
    List<Emprestimo> findByStatus(StatusEmprestimo status);
    
    List<Emprestimo> findByUsuarioIdAndStatus(Long usuarioId, StatusEmprestimo status);
    
    @Query("SELECT e FROM Emprestimo e WHERE e.usuario.id = :usuarioId AND e.status = 'ATIVO' AND e.dataPrevistaDevolucao < :hoje")
    List<Emprestimo> findEmprestimosAtrasadosByUsuario(@Param("usuarioId") Long usuarioId, @Param("hoje") LocalDate hoje);
    
    @Query("SELECT e FROM Emprestimo e WHERE e.status = 'ATIVO' AND e.dataPrevistaDevolucao < :hoje")
    List<Emprestimo> findAllEmprestimosAtrasados(@Param("hoje") LocalDate hoje);
}
