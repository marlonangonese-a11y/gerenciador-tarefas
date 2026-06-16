// ============================================================
// Arquivo: tests/validacao.test.js
// Testes unitários das regras de validação (sem banco).
// Executados no pipeline de CI: npm test
// ============================================================
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validarTarefa, PRIORIDADES } = require('../src/validacao');

test('tarefa válida não gera erros', () => {
  const erros = validarTarefa({
    titulo: 'Configurar repositório',
    descricao: 'Criar branches main e develop',
    prioridade: 'alta',
    coluna_id: 1,
  });
  assert.equal(erros.length, 0);
});

test('título vazio gera erro', () => {
  const erros = validarTarefa({ titulo: '   ' });
  assert.ok(erros.some((e) => e.includes('título')));
});

test('título acima de 120 caracteres gera erro', () => {
  const erros = validarTarefa({ titulo: 'a'.repeat(121) });
  assert.ok(erros.some((e) => e.includes('120')));
});

test('prioridade inválida gera erro', () => {
  const erros = validarTarefa({ titulo: 'Teste', prioridade: 'urgente' });
  assert.ok(erros.some((e) => e.includes('Prioridade')));
});

test('coluna_id não numérico gera erro', () => {
  const erros = validarTarefa({ titulo: 'Teste', coluna_id: 'abc' });
  assert.ok(erros.some((e) => e.includes('coluna_id')));
});

test('prioridades aceitas são baixa, media e alta', () => {
  assert.deepEqual(PRIORIDADES, ['baixa', 'media', 'alta']);
});
