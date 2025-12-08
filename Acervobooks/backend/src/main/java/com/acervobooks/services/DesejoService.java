package com.acervobooks.services;

import com.acervobooks.domains.Desejo;
import com.acervobooks.domains.Livro;
import com.acervobooks.domains.Usuario;
import com.acervobooks.repositories.DesejoRepository;
import com.acervobooks.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DesejoService {

    @Autowired
    private DesejoRepository desejoRepository;

    @Autowired
    private LivroService livroService;

    @Autowired
    private UsuarioService usuarioService;

    public Desejo findById(Long id) {
        Optional<Desejo> obj = desejoRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Desejo não encontrado! Id: " + id));
    }

    public List<Desejo> findAll() {
        return desejoRepository.findAll();
    }

    public List<Desejo> findByUsuario(Long usuarioId) {
        return desejoRepository.findByUsuarioId(usuarioId);
    }

    public boolean verificarDesejo(Long usuarioId, Long livroId) {
        return desejoRepository.existsByUsuarioIdAndLivroId(usuarioId, livroId);
    }

    @Transactional
    public Desejo adicionarDesejo(Long usuarioId, Long livroId) {
        Usuario usuario = usuarioService.findById(usuarioId);
        Livro livro = livroService.findById(livroId);

        // Verificar se já existe
        if (desejoRepository.existsByUsuarioIdAndLivroId(usuarioId, livroId)) {
            throw new RuntimeException("Este livro já está na sua lista de desejos!");
        }

        Desejo desejo = new Desejo();
        desejo.setUsuario(usuario);
        desejo.setLivro(livro);

        return desejoRepository.save(desejo);
    }

    @Transactional
    public void removerDesejo(Long usuarioId, Long livroId) {
        if (!desejoRepository.existsByUsuarioIdAndLivroId(usuarioId, livroId)) {
            throw new ObjectNotFoundException("Desejo não encontrado para este usuário e livro!");
        }
        desejoRepository.deleteByUsuarioIdAndLivroId(usuarioId, livroId);
    }

    @Transactional
    public Object toggleDesejo(Long usuarioId, Long livroId) {
        Optional<Desejo> desejoExistente = desejoRepository.findByUsuarioIdAndLivroId(usuarioId, livroId);

        if (desejoExistente.isPresent()) {
            // Se já existe, remove
            desejoRepository.delete(desejoExistente.get());
            return new ToggleResponse(false, "Livro removido da lista de desejos");
        } else {
            // Se não existe, adiciona
            adicionarDesejo(usuarioId, livroId);
            return new ToggleResponse(true, "Livro adicionado à lista de desejos");
        }
    }

    public long countByUsuarioId(Long usuarioId) {
        return desejoRepository.countByUsuarioId(usuarioId);
    }

    // Inner class para resposta do toggle
    public static class ToggleResponse {
        private boolean adicionado;
        private String mensagem;

        public ToggleResponse(boolean adicionado, String mensagem) {
            this.adicionado = adicionado;
            this.mensagem = mensagem;
        }

        public boolean isAdicionado() {
            return adicionado;
        }

        public void setAdicionado(boolean adicionado) {
            this.adicionado = adicionado;
        }

        public String getMensagem() {
            return mensagem;
        }

        public void setMensagem(String mensagem) {
            this.mensagem = mensagem;
        }
    }
}
