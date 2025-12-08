package com.acervobooks.resources;

import com.acervobooks.domains.Desejo;
import com.acervobooks.domains.dtos.DesejoDTO;
import com.acervobooks.services.DesejoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/desejos")
@Tag(name = "Desejos", description = "Endpoints para gerenciamento de lista de desejos")
public class DesejoResource {

    @Autowired
    private DesejoService desejoService;

    @GetMapping(value = "/{id}")
    @Operation(summary = "Buscar desejo por ID")
    public ResponseEntity<Desejo> findById(@PathVariable Long id) {
        Desejo obj = desejoService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping
    @Operation(summary = "Listar todos os desejos")
    public ResponseEntity<List<Desejo>> findAll() {
        List<Desejo> list = desejoService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/usuario/{usuarioId}")
    @Operation(summary = "Listar desejos de um usuário")
    public ResponseEntity<List<DesejoDTO>> findByUsuario(@PathVariable Long usuarioId) {
        List<Desejo> list = desejoService.findByUsuario(usuarioId);
        List<DesejoDTO> listDTO = list.stream()
                .map(DesejoDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    }

    @GetMapping(value = "/usuario/{usuarioId}/livro/{livroId}/exists")
    @Operation(summary = "Verificar se livro está na lista de desejos do usuário")
    public ResponseEntity<Boolean> verificarDesejo(
            @PathVariable Long usuarioId,
            @PathVariable Long livroId) {
        boolean exists = desejoService.verificarDesejo(usuarioId, livroId);
        return ResponseEntity.ok().body(exists);
    }

    @PostMapping(value = "/toggle")
    @Operation(summary = "Adicionar ou remover livro da lista de desejos (toggle)")
    public ResponseEntity<Object> toggleDesejo(@RequestBody Map<String, Long> payload) {
        Long usuarioId = payload.get("usuarioId");
        Long livroId = payload.get("livroId");
        Object response = desejoService.toggleDesejo(usuarioId, livroId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    @Operation(summary = "Adicionar livro à lista de desejos")
    public ResponseEntity<Desejo> adicionarDesejo(
            @RequestParam Long usuarioId,
            @RequestParam Long livroId) {
        Desejo obj = desejoService.adicionarDesejo(usuarioId, livroId);
        return ResponseEntity.ok().body(obj);
    }

    @DeleteMapping(value = "/usuario/{usuarioId}/livro/{livroId}")
    @Operation(summary = "Remover livro da lista de desejos")
    public ResponseEntity<Void> removerDesejo(
            @PathVariable Long usuarioId,
            @PathVariable Long livroId) {
        desejoService.removerDesejo(usuarioId, livroId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/usuario/{usuarioId}/count")
    @Operation(summary = "Contar quantidade de desejos de um usuário")
    public ResponseEntity<Long> countByUsuario(@PathVariable Long usuarioId) {
        long count = desejoService.countByUsuarioId(usuarioId);
        return ResponseEntity.ok().body(count);
    }
}
