package com.acervobooks.resources;

import com.acervobooks.domains.Usuario;
import com.acervobooks.security.JWTUtils;
import com.acervobooks.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthResource {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Busca usuário por email
            Usuario usuario = usuarioService.findByEmail(request.getEmail());
            
            if (usuario == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Usuário ou senha inválidos"));
            }

            // Verifica senha
            if (!passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
                return ResponseEntity.status(401).body(Map.of("error", "Usuário ou senha inválidos"));
            }

            // Gera token JWT
            String token = jwtUtils.generateToken(usuario.getEmail(), usuario.getRole());

            // Retorna resposta com token e dados do usuário
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            
            Map<String, Object> usuarioData = new HashMap<>();
            usuarioData.put("id", usuario.getId());
            usuarioData.put("nome", usuario.getNome());
            usuarioData.put("email", usuario.getEmail());
            usuarioData.put("cpf", usuario.getCpf());
            usuarioData.put("role", usuario.getRole());
            usuarioData.put("fotoUrl", usuario.getFotoUrl());
            
            response.put("usuario", usuarioData);

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Erro ao realizar login: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // Verifica se email já existe
            try {
                usuarioService.findByEmail(request.getEmail());
                return ResponseEntity.status(400).body(Map.of("error", "Email já cadastrado"));
            } catch (Exception e) {
                // Email não existe, continua o cadastro
            }

            // Cria UsuarioDTO
            com.acervobooks.domains.dtos.UsuarioDTO usuarioDTO = new com.acervobooks.domains.dtos.UsuarioDTO();
            usuarioDTO.setNome(request.getNome());
            usuarioDTO.setEmail(request.getEmail());
            usuarioDTO.setCpf(request.getCpf());
            usuarioDTO.setSenha(request.getSenha()); // UsuarioService.create() já codifica
            
            Usuario savedUsuario = usuarioService.create(usuarioDTO);

            // Gera token JWT
            String token = jwtUtils.generateToken(savedUsuario.getEmail(), savedUsuario.getRole());

            // Retorna resposta
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            
            Map<String, Object> usuarioData = new HashMap<>();
            usuarioData.put("id", savedUsuario.getId());
            usuarioData.put("nome", savedUsuario.getNome());
            usuarioData.put("email", savedUsuario.getEmail());
            usuarioData.put("cpf", savedUsuario.getCpf());
            usuarioData.put("role", savedUsuario.getRole());
            
            response.put("usuario", usuarioData);

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Erro ao criar usuário: " + e.getMessage()));
        }
    }

    // Classes internas para request
    public static class LoginRequest {
        private String email;
        private String senha;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getSenha() { return senha; }
        public void setSenha(String senha) { this.senha = senha; }
    }

    public static class RegisterRequest {
        private String nome;
        private String email;
        private String cpf;
        private String senha;

        public String getNome() { return nome; }
        public void setNome(String nome) { this.nome = nome; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getCpf() { return cpf; }
        public void setCpf(String cpf) { this.cpf = cpf; }
        public String getSenha() { return senha; }
        public void setSenha(String senha) { this.senha = senha; }
    }
}
