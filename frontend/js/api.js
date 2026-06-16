// ============================================================
// Arquivo: js/api.js — camada de acesso à API REST
// Responsável: Marlon (frontend)
// ============================================================
const api = {
  async listarColunas() {
    const resposta = await fetch(`${CONFIG.API_URL}/colunas`);
    if (!resposta.ok) throw new Error('Falha ao carregar o quadro.');
    return resposta.json();
  },

  async criarTarefa(dados) {
    const resposta = await fetch(`${CONFIG.API_URL}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    const corpo = await resposta.json();
    if (!resposta.ok) throw new Error((corpo.erros || [corpo.erro]).join(' '));
    return corpo;
  },

  async atualizarTarefa(id, dados) {
    const resposta = await fetch(`${CONFIG.API_URL}/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    const corpo = await resposta.json();
    if (!resposta.ok) throw new Error((corpo.erros || [corpo.erro]).join(' '));
    return corpo;
  },

  async moverTarefa(id, colunaId) {
    const resposta = await fetch(`${CONFIG.API_URL}/tarefas/${id}/mover`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coluna_id: colunaId }),
    });
    if (!resposta.ok) throw new Error('Falha ao mover a tarefa.');
    return resposta.json();
  },

  async excluirTarefa(id) {
    const resposta = await fetch(`${CONFIG.API_URL}/tarefas/${id}`, {
      method: 'DELETE',
    });
    if (!resposta.ok && resposta.status !== 204) {
      throw new Error('Falha ao excluir a tarefa.');
    }
  },
};
