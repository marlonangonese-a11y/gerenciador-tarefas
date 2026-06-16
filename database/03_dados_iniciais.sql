-- ============================================================
-- Sistema de Gerenciamento de Tarefas Web
-- Script: 03_dados_iniciais.sql
-- Descrição: Dados iniciais (colunas padrão + tarefas de exemplo)
-- Responsável: Felipe (banco de dados)
-- Versão: 1.0.0
-- ============================================================

-- Executar conectado ao banco "gerenciador_tarefas":
--   psql -U postgres -d gerenciador_tarefas -f 03_dados_iniciais.sql

INSERT INTO colunas (nome, posicao) VALUES
    ('A Fazer',      1),
    ('Em Andamento', 2),
    ('Concluído',    3)
ON CONFLICT DO NOTHING;

INSERT INTO tarefas (titulo, descricao, prioridade, coluna_id, posicao) VALUES
    ('Definir itens de configuração', 'Listar e justificar os ICs do projeto no PGC.', 'alta',  1, 1),
    ('Configurar repositório GitHub', 'Criar branches main e develop conforme Git Flow.', 'alta',  1, 2),
    ('Modelar banco de dados',        'Criar scripts SQL das tabelas colunas e tarefas.', 'media', 2, 1),
    ('Escrever manual técnico',       'Documentar instalação e variáveis de ambiente.',   'baixa', 3, 1);
