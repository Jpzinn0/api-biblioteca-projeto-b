# API de Biblioteca - Projeto B (Geração Tech 4.0)

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?style=flat-square&logo=vitest)
![CI Status](https://img.shields.io/badge/CI-Passing-brightgreen?style=flat-square&logo=githubactions)

API RESTful desenvolvida em **Node.js** com **Express**, **Prisma ORM** e **PostgreSQL**, estruturada sob os princípios da **Clean Architecture** (Separação de Camadas: Domínio, Aplicação, Infraestrutura e Apresentação) para garantir máxima testabilidade, manutenibilidade e baixo acoplamento.

---

## 🚀 Tecnologias e Ferramentas

- **Runtime:** Node.js (v20+)
- **Framework Web:** Express.js
- **Banco de Dados & ORM:** PostgreSQL & Prisma ORM
- **Testes Automatizados:** Vitest & Supertest
- **Containerização:** Docker & Docker Compose
- **Qualidade de Código:** ESLint

---

## 🐳 Como Executar o Projeto com Docker

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

1. **Clone o repositório e acesse o diretório do projeto:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd api-biblioteca-projeto-b
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto baseado no exemplo abaixo:
   ```env
   # Porta em que o servidor HTTP irá rodar
   PORT=3000

   # URL de conexão com o PostgreSQL
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/biblioteca?schema=public"

   # Parâmetro de negócio: Prazo padrão de empréstimo em dias
   PRAZO_EMPRESTIMO_DIAS=14
   ```

3. **Suba os containers da aplicação e do banco de dados em segundo plano:**
   ```bash
   docker compose up --build -d
   ```

4. O container aplicará as migrações do banco de dados automaticamente. A API estará acessível em `http://localhost:3000`.

---

## 🔌 Endpoints da API

Abaixo estão listadas as principais rotas disponíveis na aplicação:

| Método | Endpoint | Descrição | Status de Sucesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/livros` | Lista todos os livros cadastrados na biblioteca | `200 OK` |
| `POST` | `/emprestimos` | Registra um novo empréstimo de livro | `201 Created` |
| `GET` | `/emprestimos` | Lista o histórico de empréstimos realizados | `200 OK` |

### Exemplo de Payload para Registro de Empréstimo (`POST /emprestimos`)

```json
{
  "livroId": 2,
  "leitor": "Nome do Leitor"
}
```

---

## 🧪 Executando os Testes Automatizados

O ecossistema de testes do projeto cobre validações unitárias de regras de negócio e testes de integração end-to-end simulando requisições HTTP reais.

Para rodar a suíte completa de testes no ambiente isolado do Docker:

```bash
docker compose exec api npm test
```

---

## 📂 Estrutura e Documentação Adicional

- **Especificação OpenAPI:** `docs/openapi.yaml`
- **Relatório de Desempenho:** `docs/desempenho.md`
- **Uso de Inteligência Artificial:** `docs/ia.md`
- **Pipeline de Integração Contínua:** `.github/workflows/ci.yml`
