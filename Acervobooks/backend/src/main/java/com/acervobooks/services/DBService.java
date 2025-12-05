package com.acervobooks.services;

import com.acervobooks.domains.Livro;
import com.acervobooks.domains.Usuario;
import com.acervobooks.repositories.LivroRepository;
import com.acervobooks.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DBService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private PasswordEncoder encoder;

    public void initDB() {

        // Criar usuário administrador
        Usuario admin = new Usuario();
        admin.setNome("Administrador");
        admin.setEmail("admin@acervobooks.com");
        admin.setCpf("00000000000");
        admin.setSenha(encoder.encode("admin123"));
        admin.setRole("ROLE_ADMIN");
        admin.setFotoUrl("https://ui-avatars.com/api/?name=Admin&background=60a5fa&color=fff&size=128");
        admin.setDataCriacao(LocalDate.now());
        
        usuarioRepository.save(admin);
        System.out.println("✓ Usuário admin criado com sucesso!");
        System.out.println("  Email: admin@acervobooks.com");
        System.out.println("  Senha: admin123");
        System.out.println("  Role: ROLE_ADMIN");

        // Criar usuário de teste
        Usuario user = new Usuario(null, "98765432100", "João Silva",
                "joao@email.com", encoder.encode("123456"), LocalDate.now());
        user.setRole("ROLE_USER");
        
        usuarioRepository.save(user);
        System.out.println("✓ Usuário teste criado: joao@email.com / 123456");

        // Criar livros de exemplo
        System.out.println("📚 Criando livros de exemplo...");
        
        Livro livro1 = new Livro(null, "1984", "George Orwell", "9788535914849",
                "Companhia das Letras", 1949, "Ficção Distópica",
                "Uma distopia sombria onde o Grande Irmão tudo vigia.",
                3, 3, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg");

        Livro livro2 = new Livro(null, "O Senhor dos Anéis: A Sociedade do Anel", "J.R.R. Tolkien", "9788595084742",
                "HarperCollins", 1954, "Fantasia",
                "A jornada épica de Frodo Bolseiro para destruir o Um Anel.",
                2, 2, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654215925i/61215351.jpg");

        Livro livro3 = new Livro(null, "Harry Potter e a Pedra Filosofal", "J.K. Rowling", "9788532530787",
                "Rocco", 1997, "Fantasia",
                "O início da jornada mágica de Harry Potter.",
                4, 4, "https://m.media-amazon.com/images/I/81ibfYk4qmL._SY466_.jpg");

        Livro livro4 = new Livro(null, "Dom Casmurro", "Machado de Assis", "9788563560087",
                "Penguin Companhia", 1899, "Romance",
                "A narrativa de Bentinho sobre sua relação com Capitu.",
                5, 5, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388179034i/54492.jpg");

        Livro livro5 = new Livro(null, "O Hobbit", "J.R.R. Tolkien", "9788595084759",
                "HarperCollins", 1937, "Fantasia",
                "A aventura de Bilbo Bolseiro antes de O Senhor dos Anéis.",
                3, 3, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg");

        Livro livro6 = new Livro(null, "A Culpa é das Estrelas", "John Green", "9788580572261",
                "Intrínseca", 2012, "Romance",
                "A história de amor entre Hazel e Augustus.",
                4, 4, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1660273739i/11870085.jpg");

        Livro livro7 = new Livro(null, "Percy Jackson e o Ladrão de Raios", "Rick Riordan", "9788598078355",
                "Intrínseca", 2005, "Aventura",
                "Percy descobre ser filho de Poseidon e embarca em uma aventura épica.",
                5, 5, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1400602609i/28187.jpg");

        Livro livro8 = new Livro(null, "O Alquimista", "Paulo Coelho", "9788532609502",
                "Rocco", 1988, "Ficção",
                "A jornada de Santiago em busca de seu tesouro pessoal.",
                6, 6, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1483412266i/865.jpg");

        Livro livro9 = new Livro(null, "Clean Code", "Robert C. Martin", "9780132350884",
                "Prentice Hall", 2008, "Tecnologia",
                "Manual sobre como escrever código limpo e manutenível.",
                2, 2, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg");

        Livro livro10 = new Livro(null, "O Pequeno Príncipe", "Antoine de Saint-Exupéry", "9788522002795",
                "Agir", 1943, "Fábula",
                "A jornada filosófica de um pequeno príncipe vindo de outro planeta.",
                8, 8, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1367545443i/157993.jpg");

        livroRepository.save(livro1);
        livroRepository.save(livro2);
        livroRepository.save(livro3);
        livroRepository.save(livro4);
        livroRepository.save(livro5);
        livroRepository.save(livro6);
        livroRepository.save(livro7);
        livroRepository.save(livro8);
        livroRepository.save(livro9);
        livroRepository.save(livro10);
        
        System.out.println("✓ 10 livros de exemplo criados com sucesso!");
        System.out.println("  Total de livros no banco: " + livroRepository.count());
    }
}
