// ============================================================
// Arquivo: src/app.js — configuração do Express
// Separado do server.js para facilitar testes automatizados.
// ============================================================
const express = require('express');
const cors = require('cors');

const rotasColunas = require('./routes/colunas.routes');
const rotasTarefas = require('./routes/tarefas.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint de verificação de saúde (usado pelo pipeline de CI)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', versao: require('../package.json').version });
});

app.use('/api/colunas', rotasColunas);
app.use('/api/tarefas', rotasTarefas);

// Tratamento centralizado de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

module.exports = app;
