package com.acervobooks.resources;

import com.acervobooks.domains.Emprestimo;
import com.acervobooks.domains.dtos.EmprestimoDTO;
import com.acervobooks.domains.enums.StatusEmprestimo;
import com.acervobooks.services.EmprestimoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/emprestimos")
@Tag(name = "Empréstimos", description = "Endpoints para gerenciamento de empréstimos")
public class EmprestimoResource {

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping(value = "/{id}")
    @Operation(summary = "Buscar empréstimo por ID")
    public ResponseEntity<EmprestimoDTO> findById(@PathVariable Long id) {
        Emprestimo obj = emprestimoService.findById(id);
        return ResponseEntity.ok().body(new EmprestimoDTO(obj));
    }

    @GetMapping
    @Operation(summary = "Listar todos os empréstimos")
    public ResponseEntity<List<EmprestimoDTO>> findAll() {
        List<Emprestimo> list = emprestimoService.findAll();
        List<EmprestimoDTO> listDTO = list.stream()
                .map(EmprestimoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/usuario/{usuarioId}")
    @Operation(summary = "Listar empréstimos de um usuário")
    public ResponseEntity<List<EmprestimoDTO>> findByUsuario(@PathVariable Long usuarioId) {
        List<Emprestimo> list = emprestimoService.findByUsuario(usuarioId);
        List<EmprestimoDTO> listDTO = list.stream()
                .map(EmprestimoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/usuario/{usuarioId}/ativos")
    @Operation(summary = "Listar empréstimos ativos de um usuário")
    public ResponseEntity<List<EmprestimoDTO>> findEmprestimosAtivos(@PathVariable Long usuarioId) {
        List<Emprestimo> list = emprestimoService.findEmprestimosAtivos(usuarioId);
        List<EmprestimoDTO> listDTO = list.stream()
                .map(EmprestimoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/usuario/{usuarioId}/pendencias")
    @Operation(summary = "Listar pendências (atrasos) de um usuário")
    public ResponseEntity<List<EmprestimoDTO>> findPendencias(@PathVariable Long usuarioId) {
        List<Emprestimo> list = emprestimoService.findPendencias(usuarioId);
        List<EmprestimoDTO> listDTO = list.stream()
                .map(EmprestimoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/status/{status}")
    @Operation(summary = "Listar empréstimos por status")
    public ResponseEntity<List<EmprestimoDTO>> findByStatus(@PathVariable StatusEmprestimo status) {
        List<Emprestimo> list = emprestimoService.findByStatus(status);
        List<EmprestimoDTO> listDTO = list.stream()
                .map(EmprestimoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @PostMapping(value = "/realizar")
    @Operation(summary = "Realizar novo empréstimo")
    public ResponseEntity<EmprestimoDTO> realizarEmprestimo(
            @RequestParam Long usuarioId,
            @RequestParam Long livroId,
            @RequestParam(required = false, defaultValue = "14") Integer diasEmprestimo) {
        Emprestimo obj = emprestimoService.realizarEmprestimo(usuarioId, livroId, diasEmprestimo);
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/emprestimos/{id}")
                .buildAndExpand(obj.getId())
                .toUri();
        return ResponseEntity.created(uri).body(new EmprestimoDTO(obj));
    }

    @PutMapping(value = "/{id}/devolver")
    @Operation(summary = "Devolver livro emprestado")
    public ResponseEntity<EmprestimoDTO> devolverLivro(@PathVariable Long id) {
        Emprestimo obj = emprestimoService.devolverLivro(id);
        return ResponseEntity.ok().body(new EmprestimoDTO(obj));
    }

    @PutMapping(value = "/{id}/renovar")
    @Operation(summary = "Renovar empréstimo")
    public ResponseEntity<EmprestimoDTO> renovarEmprestimo(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "7") Integer diasAdicionais) {
        Emprestimo obj = emprestimoService.renovarEmprestimo(id, diasAdicionais);
        return ResponseEntity.ok().body(new EmprestimoDTO(obj));
    }
}
