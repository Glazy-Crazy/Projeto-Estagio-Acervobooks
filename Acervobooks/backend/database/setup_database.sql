-- =============================================
-- Script de Criação das Tabelas - Acervobooks
-- =============================================

-- Criar sequences
CREATE SEQUENCE IF NOT EXISTS seq_usuario START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS seq_livro START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS seq_emprestimo START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS seq_transacao START WITH 1 INCREMENT BY 1;

-- Tabela: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT PRIMARY KEY DEFAULT nextval('seq_usuario'),
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto_url VARCHAR(500),
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
    data_criacao DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Tabela: livros
CREATE TABLE IF NOT EXISTS livros (
    id BIGINT PRIMARY KEY DEFAULT nextval('seq_livro'),
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    editora VARCHAR(255),
    isbn VARCHAR(20),
    ano_publicacao INTEGER,
    genero VARCHAR(100),
    sinopse TEXT,
    numero_paginas INTEGER,
    idioma VARCHAR(50),
    capa_url VARCHAR(500),
    quantidade_total INTEGER NOT NULL DEFAULT 1,
    quantidade_disponivel INTEGER NOT NULL DEFAULT 1,
    data_cadastro DATE DEFAULT CURRENT_DATE
);

-- Tabela: emprestimos
CREATE TABLE IF NOT EXISTS emprestimos (
    id BIGINT PRIMARY KEY DEFAULT nextval('seq_emprestimo'),
    usuario_id BIGINT NOT NULL,
    livro_id BIGINT NOT NULL,
    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao_prevista DATE NOT NULL,
    data_devolucao_real DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'ATIVO',
    observacoes TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
);

