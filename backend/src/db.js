// ============================================================
// Arquivo: src/db.js — conexão com o PostgreSQL
// As credenciais vêm de variáveis de ambiente (.env),
// que NÃO são versionadas (ver .env.example e .gitignore).
// ============================================================
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'gerenciador_tarefas',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

module.exports = {
  query: (texto, parametros) => pool.query(texto, parametros),
};
