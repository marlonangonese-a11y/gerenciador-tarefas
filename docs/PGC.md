# Plano de Gerência de Configuração (PGC)

**Projeto:** Sistema de Gerenciamento de Tarefas Web (TaskFlow)
**Disciplina:** Gerência de Configuração de Software
**Equipe:** Marcelo Ari Colla, Marlon Angonese e Felipe Bertela
**Versão do documento:** 1.0 — 10/06/2026

---

## 1. Introdução

Este documento define o Plano de Gerência de Configuração (PGC) do Sistema de
Gerenciamento de Tarefas Web. O objetivo é estabelecer como os artefatos do
projeto serão identificados, versionados, alterados, integrados e construídos,
garantindo rastreabilidade e consistência ao longo de todo o desenvolvimento.

O plano cobre: identificação dos itens de configuração (ICs), definição de
baselines, estratégia de versionamento, controle de mudanças, controle de
versões e o processo de integração e build.

## 2. Descrição do Sistema

**Nome:** TaskFlow — Sistema de Gerenciamento de Tarefas Web

**Objetivo:** permitir que pessoas e equipes organizem suas atividades em um
quadro visual no estilo Kanban (semelhante ao Trello), com tarefas que podem
ser criadas, editadas, movidas entre colunas e excluídas.

**Domínio de aplicação:** produtividade e organização de trabalho.

**Arquitetura geral:**

```
┌────────────┐  HTTP/JSON   ┌────────────┐    SQL     ┌──────────────┐
│  Frontend  │ ───────────► │  Backend   │ ─────────► │  PostgreSQL  │
│ HTML/CSS/JS│ ◄─────────── │ Node.js +  │ ◄───────── │              │
│  (quadro)  │              │  Express   │            │              │
└────────────┘              └────────────┘            └──────────────┘
```

**Tecnologias utilizadas:**

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5, CSS3, JavaScript puro |
| Backend | Node.js 20 + Express |
| Banco de dados | PostgreSQL 16 |
| Versionamento | Git + GitHub |
| Integração contínua | GitHub Actions |

**Estrutura do repositório:**

```
gerenciador-tarefas/
├── .github/            # CI e modelos de issue/PR
│   ├── workflows/ci.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── backend/            # API REST (Node.js + Express)
│   ├── server.js
│   ├── src/            # app, rotas, controllers, validação, db
│   ├── tests/          # testes automatizados
│   ├── package.json
│   └── .env.example
├── database/           # scripts SQL numerados
├── docs/               # PGC e manual técnico
├── frontend/           # interface web (HTML, CSS, JS)
├── CHANGELOG.md
├── CONTRIBUTING.md
└── README.md
```

## 3. Itens de Configuração (ICs)

| ID | Nome | Tipo | Descrição | Justificativa de controle |
|---|---|---|---|---|
| IC-01 | Código do backend | Código-fonte | `backend/server.js` e `backend/src/**` (API REST) | É o núcleo funcional do sistema; qualquer mudança afeta o comportamento da API e precisa ser rastreável. |
| IC-02 | Código do frontend | Código-fonte | `frontend/**` (HTML, CSS, JS do quadro) | Define a interface usada pelo usuário; mudanças precisam ser compatíveis com a versão da API. |
| IC-03 | Scripts de banco de dados | Script | `database/*.sql` (criação, tabelas, dados iniciais) | O esquema do banco precisa evoluir de forma controlada para não quebrar o backend. |
| IC-04 | Testes automatizados | Código de teste | `backend/tests/**` | Garantem que mudanças não quebrem regras existentes; são executados no CI. |
| IC-05 | Manifesto de dependências | Configuração | `backend/package.json` e `package-lock.json` | Fixa as versões das bibliotecas, garantindo builds reproduzíveis. |
| IC-06 | Modelo de variáveis de ambiente | Configuração | `backend/.env.example` | Documenta a configuração necessária sem expor credenciais (o `.env` real não é versionado). |
| IC-07 | Pipeline de CI | Configuração | `.github/workflows/ci.yml` | Define o processo automático de integração e build; mudar o pipeline muda como o sistema é validado. |
| IC-08 | Documentação | Documento | `README.md`, `docs/PGC.md`, `docs/MANUAL_TECNICO.md`, `CONTRIBUTING.md`, `CHANGELOG.md` | Registra decisões, processos e instruções; precisa acompanhar a evolução do código. |
| IC-09 | Modelos de mudança | Documento | `.github/ISSUE_TEMPLATE/**` e `PULL_REQUEST_TEMPLATE.md` | Padronizam o fluxo formal de solicitação e revisão de mudanças. |

## 4. Baselines

Uma baseline é um conjunto de ICs formalmente aprovado, que serve de ponto de
referência e só pode ser alterado pelo processo de controle de mudanças.

| Baseline | Quando é criada | Conteúdo | Marcação |
|---|---|---|---|
| **Baseline inicial (planejamento)** | Após aprovação do PGC e da estrutura do repositório | PGC v1.0, estrutura de pastas, pipeline de CI | Tag `v0.1.0` em `main` |
| **Baseline de desenvolvimento** | Ao final de cada conjunto de funcionalidades estável em `develop` | Código + scripts + testes passando no CI | Merge de `release/x.y.0` |
| **Baseline de homologação** | Quando uma release está pronta para validação da equipe | Versão candidata completa (código, banco, docs) | Tag `vX.Y.0-rc` no branch `release/` |
| **Baseline de entrega** | Após validação, na entrega final da disciplina | Sistema completo + PGC final + apresentação | Tag `v1.0.0` em `main` |

