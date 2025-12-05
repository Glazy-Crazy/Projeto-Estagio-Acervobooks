package com.acervobooks.domains.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.acervobooks.domains.Emprestimo;
import com.acervobooks.domains.enums.StatusEmprestimo;

import java.io.Serializable;
import java.time.LocalDate;

public class EmprestimoDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long usuarioId;
    private String usuarioNome;
    private Long livroId;
    private String livroTitulo;
    private String livroAutor;
    private String livroCapaUrl;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataEmprestimo;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataPrevistaDevolucao;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataEfetivaDevolucao;

    private StatusEmprestimo status;
    private String observacoes;

    public EmprestimoDTO() {
    }

    public EmprestimoDTO(Emprestimo emprestimo) {
        this.id = emprestimo.getId();
        this.usuarioId = emprestimo.getUsuario().getId();
        this.usuarioNome = emprestimo.getUsuario().getNome();
        this.livroId = emprestimo.getLivro().getId();
        this.livroTitulo = emprestimo.getLivro().getTitulo();
        this.livroAutor = emprestimo.getLivro().getAutor();
        this.livroCapaUrl = emprestimo.getLivro().getCapaUrl();
        this.dataEmprestimo = emprestimo.getDataEmprestimo();
        this.dataPrevistaDevolucao = emprestimo.getDataPrevistaDevolucao();
        this.dataEfetivaDevolucao = emprestimo.getDataEfetivaDevolucao();
        this.status = emprestimo.getStatus();
        this.observacoes = emprestimo.getObservacoes();
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

    public String getUsuarioNome() {
        return usuarioNome;
    }

    public void setUsuarioNome(String usuarioNome) {
        this.usuarioNome = usuarioNome;
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

    public String getLivroCapaUrl() {
        return livroCapaUrl;
    }

    public void setLivroCapaUrl(String livroCapaUrl) {
        this.livroCapaUrl = livroCapaUrl;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public LocalDate getDataPrevistaDevolucao() {
        return dataPrevistaDevolucao;
    }

    public void setDataPrevistaDevolucao(LocalDate dataPrevistaDevolucao) {
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
    }

    public LocalDate getDataEfetivaDevolucao() {
        return dataEfetivaDevolucao;
    }

    public void setDataEfetivaDevolucao(LocalDate dataEfetivaDevolucao) {
        this.dataEfetivaDevolucao = dataEfetivaDevolucao;
    }

    public StatusEmprestimo getStatus() {
        return status;
    }

    public void setStatus(StatusEmprestimo status) {
        this.status = status;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
