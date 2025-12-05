package com.acervobooks.resources;

import com.acervobooks.domains.Livro;
import com.acervobooks.domains.dtos.LivroDTO;
import com.acervobooks.services.LivroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/livros")
@Tag(name = "Livros", description = "Endpoints para gerenciamento de livros")
public class LivroResource {

    @Autowired
    private LivroService livroService;

    @GetMapping(value = "/{id}")
    @Operation(summary = "Buscar livro por ID")
    public ResponseEntity<LivroDTO> findById(@PathVariable Long id) {
        Livro obj = livroService.findById(id);
        return ResponseEntity.ok().body(new LivroDTO(obj));
    }

    @GetMapping
    @Operation(summary = "Listar todos os livros")
    public ResponseEntity<List<LivroDTO>> findAll() {
        List<Livro> list = livroService.findAll();
        List<LivroDTO> listDTO = list.stream()
                .map(LivroDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/disponiveis")
    @Operation(summary = "Listar livros disponíveis para empréstimo")
    public ResponseEntity<List<LivroDTO>> findDisponiveis() {
        List<Livro> list = livroService.findDisponiveis();
        List<LivroDTO> listDTO = list.stream()
                .map(LivroDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/buscar/titulo/{titulo}")
    @Operation(summary = "Buscar livros por título")
    public ResponseEntity<List<LivroDTO>> findByTitulo(@PathVariable String titulo) {
        List<Livro> list = livroService.findByTitulo(titulo);
        List<LivroDTO> listDTO = list.stream()
                .map(LivroDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/buscar/autor/{autor}")
    @Operation(summary = "Buscar livros por autor")
    public ResponseEntity<List<LivroDTO>> findByAutor(@PathVariable String autor) {
        List<Livro> list = livroService.findByAutor(autor);
        List<LivroDTO> listDTO = list.stream()
                .map(LivroDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/buscar/genero/{genero}")
    @Operation(summary = "Buscar livros por gênero")
    public ResponseEntity<List<LivroDTO>> findByGenero(@PathVariable String genero) {
        List<Livro> list = livroService.findByGenero(genero);
        List<LivroDTO> listDTO = list.stream()
                .map(LivroDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Criar novo livro (apenas ADMIN)")
    public ResponseEntity<LivroDTO> create(@RequestBody LivroDTO dto) {
        Livro obj = livroService.create(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(obj.getId())
                .toUri();
        return ResponseEntity.created(uri).body(new LivroDTO(obj));
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Atualizar livro existente (apenas ADMIN)")
    public ResponseEntity<LivroDTO> update(@PathVariable Long id, @RequestBody LivroDTO dto) {
        Livro obj = livroService.update(id, dto);
        return ResponseEntity.ok().body(new LivroDTO(obj));
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Deletar livro (apenas ADMIN)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        livroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
