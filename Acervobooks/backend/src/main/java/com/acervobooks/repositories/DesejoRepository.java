package com.acervobooks.repositories;

import com.acervobooks.domains.Desejo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DesejoRepository extends JpaRepository<Desejo, Long> {
    
    List<Desejo> findByUsuarioId(Long usuarioId);
    
    List<Desejo> findByLivroId(Long livroId);
    
    Optional<Desejo> findByUsuarioIdAndLivroId(Long usuarioId, Long livroId);
    
    boolean existsByUsuarioIdAndLivroId(Long usuarioId, Long livroId);
    
    void deleteByUsuarioIdAndLivroId(Long usuarioId, Long livroId);
    
    @Query("SELECT COUNT(d) FROM Desejo d WHERE d.usuario.id = :usuarioId")
    long countByUsuarioId(@Param("usuarioId") Long usuarioId);
}
