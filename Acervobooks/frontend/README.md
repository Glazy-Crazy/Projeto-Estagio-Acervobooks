# Acervobooks - Frontend

## Visão Geral
Este é o frontend da aplicação Acervobooks, um sistema de gestão de biblioteca desenvolvido em Angular. Ele fornece uma interface moderna e responsiva para gerenciar empréstimos de livros, acervo, usuários e transações. O frontend se comunica com o backend através de APIs REST e implementa autenticação com JWT.

---

## Estrutura do Projeto
Abaixo está uma visão geral dos principais diretórios e suas responsabilidades:

### 1. **Diretório `core`**
- Contém serviços principais, modelos e interceptadores da aplicação.
- **Principais arquivos:**
  - `auth.service.ts`: Gerenciamento de autenticação (login/logout).
  - `auth.interceptor.ts`: Intercepta requisições HTTP para adicionar token JWT.
  - `user.service.ts`: Gerenciamento de usuários.
  - `theme.service.ts`: Controle de tema (dark/light mode).
  - **models/**: Modelos de dados (Emprestimo, Livro, etc).
  - **services/**: Serviços específicos (emprestimo, livro, desejo, transacao).

### 2. **Diretório `features`**
- Contém os componentes principais da aplicação, organizados por funcionalidade.
- **Principais módulos:**
  - `home/`: Página inicial da aplicação.
  - `inicio/`: Dashboard após login.
  - `usuarios/`: Login e cadastro de usuários.
  - `acervo/`: Visualização do acervo de livros.
  - `meu-perfil/`: Perfil e dados do usuário logado.
  - `meus-desejos/`: Lista de livros desejados pelo usuário.
  - `pendencias/`: Empréstimos pendentes e atrasados.
  - `admin/`: Área administrativa (cadastro e edição de livros).
  - `sobre/`: Informações sobre o sistema.
  - `sugestao-leitura/`: Sugestões de leitura personalizadas.

### 3. **Diretório `shared`**
- Componentes reutilizáveis em toda a aplicação.
- **Principais componentes:**
  - `navbar/`: Barra de navegação superior.
  - `sidebar/`: Menu lateral de navegação.
  - `input/`: Componente de input customizado.
  - `toast/`: Notificações e mensagens ao usuário.

### 4. **Diretório `environments`**
- Configurações de ambiente (desenvolvimento e produção).
- **Arquivos:**
  - `environment.ts`: Configurações para desenvolvimento.

---

## Configuração do Ambiente

### Pré-requisitos
- **Node.js**: versão 18 ou superior
- **npm**: versão 9 ou superior
- **Angular CLI**: versão 20 ou superior

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Glazy-Crazy/Projeto-Estagio-Acervobooks.git
   cd Projeto-Estagio-Acervobooks/Acervobooks/frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o proxy** (já configurado em `proxy.conf.json`):
   - As requisições para `/auth`, `/usuarios` e `/api` são redirecionadas para `http://localhost:8080`

4. **Execute a aplicação:**
   ```bash
   npm start
   ```
   - A aplicação estará disponível em: `http://localhost:4200`

---

## Scripts Disponíveis

- **`npm start`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Gera o build de produção na pasta `dist/`.
- **`npm test`**: Executa os testes unitários.
- **`npm run lint`**: Verifica o código com o linter.

---

## Tecnologias Utilizadas

- **Angular 20+**: Framework principal
- **TypeScript 5.0**: Linguagem de programação
- **Tailwind CSS**: Framework CSS para estilização
- **RxJS**: Programação reativa
- **Angular Router**: Gerenciamento de rotas
- **HttpClient**: Comunicação com API REST

---

## Principais Funcionalidades

### Autenticação
- Login com JWT
- Logout
- Proteção de rotas com AuthGuard
- Interceptor para adicionar token automaticamente

### Gestão de Livros
- Visualização do acervo completo
- Busca e filtros
- Detalhes do livro
- (Admin) Cadastro e edição de livros

### Empréstimos
- Realizar empréstimo
- Visualizar empréstimos ativos
- Histórico de empréstimos
- Gerenciar pendências

### Perfil do Usuário
- Visualizar dados pessoais
- Editar informações
- Ver histórico de atividades

---

## Estrutura de Rotas

```typescript
/                      → Home (página inicial)
/login                 → Login
/register              → Cadastro de novo usuário
/inicio                → Dashboard (após login)
/acervo                → Visualizar acervo de livros
/meu-perfil            → Perfil do usuário
/meus-desejos          → Lista de desejos
/pendencias            → Empréstimos pendentes
/admin/cadastrar-livro → (Admin) Cadastrar livro
/admin/editar-livro    → (Admin) Editar livro
/sobre                 → Sobre o sistema
/sugestao-leitura      → Sugestões personalizadas
```

---

## Proxy de Desenvolvimento

O arquivo `proxy.conf.json` está configurado para redirecionar requisições:

```json
{
  "/auth": {
    "target": "http://localhost:8080",
    "secure": false
  },
  "/usuarios": {
    "target": "http://localhost:8080",
    "secure": false
  },
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```

Isso evita problemas de CORS durante o desenvolvimento.

---

## Build para Produção

Para gerar o build otimizado:

```bash
npm run build
```

Os arquivos serão gerados em `dist/` e podem ser servidos por qualquer servidor web (Nginx, Apache, etc).

---

## Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
2. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`
3. Push para a branch: `git push origin feature/minha-feature`
4. Abra um Pull Request

---

## Licença

Este projeto é parte de um Trabalho de Conclusão de Curso (TCC).

---

## Contato

- **Autor**: Diego
- **GitHub**: [@Glazy-Crazy](https://github.com/Glazy-Crazy)
- **Repositório**: [Acervobooks](https://github.com/Glazy-Crazy/Projeto-Estagio-Acervobooks)
