# 📚 Acervobooks - Sistema de Gestão de Biblioteca

<div align="center">

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-20+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.5-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Sistema completo para gestão de biblioteca com controle de empréstimos, acervo e usuários**

[Demonstração](#-demonstração) • [Funcionalidades](#-funcionalidades) • [Instalação](#-instalação) • [Documentação](#-documentação)

</div>

---

## 📋 Sobre o Projeto

O **Acervobooks** é um sistema web moderno desenvolvido para automatizar a gestão de bibliotecas. Com uma arquitetura robusta e interface intuitiva, o sistema oferece controle completo sobre empréstimos de livros, gerenciamento de acervo e cadastro de usuários.

### 🎯 Objetivos

- ✅ Substituir processos manuais de controle de empréstimos
- ✅ Centralizar informações sobre livros, autores e editoras
- ✅ Facilitar o acompanhamento de empréstimos ativos e pendências
- ✅ Gerar relatórios gerenciais automatizados
- ✅ Proporcionar interface responsiva e intuitiva

---

## ✨ Funcionalidades

### 🔐 Autenticação e Segurança
- [x] Sistema de login com JWT (JSON Web Token)
- [x] Proteção de rotas com AuthGuard
- [x] Criptografia de senhas com BCrypt
- [x] Controle de permissões (ADMIN/USER)
- [x] Interceptor HTTP para gerenciamento de tokens

### 👥 Gerenciamento de Usuários
- [x] Cadastro de novos usuários
- [x] Listagem e busca de usuários
- [x] Visualização e edição de perfil
- [x] Sistema de roles (Administrador/Usuário)

### 📖 Gestão de Livros
- [ ] CRUD completo de livros
- [ ] Cadastro de autores e editoras
- [ ] Busca avançada por título, autor, ISBN
- [ ] Controle de quantidade disponível
- [ ] Upload de capas de livros

### 🔄 Sistema de Empréstimos
- [ ] Realizar empréstimo de livros
- [ ] Devolver livros
- [ ] Renovar empréstimos
- [ ] Controle de prazos e atrasos
- [ ] Histórico de empréstimos

### 📊 Relatórios e Dashboard
- [ ] Dashboard com estatísticas
- [ ] Livros mais emprestados
- [ ] Usuários mais ativos
- [ ] Relatório de atrasos
- [ ] Gráficos e métricas

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17** - Linguagem de programação
- **Spring Boot 3.5.4** - Framework principal
- **Spring Security** - Autenticação e autorização
- **Spring Data JPA** - Persistência de dados
- **Hibernate** - ORM (Object-Relational Mapping)
- **PostgreSQL 14.5** - Banco de dados
- **Maven** - Gerenciamento de dependências
- **JWT** - Autenticação stateless

### Frontend
- **Angular 20+** - Framework web
- **TypeScript 5.0** - Linguagem de programação
- **RxJS** - Programação reativa
- **Tailwind CSS** - Framework CSS
- **Angular Router** - Gerenciamento de rotas
- **HttpClient** - Comunicação com API

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **IntelliJ IDEA** - IDE para Java
- **VS Code** - Editor de código
- **pgAdmin 4** - Administração PostgreSQL
- **Postman** - Testes de API

---

## 🏗️ Arquitetura do Sistema

### Arquitetura Backend (Camadas)

```
┌─────────────────────────────────────────┐
│      Controllers (Resources)            │  ← Recebe requisições HTTP
│  - AuthController                       │
│  - UsuarioResource                      │
│  - TransacaoResource                    │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│           Services                      │  ← Lógica de negócio
│  - UserService                          │
│  - DBService                            │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         Repositories                    │  ← Acesso a dados
│  - UsuarioRepository                    │
│  - LivroRepository                      │
│  - EmprestimoRepository                 │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│       PostgreSQL Database               │  ← Persistência
└─────────────────────────────────────────┘
```

### Estrutura de Diretórios

```
Acervobooks/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/acervobooks/
│   │   │   │   ├── Main.java
│   │   │   │   ├── config/
│   │   │   │   ├── domains/
│   │   │   │   ├── repositories/
│   │   │   │   ├── resources/
│   │   │   │   ├── security/
│   │   │   │   └── services/
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       └── application-prod.properties
│   │   └── test/
│   ├── database/
│   │   ├── setup_database.sql
│   │   ├── limpar_e_recriar.sql
│   │   └── fix_emprestimos_column.sql
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   ├── features/
│   │   │   └── shared/
│   │   ├── environments/
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── proxy.conf.json
│
└── docs/
    ├── APRESENTACAO_TCC.md
    ├── DIAGNOSTICO_ERROS.md
    ├── GUIA_CONFIGURACAO_DO_ZERO.md
    ├── INDICE_DOCUMENTACAO.md
    ├── QUICK_START.md
    ├── RESUMO_EXECUTIVO.md
    ├── SISTEMA_OPERACIONAL.md
    └── SUMARIO.md
```

---

## 🚀 Instalação

### Pré-requisitos

Certifique-se de ter instalado:

- **Java JDK 17** ou superior ([Download](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html))
- **Node.js 18** ou superior ([Download](https://nodejs.org/))
- **PostgreSQL 14.5** ou superior ([Download](https://www.postgresql.org/download/))
- **Maven 3.9** ou superior ([Download](https://maven.apache.org/download.cgi))
- **Git** ([Download](https://git-scm.com/downloads))

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/Glazy-Crazy/Projeto-Estagio-Acervobooks.git
cd Projeto-Estagio-Acervobooks/Acervobooks
```

### 2️⃣ Configurar o Banco de Dados

#### Criar o Database

1. Abra o **pgAdmin 4** ou **psql**
2. Conecte-se ao PostgreSQL
3. Execute:

```sql
CREATE DATABASE acervobooks;
```

#### Executar Scripts de Setup

```bash
# No pgAdmin, abra o Query Tool e execute:
# backend/database/setup_database.sql
```

Ou via linha de comando:

```bash
psql -U postgres -d acervobooks -f backend/database/setup_database.sql
```

### 3️⃣ Configurar o Backend

#### Atualizar Credenciais do Banco

Edite o arquivo `backend/src/main/resources/application-dev.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/acervobooks
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA_AQUI
```

#### Compilar e Executar

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

✅ O backend estará rodando em: `http://localhost:8080`

### 4️⃣ Configurar o Frontend

#### Instalar Dependências

```bash
cd frontend
npm install
```

#### Iniciar o Servidor de Desenvolvimento

```bash
npm start
```

✅ O frontend estará rodando em: `http://localhost:4200`

---

## 🎮 Como Usar

### Acessar a Aplicação

1. Abra o navegador
2. Acesse: `http://localhost:4200`

### Fazer Login

**Credenciais padrão:**
- **Usuário:** `admin`
- **Senha:** `123456`

### Navegação

- **Home** - Página inicial do sistema
- **Login** - Autenticação de usuários
- **Dashboard** - Painel principal (após login)
- **Meu Perfil** - Dados do usuário logado
- **Usuários** - Gerenciamento de usuários (apenas ADMIN)

---

## 🧪 Executar Testes

### Backend

```bash
cd backend
mvn test
```

### Frontend

```bash
cd frontend
npm test
```

---

## 📊 Modelo de Dados

### Diagrama Entidade-Relacionamento

```
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│   Usuario   │          │ Emprestimo  │          │    Livro    │
├─────────────┤          ├─────────────┤          ├─────────────┤
│ id (PK)     │─────────<│ usuario_id  │>─────────│ id (PK)     │
│ cpf         │    1:N   │ livro_id    │    N:1   │ isbn        │
│ nome        │          │ dataEmpr.   │          │ titulo      │
│ email       │          │ dataPrev.   │          │ autor       │
│ senha       │          │ dataDev.    │          │ editora     │
│ role        │          │ status      │          │ quantidade  │
│ dataCriacao │          │ renovacoes  │          │ disponivel  │
└─────────────┘          └─────────────┘          └─────────────┘
                                │
                                │ 1:N
                                ↓
                         ┌─────────────┐
                         │  Transacao  │
                         ├─────────────┤
                         │ id (PK)     │
                         │ empr_id(FK) │
                         │ tipo        │
                         │ dataTransac.│
                         │ responsavel │
                         └─────────────┘
```

---

## 🔐 Segurança

### Autenticação JWT

O sistema utiliza **JSON Web Tokens** para autenticação stateless:

1. Usuário faz login com credenciais
2. Backend valida e gera token JWT
3. Token é enviado em todas as requisições (Header Authorization)
4. Backend valida token antes de processar requisição

### Proteções Implementadas

- ✅ **BCrypt** - Hash de senhas com salt
- ✅ **Spring Security** - Controle de acesso
- ✅ **CORS** - Configuração restritiva
- ✅ **JPA** - Proteção contra SQL Injection
- ✅ **Validação** - Bean Validation e Reactive Forms

---

## 📚 Documentação

O projeto possui documentação completa na pasta `docs/`:

- **[RESUMO_EXECUTIVO.md](./RESUMO_EXECUTIVO.md)** - Visão geral do projeto
- **[QUICK_START.md](./QUICK_START.md)** - Guia rápido de inicialização
- **[SISTEMA_OPERACIONAL.md](./SISTEMA_OPERACIONAL.md)** - Como usar o sistema
- **[DIAGNOSTICO_ERROS.md](./DIAGNOSTICO_ERROS.md)** - Troubleshooting completo
- **[GUIA_CONFIGURACAO_DO_ZERO.md](./GUIA_CONFIGURACAO_DO_ZERO.md)** - Setup detalhado
- **[APRESENTACAO_TCC.md](./APRESENTACAO_TCC.md)** - Guia para apresentação
- **[INDICE_DOCUMENTACAO.md](./INDICE_DOCUMENTACAO.md)** - Índice completo

---

## 🐛 Troubleshooting

### Backend não inicia

```bash
# Limpar e recompilar
mvn clean
mvn install
mvn spring-boot:run
```

### Erro de conexão com banco de dados

1. Verifique se PostgreSQL está rodando:
```bash
# Windows
Get-Service postgresql*

# Linux/Mac
sudo service postgresql status
```

2. Verifique as credenciais em `application-dev.properties`

### Frontend não carrega

```bash
# Limpar node_modules e reinstalar
rm -rf node_modules
npm install
npm start
```

### CORS Error

Verifique se o `proxy.conf.json` está configurado corretamente.

Para mais detalhes, consulte [DIAGNOSTICO_ERROS.md](./DIAGNOSTICO_ERROS.md)

---

## 🗺️ Roadmap

### ✅ Fase 1 - Concluída
- [x] Arquitetura do projeto
- [x] Autenticação JWT
- [x] Cadastro de usuários
- [x] Interface básica

### 🚧 Fase 2 - Em Desenvolvimento
- [ ] CRUD de livros
- [ ] Sistema de empréstimos
- [ ] Devolução e renovação
- [ ] Histórico de transações

### 📋 Fase 3 - Planejada
- [ ] Dashboard com gráficos
- [ ] Relatórios gerenciais
- [ ] Notificações por email
- [ ] Busca avançada

### 🔮 Fase 4 - Futuro
- [ ] App mobile
- [ ] Sistema de recomendações (IA)
- [ ] Integração com APIs externas
- [ ] Deploy em cloud

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- **Java**: Seguir convenções do Spring Boot
- **TypeScript**: Seguir Angular Style Guide
- **Commits**: Usar Conventional Commits

---

## 📝 Licença

Este projeto foi desenvolvido como Projeto de estágio e está sob a licença MIT.

---

## 👨‍💻 Autores

**Diego, Fred, Ronan e Ana**

- GitHub: [@Glazy-Crazy](https://github.com/Glazy-Crazy)
- Projeto: [Acervobooks](https://github.com/Glazy-Crazy/Projeto-Estagio-Acervobooks)

---

## 🙏 Agradecimentos

- Orientadores e professores
- Colegas de curso
- Comunidade Spring Boot
- Comunidade Angular
- Stack Overflow

---

## 📞 Suporte

Encontrou um bug ou tem alguma sugestão?

- 🐛 [Reportar Bug](https://github.com/Glazy-Crazy/Projeto-Estagio-Acervobooks/issues)
- 💡 [Sugerir Feature](https://github.com/Glazy-Crazy/Projeto-Estagio-Acervobooks/issues)

---

<div align="center">

**Desenvolvido com ❤️ por Diego, Fred, Ronan e Ana**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
