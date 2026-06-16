// ============================================================
// Arquivo: src/controllers/tarefas.controller.js
// Responsável: Marcelo (backend)
// ============================================================
const db = require('../db');
const { validarTarefa } = require('../validacao');

// POST /api/tarefas — cria uma tarefa
async function criar(req, res, next) {
  try {
    const erros = validarTarefa(req.body);
    if (erros.length > 0) return res.status(400).json({ erros });

    const { titulo, descricao, prioridade, coluna_id } = req.body;

    const posicao = await db.query(
      'SELECT COALESCE(MAX(posicao), 0) + 1 AS proxima FROM tarefas WHERE coluna_id = $1',
      [coluna_id]
    );

    const resultado = await db.query(
      `INSERT INTO tarefas (titulo, descricao, prioridade, coluna_id, posicao)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [titulo.trim(), descricao || null, prioridade || 'media', coluna_id, posicao.rows[0].proxima]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    next(erro);
  }
}

// PUT /api/tarefas/:id — atualiza título, descrição e prioridade
async function atualizar(req, res, next) {
  try {
    const erros = validarTarefa(req.body);
    if (erros.length > 0) return res.status(400).json({ erros });

    const { titulo, descricao, prioridade } = req.body;

    const resultado = await db.query(
      `UPDATE tarefas
          SET titulo = $1, descricao = $2, prioridade = $3
        WHERE id = $4
        RETURNING *`,
      [titulo.trim(), descricao || null, prioridade || 'media', req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    next(erro);
  }
}

// PATCH /api/tarefas/:id/mover — move a tarefa para outra coluna
async function mover(req, res, next) {
  try {
    const { coluna_id } = req.body;
    if (!Number.isInteger(Number(coluna_id))) {
      return res.status(400).json({ erro: 'coluna_id deve ser um número inteiro.' });
    }

    const posicao = await db.query(
      'SELECT COALESCE(MAX(posicao), 0) + 1 AS proxima FROM tarefas WHERE coluna_id = $1',
      [coluna_id]
    );

    const resultado = await db.query(
      `UPDATE tarefas
          SET coluna_id = $1, posicao = $2
        WHERE id = $3
        RETURNING *`,
      [coluna_id, posicao.rows[0].proxima, req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    next(erro);
  }
}

// DELETE /api/tarefas/:id — exclui uma tarefa
async function excluir(req, res, next) {
  try {
    const resultado = await db.query('DELETE FROM tarefas WHERE id = $1', [req.params.id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { criar, atualizar, mover, excluir };
