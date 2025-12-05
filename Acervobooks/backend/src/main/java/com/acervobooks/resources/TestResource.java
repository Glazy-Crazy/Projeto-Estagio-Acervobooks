package com.acervobooks.resources;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "*")
public class TestResource {

    @GetMapping("/hello")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Backend está funcionando!");
        response.put("status", "OK");
        return response;
    }

    @PostMapping("/register-test")
    public Map<String, String> registerTest(@RequestBody Map<String, String> data) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Dados recebidos com sucesso!");
        response.put("nome", data.get("nome"));
        response.put("email", data.get("email"));
        return response;
    }
}
