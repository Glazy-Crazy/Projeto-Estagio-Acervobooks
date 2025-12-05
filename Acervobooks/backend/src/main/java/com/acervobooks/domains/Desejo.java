package com.acervobooks.domains;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "desejos", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"usuario_id", "livro_id"})
})
public class Desejo implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_desejo")
    @SequenceGenerator(name = "seq_desejo", sequenceName = "seq_desejo", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "livro_id", nullable = false)
    private Livro livro;

    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    public Desejo() {
    }

    public Desejo(Long id, Usuario usuario, Livro livro, LocalDateTime dataCriacao) {
        this.id = id;
        this.usuario = usuario;
        this.livro = livro;
        this.dataCriacao = dataCriacao;
    }

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Livro getLivro() {
        return livro;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Desejo desejo = (Desejo) o;
        return Objects.equals(id, desejo.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Desejo{" +
                "id=" + id +
                ", usuario=" + usuario +
                ", livro=" + livro +
                ", dataCriacao=" + dataCriacao +
                '}';
    }
}
