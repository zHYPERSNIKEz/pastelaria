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

// Objeto para mapear produtos às suas opções
const produtos = {
    'pastel-simples': {
        titulo: 'Pastel Simples',
        opcoes: ['Carne', 'Queijo', 'Frango']
    },
    'pastel-especial-9': {
        titulo: 'Pastel Especial',
        opcoes: ['Queijo e Bacon', 'Calabresa e Queijo',
            'Pizza', 'Frango com Cheddar e azeitona',
            'Frango com Queijo e azeitona']
    },
    'pastel-especial-12': {
        titulo: 'Pastel Especial',
        opcoes: ['Carne de Sol c/ Queijo coalho', 'Carne de Sol c/ Catupiry e Queijo']
    },
    'pastel-2-sabores': {
        titulo: 'Pastel 2 Sabores',
        opcoes: ['Frango com Bacon','Frango com Catupiry',
                'Frango com Calabresa','Frango com Queijo', 
                'Carne com Queijo',
                'Carne com Catupiry',
                'Carne com Bacon']
    },
    'pastel-x-tudo': {
        titulo: 'Pastel X-Tudo',
        opcoes: ['Carne', 'Queijo', 'Frango', 'Queijo e Bacon', 'Calabresa e Queijo', 'Pizza', 'Frango com Cheddar e azeitona', 'Frango com Queijo e azeitona', 'Carne de Sol c/ Queijo coalho', 'Carne de Sol c/ Catupiry e Queijo', 'Frango com Bacon', 'Frango com Catupiry', 'Frango com Calabresa', 'Frango com Queijo', 'Carne com Queijo', 'Carne com Catupiry', 'Carne com Bacon']
    },
    'cachorrao': {
        titulo: 'Cachorrão',
        opcoes: [] // Sem sub-opções, apenas a principal
    },
    'marmita-p': {
        titulo: 'Marmita P',
        opcoes: []
    },
    'marmita-m': {
        titulo: 'Marmita M',
        opcoes: []
    },
    'marmita-g': {
        titulo: 'Marmita G',
        opcoes: []
    },
    'cuscuz-pote':{
        titulo: 'cuscuz no pote',
        opcoes: ['Carne moída ao molho', 'Linguiça Suína', 'Linguiça Calabresa', 'Frango Desfiado', 'Quijo e Vinagrete']
    },
    'cuscuz-recheado':{
        titulo: 'Cuscuz Recheado',
        opcoes: ['frango', 'Carne Moída', 'Calabresa', 'Salsicha', 'Salada']
    },
    'sopa-frango': {
        titulo: 'Sopa de Frango',
        opcoes: []
    },
    'mungunza': {
        titulo: 'Mungunzá',
        opcoes: []
    },
    'refri-2l': {
        titulo: 'Refrigerante 2L',
        opcoes: ['Coca-Cola', 'Cajuina','Guaraná Antarctica', 'Fanta Laranja', 'Fanta Uva']
    },
    'refri-1l': {
        titulo: 'Refrigerante 1L',
        opcoes: ['Coca-Cola', 'Cajuina', 'Guaraná Antarctica']
    },
    'refri-lata': {
        titulo: 'Refrigerante em Lata',
        opcoes: ['Coca-Cola','Cajuina', 'Guaraná Antarctica', 'Fanta Laranja', 'Sprite']
    }


};


// ############# FUNÇÕES #############

function resetarQuantidades() {
    quantidadesSabores = {}; // Limpa o objeto de quantidades
    const saborItems = document.querySelectorAll('.sabor-item');
    saborItems.forEach(item => {
        item.querySelector('.qtd').innerText = 0;
        if (item.querySelector('.menos')) {
            item.querySelector('.menos').classList.add('disabled');
        }
    });
}

