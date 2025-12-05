# Acervobooks - Backend

## Visão Geral
Este é o backend da aplicação Acervobooks, um sistema de gestão de biblioteca desenvolvido em Java com o framework Spring Boot. Ele fornece APIs REST para gerenciar empréstimos de livros, acervo, usuários e transações. O backend utiliza PostgreSQL como banco de dados e implementa autenticação e autorização com JWT.

---

## Estrutura do Projeto
Abaixo está uma visão geral dos principais pacotes e suas responsabilidades:

### 1. **Pacote `config`**
- Contém classes de configuração para inicialização, segurança e integração com Swagger.
- **Principais classes:**
  - `DataInitializer`: Inicializa dados no banco para desenvolvimento.
  - `OpenApiConfig`: Configurações para documentação da API com Swagger.
  - `SecurityConfig`: Configurações de segurança, como autenticação e autorização.

### 2. **Pacote `domains`**
- Define as entidades principais do sistema e suas estruturas auxiliares.
- **Principais classes:**
  - `Usuario`: Usuários do sistema (administradores e usuários comuns).
  - `Livro`: Livros do acervo da biblioteca.
  - `Emprestimo`: Empréstimos de livros realizados.
  - `Transacao`: Histórico de transações (empréstimos, devoluções, renovações).
  - `Desejo`: Lista de desejos de leitura dos usuários.
  - Subpacotes:
    - `dtos`: Objetos de transferência de dados.
    - `enums`: Enumerações (Status, TipoTransacao, StatusEmprestimo, etc).

### 3. **Pacote `repositories`**
- Contém interfaces para acesso ao banco de dados usando Spring Data JPA.
- **Principais classes:**
  - `UsuarioRepository`: Operações com usuários.
  - `LivroRepository`: Operações com livros.
  - `EmprestimoRepository`: Operações com empréstimos.
  - `TransacaoRepository`: Operações com transações.
  - `DesejoRepository`: Operações com lista de desejos.

### 4. **Pacote `resources`**
- Implementa controladores REST para expor endpoints da API.
- **Principais classes:**
  - `AuthResource`: Autenticação (login).
  - `UsuarioResource`: CRUD de usuários.
  - `LivroResource`: CRUD de livros.
  - `EmprestimoResource`: Gerenciamento de empréstimos.
  - `TransacaoResource`: Histórico de transações.
  - `DesejoResource`: Gerenciamento da lista de desejos.
  - `TestResource`: Endpoints de teste.

### 5. **Pacote `security`**
- Gerencia autenticação e autorização.
- **Principais classes:**
  - `JWTAuthenticationFilter`: Filtro de autenticação JWT.
  - `JWTUtils`: Utilitários para geração e validação de tokens.
  - `UserSS`: Detalhes do usuário autenticado.
