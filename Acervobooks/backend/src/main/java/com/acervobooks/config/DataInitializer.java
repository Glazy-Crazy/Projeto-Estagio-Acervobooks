package com.acervobooks.config;

import com.acervobooks.repositories.UsuarioRepository;
import com.acervobooks.services.DBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DBService dbService;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se já existe dados no banco
        long usuariosCount = usuarioRepository.count();
        
        if (usuariosCount == 0) {
            System.out.println("🔄 Inicializando banco de dados...");
            
            // DBService cria admin + usuários de teste + livros
            dbService.initDB();
            
            System.out.println("\n✅ Banco de dados inicializado com sucesso!");
        } else {
            System.out.println("ℹ️  Banco de dados já possui " + usuariosCount + " usuário(s).");
            System.out.println("ℹ️  Para reinicializar, limpe o banco de dados.");
        }
    }
}
