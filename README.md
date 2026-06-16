# TaskFlow — Sistema de Gerenciamento de Tarefas Web

![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue) ![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.0-orange) ![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

Sistema web de gerenciamento de tarefas no estilo Kanban (semelhante ao
Trello), desenvolvido como projeto da disciplina **Gerência de Configuração de
Software**. O foco do projeto é a aplicação prática de um **Plano de Gerência
de Configuração (PGC)**: identificação de itens de configuração, baselines,
versionamento com Git Flow, controle formal de mudanças e integração contínua.

**Equipe:** Marcelo Ari Colla (backend) · Marlon Angonese (frontend) · Felipe Bertela (banco de dados e documentação)

## Funcionalidades

- Quadro Kanban com colunas **A Fazer**, **Em Andamento** e **Concluído**
- Criação, edição e exclusão de tarefas com título, descrição e prioridade
- Arrastar e soltar tarefas entre colunas
- Identificador rastreável por tarefa (ex.: `TSK-001`)

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5, CSS3, JavaScript puro |
| Backend | Node.js 20 + Express |
| Banco de dados | PostgreSQL 16 |
| CI | GitHub Actions |

## Como executar

Instruções completas no [Manual Técnico](docs/MANUAL_TECNICO.md). Resumo:

```bash
# 1. Banco de dados
psql -U postgres -f database/01_criar_banco.sql
psql -U postgres -d gerenciador_tarefas -f database/02_criar_tabelas.sql
psql -U postgres -d gerenciador_tarefas -f database/03_dados_iniciais.sql

# 2. Backend
cd backend && cp .env.example .env && npm install && npm start

# 3. Frontend — abrir frontend/index.html no navegador
```

## Gerência de configuração

Este repositório é, ele próprio, a demonstração do PGC:

- 📄 [Plano de Gerência de Configuração (PGC)](docs/PGC.md) — documento principal
- 🔀 [Guia de contribuição](CONTRIBUTING.md) — Git Flow, Conventional Commits, política de merge
- 📋 [Modelos de issue](.github/ISSUE_TEMPLATE/) e [de PR](.github/PULL_REQUEST_TEMPLATE.md) — fluxo formal de mudanças
- ⚙️ [Pipeline de CI](.github/workflows/ci.yml) — testes e validação a cada push/PR
- 📝 [Changelog](CHANGELOG.md) — histórico de versões (SemVer)

## Estrutura do repositório

```
gerenciador-tarefas/
├── .github/        # CI, modelos de issue e PR
├── backend/        # API REST (Node.js + Express)
├── database/       # Scripts SQL (PostgreSQL)
├── docs/           # PGC e manual técnico
├── frontend/       # Interface web (HTML, CSS, JS)
├── CHANGELOG.md
├── CONTRIBUTING.md
└── README.md
```

## Licença

MIT