**Critérios para criação de uma baseline:**

1. Todos os testes do pipeline de CI passando.
2. Documentação (CHANGELOG e manual) atualizada.
3. Revisão e aprovação de pelo menos um integrante que não seja o autor.
4. Tag anotada criada em `main` registrando a versão.

## 5. Estratégia de Versionamento

- **Ferramenta:** Git, com repositório remoto hospedado no GitHub.
- **Modelo:** Git Flow.
- **Convenção de versões:** SemVer (`MAJOR.MINOR.PATCH`).

**Estratégia de branches:**

```
main ──────●────────────────●───────────► (baselines / tags)
            \              / \
develop ─────●──●──●──●──●───●──●───────► (integração)
              \    /  \  /
feature/x ─────●──●    \/
fix/y ─────────────────●●
```

| Branch | Papel |
|---|---|
| `main` | Somente versões estáveis (cada merge gera uma tag) |
| `develop` | Integração contínua do trabalho da equipe |
| `feature/<nome>` | Desenvolvimento de novas funcionalidades |
| `fix/<nome>` | Correção de defeitos |
| `release/<versão>` | Estabilização e preparação de uma versão |
| `hotfix/<nome>` | Correção urgente direto sobre `main` |

A escolha do Git Flow se justifica porque a equipe trabalha em paralelo
(backend, frontend e banco) e o modelo separa claramente o que está em
desenvolvimento do que está estável, facilitando a criação de baselines.

## 6. Controle de Mudanças

Toda mudança segue o fluxo formal abaixo, rastreável pelas issues do GitHub:

```
Proposta (issue) → Análise e aprovação → Implementação (branch)
       → Validação (PR + CI + revisão) → Integração (merge)
```

1. **Solicitação:** qualquer integrante abre uma issue usando o modelo
   *Solicitação de mudança* ou *Relato de defeito*, descrevendo a mudança,
   a justificativa e os ICs afetados.
2. **Análise e aprovação:** a equipe avalia o impacto e o esforço. A issue
   recebe a label `aprovada` (entra no quadro de trabalho) ou `rejeitada`
   (fechada com justificativa).
3. **Implementação:** cria-se um branch `feature/` ou `fix/` a partir de
   `develop`, referenciando a issue nos commits.
4. **Validação:** abre-se um Pull Request. O pipeline de CI executa os testes
   e validações automaticamente, e pelo menos um outro integrante revisa o
   código.
5. **Integração:** com CI verde e revisão aprovada, o PR é mesclado em
   `develop` e a issue é fechada automaticamente (`Closes #N`).

Esse processo garante que nenhuma mudança entre no sistema sem registro,
análise e validação — ou seja, total rastreabilidade entre **issue → branch →
commits → PR → versão**.

## 7. Controle de Versões

**Padrão de mensagens de commit:** Conventional Commits
(`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`), sempre no
imperativo e em português. Exemplo: `feat: adicionar arrastar e soltar de tarefas`.

**Uso de tags:** toda versão estável recebe uma tag anotada em `main`
(`v0.1.0`, `v0.2.0`, `v1.0.0`), permitindo recuperar qualquer baseline.

**Política de merge:**

- Branches `main` e `develop` são protegidas: só recebem código via Pull Request.
- Estratégia de *squash merge*, mantendo o histórico linear e legível.
- PRs exigem CI verde + 1 aprovação de revisão.

**Controle de conflitos:** antes de finalizar um PR, o autor atualiza seu
branch com `git pull origin develop` e resolve os conflitos localmente. Se o
conflito envolver código de outro integrante, a resolução é feita em conjunto,
para evitar perda de trabalho.

## 8. Integração e Build

**Ferramenta:** GitHub Actions (arquivo `.github/workflows/ci.yml`).

**Gatilhos de execução:** todo `push` e todo `pull request` para os branches
`develop` e `main`.

**Etapas do pipeline:**

| Job | O que faz |
|---|---|
| **Backend** | Instala o Node.js 20, executa `npm ci` (instalação reproduzível), roda os testes automatizados (`npm test`) e valida a sintaxe de todos os arquivos JS. |
| **Banco de dados** | Sobe um contêiner PostgreSQL 16 e executa os scripts `02_criar_tabelas.sql` e `03_dados_iniciais.sql`, garantindo que o esquema é válido. |
| **Frontend** | Valida a sintaxe dos arquivos JavaScript da interface. |

**Estratégia de integração contínua:** como o sistema não usa etapa de
compilação (JavaScript interpretado), o "build" consiste na instalação
reproduzível das dependências (`npm ci` com `package-lock.json`), na execução
dos testes e na validação dos scripts de banco. Um PR só pode ser integrado se
todos os jobs passarem, o que garante que o branch `develop` esteja sempre em
estado executável.

**Testes automatizados:** as regras de validação de tarefas possuem testes
unitários (`backend/tests/validacao.test.js`) executados em todo push e PR,
usando o executor de testes nativo do Node.js.

---

## Referências

- IEEE Std 828 — Standard for Configuration Management in Systems and Software Engineering
- Pressman, R. — Engenharia de Software: Uma Abordagem Profissional
- Documentação do Git Flow, SemVer, Conventional Commits e Keep a Changelog
