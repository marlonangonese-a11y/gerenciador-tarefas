// ============================================================
// Sistema de Gerenciamento de Tarefas Web
// Arquivo: server.js — ponto de entrada da API
// Responsável: Marcelo (backend)
// ============================================================
require('dotenv').config();

const app = require('./src/app');

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});
