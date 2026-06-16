// ============================================================
// Arquivo: src/controllers/colunas.controller.js
// Responsável: Marcelo (backend)
// ============================================================
const db = require('../db');

// GET /api/colunas — lista as colunas com suas tarefas
async function listar(req, res, next) {
  try {
    const colunas = await db.query(
      'SELECT id, nome, posicao FROM colunas ORDER BY posicao'
    );
    const tarefas = await db.query(
      `SELECT id, titulo, descricao, prioridade, coluna_id, posicao,
              criada_em, atualizada_em
         FROM tarefas
        ORDER BY coluna_id, posicao, id`
    );

    const resposta = colunas.rows.map((coluna) => ({
      ...coluna,
      tarefas: tarefas.rows.filter((t) => t.coluna_id === coluna.id),
    }));

    res.json(resposta);
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar };
