// scripts/modal.js

// ############# SELETORES DE ELEMENTOS #############
const modalContainer = document.getElementById('modal-container');
const modal = document.querySelector('.modal');
const botoesAdicionar = document.querySelectorAll('.adiciona button');
const botaoFechar = document.querySelector('.modal .fechar');
const opcoesContainer = document.querySelector('.modal .opcoes');
const botaoAdicionarCarrinho = document.querySelector('.modal .adicionar-carrinho');

// ############# ESTADO (DADOS) #############
let quantidadesSabores = {};

// ############# FUNÇÕES #############

function resetarQuantidades() {
    const saborItems = document.querySelectorAll('.sabor-item');
    saborItems.forEach(item => {
        const sabor = item.dataset.sabor;
        quantidadesSabores[sabor] = 0;
        item.querySelector('.qtd').innerText = 0;
        item.querySelector('.menos').classList.add('disabled');
    });
}

function abrirModal(event) {
    resetarQuantidades();
    const card = event.target.closest('.cards');
    if (!card) return;

    const imagemElement = card.querySelector('img');
    const nomeElement = card.querySelector('h2');
    const modalImagem = modal.querySelector('.item-info img');
    const modalNome = modal.querySelector('.item-info h3');

    if (imagemElement && modalImagem) {
        modalImagem.src = imagemElement.src;
    }
    if (nomeElement && modalNome) {
        modalNome.innerText = nomeElement.innerText;
    }

    modalContainer.classList.add('mostrar');
}

function fecharModal() {
    modalContainer.classList.remove('mostrar');
}

function handleCliqueQuantidade(event) {
    const botao = event.target;
    const saborItem = botao.closest('.sabor-item');
    if (!saborItem) return;

    const sabor = saborItem.dataset.sabor;
    let quantidadeAtual = quantidadesSabores[sabor];
    const botaoMenos = saborItem.querySelector('.menos');

    if (botao.classList.contains('mais')) {
        quantidadeAtual++;
    } else if (botao.classList.contains('menos')) {
        if (quantidadeAtual > 0) {
            quantidadeAtual--;
        }
    }

    quantidadesSabores[sabor] = quantidadeAtual;
    saborItem.querySelector('.qtd').innerText = quantidadeAtual;

    if (quantidadeAtual === 0) {
        botaoMenos.classList.add('disabled');
    } else {
        botaoMenos.classList.remove('disabled');
    }
}

function coletarItensDoModal() {
    const itensParaAdicionar = [];
    const nomeBase = modal.querySelector('.item-info h3').innerText;

    for (const sabor in quantidadesSabores) {
        const quantidade = quantidadesSabores[sabor];
        if (quantidade > 0) {
            itensParaAdicionar.push({
                nome: nomeBase,
                sabor: sabor,
                quantidade: quantidade
            });
        }
    }

    if (itensParaAdicionar.length > 0) {
        // Chama a função do arquivo carrinho.js
        adicionarAoCarrinho(itensParaAdicionar);
    } else {
        alert('Nenhum item selecionado.');
    }

    fecharModal();
}

// ############# EVENT LISTENERS #############
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', abrirModal);
});
botaoFechar.addEventListener('click', fecharModal);
opcoesContainer.addEventListener('click', handleCliqueQuantidade);
botaoAdicionarCarrinho.addEventListener('click', coletarItensDoModal);
modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        fecharModal();
    }
});