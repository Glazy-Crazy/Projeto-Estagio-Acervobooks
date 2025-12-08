package com.acervobooks.domains.dtos;

import com.acervobooks.domains.Desejo;

import java.time.LocalDateTime;

public class DesejoDTO {
    private Long id;
    private Long usuarioId;
    private Long livroId;
    private String livroTitulo;
    private String livroAutor;
    private String livroGenero;
    private String livroEditora;
    private Integer livroAnoPublicacao;
    private String livroCapaUrl;
    private Integer livroQuantidadeDisponivel;
    private LocalDateTime dataCriacao;

    public DesejoDTO() {
    }

    public DesejoDTO(Desejo desejo) {
        this.id = desejo.getId();
        this.usuarioId = desejo.getUsuario().getId();
        this.livroId = desejo.getLivro().getId();
        this.livroTitulo = desejo.getLivro().getTitulo();
        this.livroAutor = desejo.getLivro().getAutor();
        this.livroGenero = desejo.getLivro().getGenero();
        this.livroEditora = desejo.getLivro().getEditora();
        this.livroAnoPublicacao = desejo.getLivro().getAnoPublicacao();
        this.livroCapaUrl = desejo.getLivro().getCapaUrl();
        this.livroQuantidadeDisponivel = desejo.getLivro().getQuantidadeDisponivel();
        this.dataCriacao = desejo.getDataCriacao();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getLivroId() {
        return livroId;
    }

    public void setLivroId(Long livroId) {
        this.livroId = livroId;
    }

    public String getLivroTitulo() {
        return livroTitulo;
    }

    public void setLivroTitulo(String livroTitulo) {
        this.livroTitulo = livroTitulo;
    }

    public String getLivroAutor() {
        return livroAutor;
    }

    public void setLivroAutor(String livroAutor) {
        this.livroAutor = livroAutor;
    }

    public String getLivroGenero() {
        return livroGenero;
    }

    public void setLivroGenero(String livroGenero) {
        this.livroGenero = livroGenero;
    }

    public String getLivroEditora() {
        return livroEditora;
    }

    public void setLivroEditora(String livroEditora) {
        this.livroEditora = livroEditora;
    }

    public Integer getLivroAnoPublicacao() {
        return livroAnoPublicacao;
    }

    public void setLivroAnoPublicacao(Integer livroAnoPublicacao) {
        this.livroAnoPublicacao = livroAnoPublicacao;
    }

    public String getLivroCapaUrl() {
        return livroCapaUrl;
    }

    public void setLivroCapaUrl(String livroCapaUrl) {
        this.livroCapaUrl = livroCapaUrl;
    }

    public Integer getLivroQuantidadeDisponivel() {
        return livroQuantidadeDisponivel;
    }

    public void setLivroQuantidadeDisponivel(Integer livroQuantidadeDisponivel) {
        this.livroQuantidadeDisponivel = livroQuantidadeDisponivel;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
