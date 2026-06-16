-- ============================================================
-- Sistema de Gerenciamento de Tarefas Web
-- Script: 01_criar_banco.sql
-- Descrição: Criação do banco de dados
-- Responsável: Felipe (banco de dados)
-- Versão: 1.0.0
-- ============================================================

-- Executar conectado ao banco "postgres":
--   psql -U postgres -f 01_criar_banco.sql

CREATE DATABASE gerenciador_tarefas
    WITH ENCODING = 'UTF8'
    TEMPLATE = template0;

COMMENT ON DATABASE gerenciador_tarefas
    IS 'Banco de dados do Sistema de Gerenciamento de Tarefas Web (disciplina GCS)';
