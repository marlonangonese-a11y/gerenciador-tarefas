// Rotas de colunas — Responsável: Marcelo (backend)
const { Router } = require('express');
const controller = require('../controllers/colunas.controller');

const rotas = Router();

rotas.get('/', controller.listar);

module.exports = rotas;
