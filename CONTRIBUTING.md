# Guia de Contribuição

Este documento operacionaliza o controle de mudanças e o controle de versões
definidos no [Plano de Gerência de Configuração](docs/PGC.md).

## Fluxo de mudança (obrigatório)

Nenhuma alteração entra no repositório sem passar por este fluxo:

1. **Proposta** — abra uma issue usando o modelo *Solicitação de mudança* ou *Relato de defeito*.
2. **Análise e aprovação** — a equipe avalia o impacto nos itens de configuração. A issue recebe a label `aprovada` ou `rejeitada`.
3. **Implementação** — crie um branch a partir de `develop` seguindo o padrão de nomes abaixo e implemente a mudança.
4. **Validação** — abra um Pull Request para `develop`. O pipeline de CI deve passar e pelo menos **1 outro integrante** deve revisar e aprovar.
5. **Integração** — após aprovado, o PR é mesclado com *squash merge* e a issue é fechada automaticamente (`Closes #N` na descrição do PR).

## Estratégia de branches (Git Flow)

| Branch | Finalidade | Criada a partir de | Mesclada em |
|---|---|---|---|
| `main` | Versões estáveis (baselines) | — | — |
| `develop` | Integração do desenvolvimento | `main` | `main` (via release) |
| `feature/<nome>` | Novas funcionalidades | `develop` | `develop` |
| `fix/<nome>` | Correções de defeitos | `develop` | `develop` |
| `release/<versão>` | Preparação de versão | `develop` | `main` e `develop` |
| `hotfix/<nome>` | Correção urgente em produção | `main` | `main` e `develop` |

Exemplos: `feature/arrastar-tarefas`, `fix/validacao-titulo`, `release/0.2.0`.

## Padrão de commits (Conventional Commits)

Formato: `tipo: descrição curta no imperativo`

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de defeito |
| `docs` | Apenas documentação |
| `style` | Formatação, sem mudança de lógica |
| `refactor` | Refatoração sem mudança de comportamento |
| `test` | Adição ou ajuste de testes |
| `chore` | Tarefas de manutenção (deps, CI, configs) |

Exemplos:

```
feat: adicionar arrastar e soltar de tarefas entre colunas
fix: impedir criação de tarefa com título vazio
docs: atualizar manual técnico com variáveis de ambiente
```

## Versionamento (SemVer)

Versões seguem o padrão `MAJOR.MINOR.PATCH`:

- **MAJOR** — mudanças incompatíveis na API
- **MINOR** — novas funcionalidades compatíveis
- **PATCH** — correções de defeitos

Cada versão estável recebe uma **tag anotada** em `main`:

```bash
git tag -a v0.2.0 -m "Versão 0.2.0 — arrastar e soltar de tarefas"
git push origin v0.2.0
```

## Política de merge e conflitos

- Merges em `develop` e `main` ocorrem **somente via Pull Request** (branches protegidas).
- Estratégia: *squash merge* (histórico linear e legível).
- Conflitos são resolvidos **no branch da feature**, atualizando-o com `git pull origin develop` antes de finalizar o PR. Em caso de dúvida, a resolução é feita em dupla com o autor do código conflitante.
