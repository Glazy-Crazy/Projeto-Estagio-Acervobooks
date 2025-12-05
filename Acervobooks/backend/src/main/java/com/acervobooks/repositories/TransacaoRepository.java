package com.acervobooks.repositories;

import com.acervobooks.domains.Transacao;
import com.acervobooks.domains.enums.TipoTransacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    List<Transacao> findByUsuarioId(Long usuarioId);
    List<Transacao> findByUsuarioIdAndTipo(Long usuarioId, TipoTransacao tipo);

    @Query("select coalesce(sum(case when t.tipo = com.acervobooks.domains.enums.TipoTransacao.ENTRADA then t.valor else -t.valor end), 0) from Transacao t where t.usuario.id = :usuarioId")
    BigDecimal calcularSaldo(@Param("usuarioId") Long usuarioId);

    List<Transacao> findByUsuarioIdOrderByDataDesc(Long usuarioId, Pageable pageable);
}
