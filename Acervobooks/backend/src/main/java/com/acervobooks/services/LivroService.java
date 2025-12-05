package com.acervobooks.services;

import com.acervobooks.domains.Livro;
import com.acervobooks.domains.dtos.LivroDTO;
import com.acervobooks.repositories.LivroRepository;
import com.acervobooks.services.exceptions.DataIntegrityViolationException;
import com.acervobooks.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro findById(Long id) {
        Optional<Livro> obj = livroRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Livro não encontrado! Id: " + id));
    }

    public List<Livro> findAll() {
        return livroRepository.findAll();
    }

    public Livro create(LivroDTO dto) {
        dto.setId(null);
        validaIsbn(dto);
        
        Livro livro = new Livro();
        livro.setTitulo(dto.getTitulo());
        livro.setAutor(dto.getAutor());
        livro.setIsbn(dto.getIsbn());
        livro.setEditora(dto.getEditora());
        livro.setAnoPublicacao(dto.getAnoPublicacao());
        livro.setGenero(dto.getGenero());
        livro.setSinopse(dto.getSinopse());
        livro.setQuantidadeDisponivel(dto.getQuantidadeTotal());
        livro.setQuantidadeTotal(dto.getQuantidadeTotal());
        livro.setCapaUrl(dto.getCapaUrl());
        
        return livroRepository.save(livro);
    }

    public Livro update(Long id, LivroDTO dto) {
        dto.setId(id);
        Livro oldObj = findById(id);
        
        if (!oldObj.getIsbn().equals(dto.getIsbn())) {
            validaIsbn(dto);
        }
        
        oldObj.setTitulo(dto.getTitulo());
        oldObj.setAutor(dto.getAutor());
        oldObj.setIsbn(dto.getIsbn());
        oldObj.setEditora(dto.getEditora());
        oldObj.setAnoPublicacao(dto.getAnoPublicacao());
        oldObj.setGenero(dto.getGenero());
        oldObj.setSinopse(dto.getSinopse());
        oldObj.setQuantidadeTotal(dto.getQuantidadeTotal());
        oldObj.setCapaUrl(dto.getCapaUrl());
        
        return livroRepository.save(oldObj);
    }

    public void delete(Long id) {
        Livro obj = findById(id);
        
        if (!obj.getEmprestimos().isEmpty()) {
            throw new DataIntegrityViolationException("Livro possui empréstimos vinculados e não pode ser deletado!");
        }
        
        livroRepository.deleteById(id);
    }

    public List<Livro> findByTitulo(String titulo) {
        return livroRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Livro> findByAutor(String autor) {
        return livroRepository.findByAutorContainingIgnoreCase(autor);
    }

    public List<Livro> findByGenero(String genero) {
        return livroRepository.findByGenero(genero);
    }

    public List<Livro> findDisponiveis() {
        return livroRepository.findByQuantidadeDisponivelGreaterThan(0);
    }

    private void validaIsbn(LivroDTO dto) {
        if (dto.getIsbn() != null && !dto.getIsbn().isEmpty()) {
            Optional<Livro> obj = livroRepository.findByIsbn(dto.getIsbn());
            if (obj.isPresent() && !obj.get().getId().equals(dto.getId())) {
                throw new DataIntegrityViolationException("Livro já cadastrado");
            }
        }
    }
}
