// ============================================================
// Arquivo: js/app.js — lógica principal do quadro
// Responsável: Marlon (frontend)
// ============================================================

const quadroEl = document.getElementById('quadro');
const modalEl = document.getElementById('modal-tarefa');
const formEl = document.getElementById('form-tarefa');
const modalTituloEl = document.getElementById('modal-titulo');
const modalErroEl = document.getElementById('modal-erro');
const seletorColunaEl = document.getElementById('campo-coluna');

let colunas = [];
let tarefaEmEdicao = null; // null = criando nova tarefa

// ---------- Renderização ----------

function renderizarQuadro() {
  quadroEl.innerHTML = '';

  colunas.forEach((coluna) => {
    const colunaEl = document.createElement('section');
    colunaEl.className = 'coluna';
    colunaEl.dataset.colunaId = coluna.id;

    colunaEl.innerHTML = `
      <header class="coluna-cabecalho">
        <h2>${coluna.nome}</h2>
        <span class="coluna-contador">${coluna.tarefas.length}</span>
      </header>
    `;

    if (coluna.tarefas.length === 0) {
      const vazio = document.createElement('div');
      vazio.className = 'coluna-vazia';
      vazio.textContent = 'Arraste uma tarefa para cá';
      colunaEl.appendChild(vazio);
    } else {
      coluna.tarefas.forEach((tarefa) => {
        colunaEl.appendChild(criarCartao(tarefa));
      });
    }

    registrarZonaDeSoltura(colunaEl);
    quadroEl.appendChild(colunaEl);
  });
}

function criarCartao(tarefa) {
  const cartao = document.createElement('article');
  cartao.className = 'cartao';
  cartao.draggable = true;
  cartao.dataset.tarefaId = tarefa.id;
  cartao.dataset.prioridade = tarefa.prioridade;

  const id = `TSK-${String(tarefa.id).padStart(3, '0')}`;

  cartao.innerHTML = `
    <div class="cartao-topo">
      <span class="cartao-id">${id}</span>
      <div class="cartao-acoes">
        <button type="button" class="btn-editar" title="Editar tarefa" aria-label="Editar ${id}">✏️</button>
        <button type="button" class="btn-excluir" title="Excluir tarefa" aria-label="Excluir ${id}">🗑️</button>
      </div>
    </div>
    <h3></h3>
    <p></p>
  `;

  cartao.querySelector('h3').textContent = tarefa.titulo;
  cartao.querySelector('p').textContent = tarefa.descricao || '';

  cartao.addEventListener('dragstart', (evento) => {
    evento.dataTransfer.setData('text/plain', tarefa.id);
    cartao.classList.add('arrastando');
  });
  cartao.addEventListener('dragend', () => cartao.classList.remove('arrastando'));

  cartao.querySelector('.btn-editar').addEventListener('click', () => abrirModal(tarefa));
  cartao.querySelector('.btn-excluir').addEventListener('click', () => excluirTarefa(tarefa));

  return cartao;
}

// ---------- Arrastar e soltar ----------

function registrarZonaDeSoltura(colunaEl) {
  colunaEl.addEventListener('dragover', (evento) => {
    evento.preventDefault();
    colunaEl.classList.add('arrastando-sobre');
  });

  colunaEl.addEventListener('dragleave', () => {
    colunaEl.classList.remove('arrastando-sobre');
  });

  colunaEl.addEventListener('drop', async (evento) => {
    evento.preventDefault();
    colunaEl.classList.remove('arrastando-sobre');

    const tarefaId = evento.dataTransfer.getData('text/plain');
    const colunaId = Number(colunaEl.dataset.colunaId);

    try {
      await api.moverTarefa(tarefaId, colunaId);
      await carregarQuadro();
    } catch (erro) {
      alert(erro.message);
    }
  });
}

// ---------- Modal ----------

function abrirModal(tarefa = null) {
  tarefaEmEdicao = tarefa;
  modalErroEl.hidden = true;
  formEl.reset();

  // Preenche o seletor de colunas
  seletorColunaEl.innerHTML = colunas
    .map((c) => `<option value="${c.id}">${c.nome}</option>`)
    .join('');
  seletorColunaEl.disabled = Boolean(tarefa); // mover é via arrastar

  if (tarefa) {
    modalTituloEl.textContent = `Editar TSK-${String(tarefa.id).padStart(3, '0')}`;
    formEl.titulo.value = tarefa.titulo;
    formEl.descricao.value = tarefa.descricao || '';
    formEl.prioridade.value = tarefa.prioridade;
    seletorColunaEl.value = tarefa.coluna_id;
  } else {
    modalTituloEl.textContent = 'Nova tarefa';
  }

  modalEl.showModal();
}

async function salvarTarefa(evento) {
  evento.preventDefault();

  const dados = {
    titulo: formEl.titulo.value,
    descricao: formEl.descricao.value,
    prioridade: formEl.prioridade.value,
    coluna_id: Number(seletorColunaEl.value),
  };

  try {
    if (tarefaEmEdicao) {
      await api.atualizarTarefa(tarefaEmEdicao.id, dados);
    } else {
      await api.criarTarefa(dados);
    }
    modalEl.close();
    await carregarQuadro();
  } catch (erro) {
    modalErroEl.textContent = erro.message;
    modalErroEl.hidden = false;
  }
}

async function excluirTarefa(tarefa) {
  const id = `TSK-${String(tarefa.id).padStart(3, '0')}`;
  if (!confirm(`Excluir a tarefa ${id} — "${tarefa.titulo}"?`)) return;

  try {
    await api.excluirTarefa(tarefa.id);
    await carregarQuadro();
  } catch (erro) {
    alert(erro.message);
  }
}

// ---------- Inicialização ----------

async function carregarQuadro() {
  try {
    colunas = await api.listarColunas();
    renderizarQuadro();
  } catch (erro) {
    quadroEl.innerHTML = `<p class="carregando">
      Não foi possível carregar o quadro. Verifique se a API está em execução
      (${CONFIG.API_URL}) e recarregue a página.
    </p>`;
  }
}

document.getElementById('btn-nova-tarefa').addEventListener('click', () => abrirModal());
document.getElementById('btn-cancelar').addEventListener('click', () => modalEl.close());
formEl.addEventListener('submit', salvarTarefa);

carregarQuadro();
