# ADR 0001: Adoção de Clean Architecture e Isolamento do Prisma ORM via Docker

## Status
Aceito

## Contexto
Durante o desenvolvimento da **API Geração Tech 4.0 (Biblioteca)** — Projeto B, surgiram duas necessidades estruturais principais:
1. Garantir uma base de código manutenível, testável e com baixo acoplamento para o domínio de gerenciamento de empréstimos de livros.
2. Lidar com uma incompatibilidade técnica entre o ambiente de desenvolvimento host (**NixOS**) e o **Prisma CLI (v6)**, que falha ao localizar e vincular bibliotecas OpenSSL nativas no sistema operacional anfitrião.

## Decisão
Decidimos adotar os seguintes padrões arquiteturais e operacionais:

1. **Clean Architecture com Domínio Único:**
   - Estruturar o projeto em camadas bem definidas (`domain`, `infra`, `routes`), isolando as regras de negócio (como validação de existência, disponibilidade do livro e cálculo de prazo via `PRAZO_EMPRESTIMO_DIAS`) de detalhes de infraestrutura e frameworks externos (Express.js e Prisma).

2. **Execução Isolada de Comandos de Banco de Dados em Containers:**
   - Utilizar containers Docker baseados em Debian (`node:22-slim` / `linux-gnu`) para executar todas as operações da CLI do Prisma (`prisma generate`, `prisma migrate`, `prisma db seed`), evitando a execução direta no host NixOS.

## Consequências

### Positivas
* **Portabilidade e Reprodutibilidade:** Qualquer desenvolvedor consegue subir a aplicação e rodar migrações de forma idêntica, independentemente do sistema operacional anfitrião.
* **Clareza e Manutenibilidade:** A separação em camadas facilita a evolução das regras de negócio sem impactar a camada HTTP ou de persistência.
* **Resolução Definitiva de Dependências:** Elimina erros de *runtime* relacionados ao OpenSSL no NixOS.

### Negativas / Trade-offs
* **Dependência do Daemon Docker:** O fluxo de desenvolvimento local exige que o Docker e o Docker Compose estejam ativos para tarefas simples de geração de cliente ou atualização de schema.
* **Sobrecarga Operacional:** Comandos cotidianos do Prisma tornam-se ligeiramente mais verbosos por exigirem o prefixo `docker compose run` ou `docker compose exec`.