// ============================================================
// Arquivo: src/validacao.js — regras de validação de tarefas
// Funções puras, testadas em tests/validacao.test.js sem
// necessidade de banco de dados (importante para o CI).
// ============================================================
const PRIORIDADES = ['baixa', 'media', 'alta'];

/**
 * Valida os dados de uma tarefa.
 * @param {object} dados - { titulo, descricao, prioridade, coluna_id }
 * @returns {string[]} lista de erros (vazia se válido)
 */
function validarTarefa(dados = {}) {
  const erros = [];

  if (!dados.titulo || String(dados.titulo).trim().length === 0) {
    erros.push('O título é obrigatório.');
  } else if (String(dados.titulo).trim().length > 120) {
    erros.push('O título deve ter no máximo 120 caracteres.');
  }

  if (dados.prioridade && !PRIORIDADES.includes(dados.prioridade)) {
    erros.push(`Prioridade inválida. Use: ${PRIORIDADES.join(', ')}.`);
  }

  if (dados.coluna_id !== undefined && !Number.isInteger(Number(dados.coluna_id))) {
    erros.push('coluna_id deve ser um número inteiro.');
  }

  return erros;
}

module.exports = { validarTarefa, PRIORIDADES };