function gerarOpcoesHTML(produtoId) {
    const produto = produtos[produtoId];
    let htmlOpcoes = '';

    if (produtoId === 'pastel-x-tudo') {
        htmlOpcoes += `
            <h4>Escolha até 3 sabores:</h4>
            <div class="opcoes-xtudo">
                ${produto.opcoes.map(sabor => `<label><input type="checkbox" name="sabor-xtudo" value="${sabor}"> ${sabor}</label>`).join('')}
            </div>
            <div class="sabor-item" data-sabor="${produto.titulo}">
                <span>${produto.titulo}</span>
                <div class="quantidade">
                    <button class="menos disabled">-</button>
                    <span class="qtd">0</span>
                    <button class="mais">+</button>
                </div>
            </div>
        `;
    } else if (!produto.opcoes || produto.opcoes.length === 0) {
        htmlOpcoes += `
            <div class="sabor-item" data-sabor="${produto.titulo}">
                <span>${produto.titulo}</span>
                <div class="quantidade">
                    <button class="menos disabled">-</button>
                    <span class="qtd">0</span>
                    <button class="mais">+</button>
                </div>
            </div>
        `;
    } else { // Se houver opções, cria uma para cada
        produto.opcoes.forEach(opcao => {
            htmlOpcoes += `
                <div class="sabor-item" data-sabor="${opcao}">
                    <span>${opcao}</span>
                    <div class="quantidade">
                        <button class="menos disabled">-</button>
                        <span class="qtd">0</span>
                        <button class="mais">+</button>
                    </div>
                </div>
            `;
        });
    }
    return htmlOpcoes;
}


function abrirModal(event) {
    const card = event.target.closest('.cards');
    if (!card) return;

    const produtoId = card.dataset.produto;
    const produtoInfo = produtos[produtoId];

    // Se o produto não for encontrado no nosso objeto, não abre o modal.
    if (!produtoInfo) {
        console.error(`Produto com id "${produtoId}" não encontrado.`);
        return;
    }

    resetarQuantidades();

    const imagemElement = card.querySelector('img');
    const modalImagem = modal.querySelector('.item-info img');
    const modalNome = modal.querySelector('.item-info h3');

    if (imagemElement && modalImagem) {
        modalImagem.src = imagemElement.src;
    }
    // Usa o título do nosso objeto de produtos para consistência
    if (modalNome) {
        modalNome.innerText = produtoInfo.titulo;
    }

    // Gera e insere as opções dinamicamente
    opcoesContainer.innerHTML = gerarOpcoesHTML(produtoId);

    modalContainer.classList.add('mostrar');
    document.body.style.overflow = 'hidden'; // Impede a rolagem do fundo
}

function fecharModal() {
    modalContainer.classList.remove('mostrar');
    document.body.style.overflow = ''; // Restaura a rolagem do fundo
}

function handleCliqueQuantidade(event) {
    const botao = event.target;
    const saborItem = botao.closest('.sabor-item');
    if (!saborItem) return;

    const sabor = saborItem.dataset.sabor;
    // Inicializa a quantidade se for a primeira vez
    if (quantidadesSabores[sabor] === undefined) {
        quantidadesSabores[sabor] = 0;
    }

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
        fecharModal();
    } else {
        alert('Nenhum item selecionado.');
    }
}

// ############# EVENT LISTENERS #############
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', abrirModal);
});
botaoFechar.addEventListener('click', fecharModal);
opcoesContainer.addEventListener('click', handleCliqueQuantidade);
botaoAdicionarCarrinho.addEventListener('click', coletarItensDoModal);
opcoesContainer.addEventListener('click', (event) => {
    if (event.target.name === 'sabor-xtudo') {
        const checkboxes = document.querySelectorAll('[name="sabor-xtudo"]:checked');
        if (checkboxes.length > 3) {
            alert('Você pode escolher no máximo 3 sabores.');
            event.target.checked = false;
        }
    }
});

opcoesContainer.addEventListener('click', (event) => {
    if (event.target.name === 'sabor-xtudo') {
        const checkboxes = document.querySelectorAll('[name="sabor-xtudo"]:checked');
        if (checkboxes.length > 3) {
            alert('Você pode escolher no máximo 3 sabores.');
            event.target.checked = false;
        }
    }
});

modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        fecharModal();
    }
});
