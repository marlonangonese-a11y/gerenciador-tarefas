# Manual Técnico — TaskFlow

Instruções de instalação e execução do Sistema de Gerenciamento de Tarefas Web.

## Pré-requisitos

- Node.js 20 ou superior
- PostgreSQL 16 ou superior
- Git

## 1. Clonar o repositório

```bash
git clone https://github.com/<sua-organizacao>/gerenciador-tarefas.git
cd gerenciador-tarefas
```

## 2. Criar o banco de dados

Execute os scripts na ordem numérica:

```bash
psql -U postgres -f database/01_criar_banco.sql
psql -U postgres -d gerenciador_tarefas -f database/02_criar_tabelas.sql
psql -U postgres -d gerenciador_tarefas -f database/03_dados_iniciais.sql
```

## 3. Configurar o backend

```bash
cd backend
cp .env.example .env       # edite o .env com a senha do seu PostgreSQL
npm install
npm start                  # API disponível em http://localhost:3000
```

Para desenvolvimento com recarga automática: `npm run dev`.

Para executar os testes: `npm test`.

> **Importante (CI):** o primeiro `npm install` gera o arquivo
> `package-lock.json`. Esse arquivo **deve ser versionado** (é o IC-05 do
> PGC), pois o pipeline de CI usa `npm ci`, que depende dele para garantir
> uma instalação reproduzível.

## 4. Abrir o frontend

O frontend é estático. Duas opções:

**Opção A — abrir direto no navegador:** abra `frontend/index.html`.

**Opção B — servir com um servidor local (recomendado):**

```bash
cd frontend
npx serve .                # ou: python3 -m http.server 8080
```

Se a API estiver em outro endereço ou porta, ajuste `frontend/js/config.js`.

## 5. Verificação rápida

```bash
curl http://localhost:3000/api/health
# {"status":"ok","versao":"0.1.0"}

curl http://localhost:3000/api/colunas
# lista as colunas com as tarefas de exemplo
```

## Variáveis de ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `PORT` | Porta da API | `3000` |
| `DB_HOST` | Host do PostgreSQL | `localhost` |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_NAME` | Nome do banco | `gerenciador_tarefas` |
| `DB_USER` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | *(obrigatória)* |

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Verificação de saúde e versão |
| GET | `/api/colunas` | Lista colunas com suas tarefas |
| POST | `/api/tarefas` | Cria uma tarefa |
| PUT | `/api/tarefas/:id` | Atualiza título, descrição e prioridade |
| PATCH | `/api/tarefas/:id/mover` | Move a tarefa para outra coluna |
| DELETE | `/api/tarefas/:id` | Exclui uma tarefa |

## Solução de problemas

- **"Não foi possível carregar o quadro"** no frontend → verifique se a API
  está rodando (`npm start` no backend) e se a URL em `js/config.js` está correta.
- **Erro de conexão com o banco** → confira as credenciais no `.env` e se o
  PostgreSQL está ativo (`pg_isready`).
- **Porta 3000 ocupada** → altere a variável `PORT` no `.env`.