-- Tabela: transacoes
CREATE TABLE IF NOT EXISTS transacoes (
    id BIGINT PRIMARY KEY DEFAULT nextval('seq_transacao'),
    usuario_id BIGINT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descricao VARCHAR(255),
    valor DECIMAL(10, 2),
    data_transacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_cpf ON usuarios(cpf);
CREATE INDEX IF NOT EXISTS idx_livros_titulo ON livros(titulo);
CREATE INDEX IF NOT EXISTS idx_livros_autor ON livros(autor);
CREATE INDEX IF NOT EXISTS idx_emprestimos_usuario ON emprestimos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_emprestimos_livro ON emprestimos(livro_id);
CREATE INDEX IF NOT EXISTS idx_emprestimos_status ON emprestimos(status);

-- =============================================
-- Inserir Usuários Padrão
-- =============================================

-- Usuário Admin (senha: admin123)
INSERT INTO usuarios (id, cpf, nome, email, senha, role, data_criacao, foto_url) 
VALUES (
    nextval('seq_usuario'), 
    '00000000000', 
    'Administrador', 
    'admin@acervobooks.com', 
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
    'ROLE_ADMIN', 
    CURRENT_DATE,
    'https://pbs.twimg.com/media/E01NNznWEAMznxy.jpg'
)
ON CONFLICT (email) DO NOTHING;

-- =============================================
-- Inserir Livros de Exemplo
-- =============================================

INSERT INTO livros (id, titulo, autor, editora, isbn, ano_publicacao, genero, sinopse, numero_paginas, idioma, capa_url, quantidade_total, quantidade_disponivel, data_cadastro)
VALUES 
(nextval('seq_livro'), '1984', 'George Orwell', 'Companhia das Letras', '9788535914849', 1949, 'Ficção Distópica', 
 'Uma distopia sombria onde o Grande Irmão tudo vigia.', 416, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg', 3, 3, CURRENT_DATE),

(nextval('seq_livro'), 'O Senhor dos Anéis: A Sociedade do Anel', 'J.R.R. Tolkien', 'HarperCollins', '9788595084742', 1954, 'Fantasia', 
 'A jornada épica de Frodo Bolseiro para destruir o Um Anel.', 576, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654215925i/61215351.jpg', 2, 2, CURRENT_DATE),

(nextval('seq_livro'), 'Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Rocco', '9788532530787', 1997, 'Fantasia', 
 'O início da jornada mágica de Harry Potter.', 264, 'Português', 
 'https://m.media-amazon.com/images/I/81ibfYk4qmL._SY466_.jpg', 4, 4, CURRENT_DATE),

(nextval('seq_livro'), 'O Código Da Vinci', 'Dan Brown', 'Arqueiro', '9788580410723', 2003, 'Thriller', 
 'Um mistério envolvendo símbolos religiosos e sociedades secretas.', 432, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579126867i/968.jpg', 2, 2, CURRENT_DATE),

(nextval('seq_livro'), 'A Culpa é das Estrelas', 'John Green', 'Intrínseca', '9788580572261', 2012, 'Romance', 
 'A história de amor entre Hazel e Augustus.', 288, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1660273739i/11870085.jpg', 4, 4, CURRENT_DATE),

(nextval('seq_livro'), 'Percy Jackson e o Ladrão de Raios', 'Rick Riordan', 'Intrínseca', '9788598078355', 2005, 'Aventura', 
 'Percy descobre ser filho de Poseidon e embarca em uma aventura épica.', 400, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1400602609i/28187.jpg', 5, 5, CURRENT_DATE),

(nextval('seq_livro'), 'Dom Casmurro', 'Machado de Assis', 'Penguin Companhia', '9788563560087', 1899, 'Romance', 
 'A narrativa de Bentinho sobre sua relação com Capitu.', 256, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388179034i/54492.jpg', 5, 5, CURRENT_DATE),

(nextval('seq_livro'), 'O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '9788595084759', 1937, 'Fantasia', 
 'A aventura de Bilbo Bolseiro antes de O Senhor dos Anéis.', 336, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg', 3, 3, CURRENT_DATE),

(nextval('seq_livro'), 'Orgulho e Preconceito', 'Jane Austen', 'Martin Claret', '9788572327879', 1813, 'Romance', 
 'A história de Elizabeth Bennet e Mr. Darcy.', 424, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg', 3, 3, CURRENT_DATE),

(nextval('seq_livro'), 'A Menina que Roubava Livros', 'Markus Zusak', 'Intrínseca', '9788580573466', 2005, 'Drama Histórico', 
 'A história de Liesel Meminger durante a Segunda Guerra Mundial.', 480, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg', 3, 3, CURRENT_DATE),

(nextval('seq_livro'), 'O Alquimista', 'Paulo Coelho', 'Rocco', '9788532609502', 1988, 'Ficção', 
 'A jornada de Santiago em busca de seu tesouro pessoal.', 198, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1483412266i/865.jpg', 6, 6, CURRENT_DATE),

(nextval('seq_livro'), 'Clean Code', 'Robert C. Martin', 'Prentice Hall', '9780132350884', 2008, 'Tecnologia', 
 'Manual sobre como escrever código limpo e manutenível.', 464, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg', 2, 2, CURRENT_DATE),

(nextval('seq_livro'), 'A Revolução dos Bichos', 'George Orwell', 'Companhia das Letras', '9788535909555', 1945, 'Sátira Política', 
 'Uma fábula sobre poder, corrupção e totalitarismo.', 152, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1424037542i/7613.jpg', 3, 3, CURRENT_DATE),

(nextval('seq_livro'), 'Cem Anos de Solidão', 'Gabriel García Márquez', 'Record', '9788501012142', 1967, 'Realismo Mágico', 
 'A saga da família Buendía em Macondo.', 432, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg', 2, 2, CURRENT_DATE),

(nextval('seq_livro'), 'O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '9788522002795', 1943, 'Fábula', 
 'A jornada filosófica de um pequeno príncipe vindo de outro planeta.', 96, 'Português', 
 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1367545443i/157993.jpg', 8, 8, CURRENT_DATE)

ON CONFLICT DO NOTHING;

-- =============================================
-- Verificações
-- =============================================

-- Verificar usuários criados
SELECT id, nome, email, role FROM usuarios ORDER BY id;

-- Verificar livros criados
SELECT id, titulo, autor, quantidade_disponivel FROM livros ORDER BY id;

-- Contar registros
SELECT 
    (SELECT COUNT(*) FROM usuarios) as total_usuarios,
    (SELECT COUNT(*) FROM livros) as total_livros;