### 2. **Configuração do Banco de Dados**
Certifique-se de que o PostgreSQL está instalado e configurado. Atualize as credenciais no arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/acervobooks
spring.datasource.username=postgres
spring.datasource.password=postdba
```

### 3. **Executar Scripts SQL**
Execute os scripts na pasta `database/` para inicializar o banco:
- `setup_database.sql`: Cria estrutura inicial
- `limpar_e_recriar.sql`: Limpa e recria o banco (desenvolvimento)

### 4. **Executar a Aplicação**
```bash
mvn spring-boot:run
``` `TransacaoService`: Lógica de negócio para transações.
  - `DesejoService`: Lógica de negócio para lista de desejos.
  - `DBService`: Inicialização do banco de dados.
  - `UserDetailsServiceImpl`: Implementação do Spring Security.

---

## Configuração do Ambiente

### 1. **Pré-requisitos**
- Java 17 ou superior.
- Maven 3.8 ou superior.
- PostgreSQL 14 ou superior.

### 2. **Configuração do Banco de Dados**
Certifique-se de que o PostgreSQL está instalado e configurado. Atualize as credenciais no arquivo `application-dev.properties`:

## Endpoints Principais
Abaixo estão os principais endpoints disponíveis:

### **Autenticação**
- `POST /auth/login`: Realiza login e retorna token JWT.

### **Usuários**
- `GET /usuarios`: Retorna todos os usuários cadastrados.
- `GET /usuarios/{id}`: Retorna os detalhes de um usuário específico pelo ID.
- `GET /usuarios/me`: Retorna os dados do usuário autenticado.
- `POST /usuarios`: Cria um novo usuário (registro).
- `PUT /usuarios/{id}`: Atualiza os dados de um usuário existente pelo ID.
- `DELETE /usuarios/{id}`: Remove um usuário pelo ID.

### **Livros**
- `GET /livros`: Retorna todos os livros do acervo.
- `GET /livros/{id}`: Retorna os detalhes de um livro específico pelo ID.
- `GET /livros/isbn/{isbn}`: Busca um livro pelo ISBN.
- `POST /livros`: Cadastra um novo livro (apenas ADMIN).
- `PUT /livros/{id}`: Atualiza os dados de um livro (apenas ADMIN).
- `DELETE /livros/{id}`: Remove um livro (apenas ADMIN).

### **Empréstimos**
- `GET /emprestimos`: Lista todos os empréstimos.
- `GET /emprestimos/{id}`: Retorna detalhes de um empréstimo específico.
## Segurança
- **Autenticação:** Implementada com JWT (JSON Web Token).
- **Autorização:** Baseada em roles definidas para cada usuário:
  - `ROLE_ADMIN`: Acesso completo (gerenciar livros, usuários, etc).
  - `ROLE_USER`: Acesso limitado (empréstimos, visualização de acervo).
- **Criptografia:** Senhas hasheadas com BCrypt.

---

## Tecnologias Utilizadas

- **Java 17**: Linguagem de programação
- **Spring Boot 3.5.4**: Framework principal
- **Spring Security**: Autenticação e autorização
- **Spring Data JPA**: Persistência de dados
- **Hibernate**: ORM (Object-Relational Mapping)
- **PostgreSQL 14.5**: Banco de dados relacional
- **Maven**: Gerenciamento de dependências
- **JWT**: Autenticação stateless
- **Swagger/OpenAPI**: Documentação da API

---

## Estrutura de Diretórios

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/acervobooks/
│   │   │   ├── Main/              # Classe principal
│   │   │   ├── config/            # Configurações
│   │   │   ├── domains/           # Entidades e DTOs
│   │   │   ├── repositories/      # Repositórios JPA
│   │   │   ├── resources/         # Controllers REST
│   │   │   ├── security/          # Segurança JWT
│   │   │   └── services/          # Lógica de negócio
│   │   └── resources/
│   │       └── application.properties
│   └── test/                      # Testes unitários
├── database/                      # Scripts SQL
│   ├── setup_database.sql
│   ├── limpar_e_recriar.sql
│   └── verificar_usuario.sql
└── pom.xml                        # Dependências Maven
```

---

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## Licença

Este projeto é parte de um Trabalho de Conclusão de Curso (TCC).

---

## Contato

- **Autor**: Diego
- **GitHub**: [@Glazy-Crazy](https://github.com/Glazy-Crazy)
- **Repositório**: [Acervobooks](https://github.com/Glazy-Crazy/Projeto-Estagio-Acervobooks)ações de um empréstimo.

### **Desejos**
- `GET /desejos/usuario/{usuarioId}`: Lista desejos de um usuário.
- `POST /desejos`: Adiciona livro à lista de desejos.
- `DELETE /desejos/{id}`: Remove livro da lista de desejos.
### **Contas**
- `GET /contas`: Retorna todas as contas cadastradas.
- `GET /contas/{id}`: Retorna os detalhes de uma conta específica pelo ID.
- `POST /contas`: Cria uma nova conta.
- `PUT /contas/{id}`: Atualiza os dados de uma conta existente pelo ID.
- `DELETE /contas/{id}`: Remove uma conta pelo ID.

### **Transações**
- `POST /transacoes`: Registra uma nova transação.
- `GET /transacoes`: Lista todas as transações realizadas.

---

## Segurança
- **Autenticação:** Implementada com JWT.
- **Autorização:** Baseada em roles definidas para cada usuário(Por enquanto optamos apenas pelo 'ROLE_USER').

---

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
