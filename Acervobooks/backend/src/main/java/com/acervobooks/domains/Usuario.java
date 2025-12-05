package com.acervobooks.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.acervobooks.domains.dtos.UsuarioDTO;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_usuario")
    @SequenceGenerator(name = "seq_usuario", sequenceName = "seq_usuario", allocationSize = 1)
    private Long id;

    @Column(unique = true, nullable = false)
    private String cpf;

    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    private String senha;

    private String fotoUrl;

    @Column(nullable = false)
    private String role = "ROLE_USER"; // ROLE_USER ou ROLE_ADMIN

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCriacao = LocalDate.now();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Transacao> transacoes = new ArrayList<>();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Emprestimo> emprestimos = new ArrayList<>();

    public Usuario() {
    }

    public Usuario(Long id, String cpf, String nome, String email, String senha, LocalDate dataCriacao) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataCriacao = dataCriacao;
        this.fotoUrl = null;
    }

    public Usuario(UsuarioDTO usuarioDTO) {
        this.id = usuarioDTO.getId();
        this.cpf = usuarioDTO.getCpf();
        this.nome = usuarioDTO.getNome();
        this.email = usuarioDTO.getEmail();
        this.senha = usuarioDTO.getSenha();
        this.dataCriacao = usuarioDTO.getDataCriacao();
        this.fotoUrl = usuarioDTO.getFotoUrl();
    }

    // Getters e Setters --------------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Relacionamento com Transações --------------------------
    public List<Transacao> getTransacoes() {
        return transacoes;
    }

    public void addTransacao(Transacao t) {
        if (t != null) {
            transacoes.add(t);
            t.setUsuario(this);
        }
    }

    public void removeTransacao(Transacao t) {
        if (t != null) {
            transacoes.remove(t);
            t.setUsuario(null);
        }
    }

    // Relacionamento com Empréstimos --------------------------
    public List<Emprestimo> getEmprestimos() {
        return emprestimos;
    }

    public void addEmprestimo(Emprestimo e) {
        if (e != null) {
            emprestimos.add(e);
            e.setUsuario(this);
        }
    }

    public void removeEmprestimo(Emprestimo e) {
        if (e != null) {
            emprestimos.remove(e);
            e.setUsuario(null);
        }
    }
}
