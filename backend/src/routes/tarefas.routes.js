// Rotas de tarefas — Responsável: Marcelo (backend)
const { Router } = require('express');
const controller = require('../controllers/tarefas.controller');

const rotas = Router();

rotas.post('/', controller.criar);
rotas.put('/:id', controller.atualizar);
rotas.patch('/:id/mover', controller.mover);
rotas.delete('/:id', controller.excluir);

module.exports = rotas;
