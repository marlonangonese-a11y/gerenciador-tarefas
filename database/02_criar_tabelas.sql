-- ============================================================
-- Sistema de Gerenciamento de Tarefas Web
-- Script: 02_criar_tabelas.sql
-- Descrição: Criação das tabelas do sistema
-- Responsável: Felipe (banco de dados)
-- Versão: 1.0.0
-- ============================================================

-- Executar conectado ao banco "gerenciador_tarefas":
--   psql -U postgres -d gerenciador_tarefas -f 02_criar_tabelas.sql

-- Colunas do quadro (ex.: A Fazer, Em Andamento, Concluído)
CREATE TABLE IF NOT EXISTS colunas (
    id        SERIAL PRIMARY KEY,
    nome      VARCHAR(50) NOT NULL,
    posicao   INTEGER     NOT NULL DEFAULT 0
);

-- Tarefas vinculadas a uma coluna
CREATE TABLE IF NOT EXISTS tarefas (
    id             SERIAL PRIMARY KEY,
    titulo         VARCHAR(120) NOT NULL,
    descricao      TEXT,
    prioridade     VARCHAR(10)  NOT NULL DEFAULT 'media'
                   CHECK (prioridade IN ('baixa', 'media', 'alta')),
    coluna_id      INTEGER NOT NULL REFERENCES colunas(id) ON DELETE CASCADE,
    posicao        INTEGER NOT NULL DEFAULT 0,
    criada_em      TIMESTAMP NOT NULL DEFAULT NOW(),
    atualizada_em  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tarefas_coluna ON tarefas (coluna_id, posicao);

-- Atualiza automaticamente o campo atualizada_em
CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizada_em = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tarefas_atualizadas ON tarefas;
CREATE TRIGGER trg_tarefas_atualizadas
    BEFORE UPDATE ON tarefas
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();
