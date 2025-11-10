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
        opcoes: ['Carne', 'Queijo', 'Frango'],
        instructionText: 'Escolha os sabores e quantidades:'
    },
    'pastel-especial-9': {
        titulo: 'Pastel Especial',
        opcoes: ['Queijo e Bacon', 'Calabresa e Queijo',
            'Pizza', 'Frango com Cheddar e azeitona',
            'Frango com Queijo e azeitona'],
        instructionText: 'Escolha os sabores e quantidades:'
    },
    'pastel-especial-12': {
        titulo: 'Pastel Especial',
        opcoes: ['Carne de Sol c/ Queijo coalho', 'Carne de Sol c/ Catupiry e Queijo'],
        instructionText: 'Escolha os sabores e quantidades:'
    },
    'pastel-2-sabores': {
        titulo: 'Pastel 2 Sabores',
        opcoes: ['Frango com Bacon','Frango com Catupiry',
                'Frango com Calabresa','Frango com Queijo',
                'Carne com Queijo',
                'Carne com Catupiry',
                'Carne com Bacon'],
        instructionText: 'Escolha os sabores e quantidades:'
    },
    'pastel-x-tudo': {
        titulo: 'Pastel X-Tudo',
        opcoes: ['Carne', 'Queijo', 'Frango', 'Queijo e Bacon', 'Calabresa e Queijo', 'Pizza', 'Frango com Cheddar e azeitona', 'Frango com Queijo e azeitona', 'Carne de Sol c/ Queijo coalho', 'Carne de Sol c/ Catupiry e Queijo', 'Frango com Bacon', 'Frango com Catupiry', 'Frango com Calabresa', 'Frango com Queijo', 'Carne com Queijo', 'Carne com Catupiry', 'Carne com Bacon'],
        instructionText: 'Escolha até 3 sabores:'
    },
    'cachorrao': {
        titulo: 'Cachorrão',
        opcoes: [], // Sem sub-opções, apenas a principal
        instructionText: 'Escolha a quantidade:'
    },
    'marmita-p': {
        titulo: 'Marmita P',
        opcoes: ['Arroz refogado', 'Feijão Mulatinho', 'Baião de feijão verde'],
        acompanhamentos: ['Macarrão', 'Beterraba ralada', 'Salada Crua', 'Farofa', 'Cuscuz C/Bacon', 'Purê de batata', 'Banana empanada'],
        carnes: ['Linguiça', 'Porco', 'Frango assado', 'Frango ao molho'],
        instructionText: 'Escolha as opções para sua marmita:'
    },
    'marmita-m': {
        titulo: 'Marmita M',
        opcoes: ['Arroz refogado', 'Feijão Mulatinho', 'Baião de feijão verde'],
        acompanhamentos: ['Macarrão', 'Beterraba ralada', 'Salada Crua', 'Farofa', 'Cuscuz C/Bacon', 'Purê de batata', 'Banana empanada', 'Lasanha de frango', 'Lasanha bolonhesa'],
        carnes: ['Linguiça', 'Porco', 'Frango assado', 'Frango ao molho'],
        instructionText: 'Escolha as opções para sua marmita:'
    },
    'marmita-g': {
        titulo: 'Marmita G',
        opcoes: ['Arroz refogado', 'Feijão Mulatinho', 'Baião de feijão verde'],
        acompanhamentos: ['Macarrão', 'Beterraba ralada', 'Salada Crua', 'Farofa', 'Cuscuz C/Bacon', 'Purê de batata', 'Banana empanada', 'Lasanha de frango', 'Lasanha bolonhesa'],
        carnes: ['Linguiça', 'Porco', 'Frango assado', 'Frango ao molho'],
        instructionText: 'Escolha as opções para sua marmita:'
    },
    'cuscuz-pote':{
        titulo: 'cuscuz no pote',
        opcoes: ['Carne moída ao molho', 'Linguiça Suína', 'Linguiça Calabresa', 'Frango Desfiado', 'Quijo e Vinagrete'],
        instructionText: 'Escolha os sabores e quantidades:'
    },
    'cuscuz-recheado':{
        titulo: 'Cuscuz Recheado',
        opcoes: ['Frango', 'Carne Moída', 'Calabresa', 'Salsicha', 'Salada'],
        adicionais: ['Carne de Sol', 'Bacon'],
        instructionText: 'Escolha 1 sabor:'
    },
    'sopa-frango': {
        titulo: 'Sopa de Frango',
        opcoes: [],
        instructionText: 'Escolha a quantidade:'
    },
    'mungunza': {
        titulo: 'Mungunzá',
        opcoes: [],
        instructionText: 'Escolha a quantidade:'
    },
    'refri-2l': {
        titulo: 'Refrigerante 2L',
        opcoes: ['Coca-Cola', 'Cajuina','Guaraná Antarctica', 'Fanta Laranja', 'Fanta Uva'],
        instructionText: 'Escolha os sabores e quantidades:'
    },
    'refri-1l': {
        titulo: 'Refrigerante 1L',
        opcoes: ['Coca-Cola', 'Cajuina', 'Guaraná Antarctica'],
        instructionText: 'Escolha os sabores e quantidades:'
    },
    'refri-lata': {
        titulo: 'Refrigerante em Lata',
        opcoes: ['Coca-Cola','Cajuina', 'Guaraná Antarctica', 'Fanta Laranja', 'Sprite'],
        instructionText: 'Escolha os sabores e quantidades:'
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
                    <div class="opcoes-xtudo opcoes-group">
                        ${produto.opcoes.map(sabor => `<label><input type="checkbox" name="sabor-xtudo" value="${sabor}"> ${sabor}</label>`).join('')}
                    </div>            <div class="sabor-item" data-sabor="${produto.titulo}">
                <span>${produto.titulo}</span>
                <div class="quantidade">
                    <button class="menos disabled">-</button>
                    <span class="qtd">0</span>
                    <button class="mais">+</button>
                </div>
            </div>
        `;
    } else if (produtoId === 'cuscuz-recheado') {
        htmlOpcoes += `
                    <div class="opcoes-cuscuz opcoes-group">
                        ${produto.opcoes.map(sabor => `<label><input type="radio" name="sabor-cuscuz" value="${sabor}"> ${sabor}</label>`).join('')}
                    </div>
                    <div class="adicionais-cuscuz opcoes-group" style="display: none;">
                        <h4>Adicionais (R$ 3,00 cada):</h4>
                        ${produto.adicionais.map(adicional => `<label><input type="checkbox" name="adicional-cuscuz" value="${adicional}"> ${adicional}</label>`).join('')}
                    </div>            <div class="sabor-item" data-sabor="${produto.titulo}">
                <span>${produto.titulo}</span>
                <div class="quantidade">
                    <button class="menos disabled">-</button>
                    <span class="qtd">0</span>
                    <button class="mais">+</button>
                </div>
            </div>
        `;
    } else if (produtoId.startsWith('marmita-')) {
        htmlOpcoes += `
            <h4>Opções (Arroz, Feijão e Baião):</h4>
            <div class="opcoes-marmita opcoes-group">
                ${produto.opcoes.map(opcao => `<label><input type="radio" name="opcao-marmita" value="${opcao}"> ${opcao}</label>`).join('')}
            </div>

            <h4>Acompanhamentos (Escolha até 3):</h4>
            <div class="acompanhamentos-marmita opcoes-group">
                ${produto.acompanhamentos.map(acomp => `<label><input type="checkbox" name="acompanhamento-marmita" value="${acomp}"> ${acomp}</label>`).join('')}
            </div>

            <h4>Tipos de Carne (Escolha até 2):</h4>
            <div class="carnes-marmita opcoes-group">
                ${produto.carnes.map(carne => `<label><input type="checkbox" name="carne-marmita" value="${carne}"> ${carne}</label>`).join('')}
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
    modalContainer.dataset.produtoId = produtoId; // Armazena o ID do produto

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

    // Adiciona e define o texto de instrução dinamicamente
    const modalHeader = modal.querySelector('.modal-header');
    let instructionH4 = modalHeader.querySelector('.instruction-text');
    if (instructionH4) {
        instructionH4.remove();
    }
    
    instructionH4 = document.createElement('h4');
    instructionH4.classList.add('instruction-text');
    modalHeader.appendChild(instructionH4);
    instructionH4.innerText = produtoInfo.instructionText || 'Escolha os sabores e quantidades:';


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

    const produtoId = modalContainer.dataset.produtoId;
    const sabor = saborItem.dataset.sabor;
    // Inicializa a quantidade se for a primeira vez
    if (quantidadesSabores[sabor] === undefined) {
        quantidadesSabores[sabor] = 0;
    }

    let quantidadeAtual = quantidadesSabores[sabor];
    const botaoMenos = saborItem.querySelector('.menos');

    if (botao.classList.contains('mais')) {
        if (produtoId === 'cuscuz-recheado' && quantidadeAtual >= 1) {
            alert('Você pode adicionar apenas um cuscuz recheado por vez.');
            return;
        }
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
    const produtoId = modalContainer.dataset.produtoId;

    if (produtoId === 'cuscuz-recheado') {
        const saborSelecionado = document.querySelector('input[name="sabor-cuscuz"]:checked');
        if (!saborSelecionado) {
            alert('Por favor, escolha um sabor para o cuscuz.');
            return;
        }

        const sabor = saborSelecionado.value;
        const adicionais = Array.from(document.querySelectorAll('input[name="adicional-cuscuz"]:checked')).map(cb => cb.value);
        const quantidade = parseInt(document.querySelector('.sabor-item .qtd').innerText);

        if (quantidade > 0) {
            let nomeFinal = `${nomeBase} (${sabor}`;
            if (adicionais.length > 0) {
                nomeFinal += ` com ${adicionais.join(', ')}`;
            }
            nomeFinal += ')';

            const precoBase = 15;
            const precoAdicionais = adicionais.length * 3;
            const precoFinal = precoBase + precoAdicionais;

            itensParaAdicionar.push({
                nome: nomeFinal,
                sabor: '', // Sabor já está no nome
                quantidade: quantidade,
                preco: precoFinal
            });
        }

    } else if (produtoId.startsWith('marmita-')) {
        const opcaoSelecionada = document.querySelector('input[name="opcao-marmita"]:checked');
        if (!opcaoSelecionada) {
            alert('Por favor, escolha uma opção de arroz, feijão ou baião.');
            return;
        }

        const acompanhamentos = Array.from(document.querySelectorAll('input[name="acompanhamento-marmita"]:checked')).map(cb => cb.value);
        if (acompanhamentos.length === 0) {
            alert('Por favor, escolha pelo menos um acompanhamento.');
            return;
        }

        const carnes = Array.from(document.querySelectorAll('input[name="carne-marmita"]:checked')).map(cb => cb.value);
        if (carnes.length === 0) {
            alert('Por favor, escolha pelo menos um tipo de carne.');
            return;
        }

        const quantidade = parseInt(document.querySelector('.sabor-item .qtd').innerText);

        if (quantidade > 0) {
            let nomeFinal = `${nomeBase} (${opcaoSelecionada.value}, ${acompanhamentos.join(', ')}, ${carnes.join(', ')})`;

            const card = document.querySelector(`[data-produto="${produtoId}"]`);
            const precoText = card.querySelector('p').innerText;
            const preco = parseFloat(precoText.replace('R$', '').replace(',', '.'));

            itensParaAdicionar.push({
                nome: nomeFinal,
                sabor: '', // Options are already in the name
                quantidade: quantidade,
                preco: preco
            });
        }
    } else {
        for (const sabor in quantidadesSabores) {
            const quantidade = quantidadesSabores[sabor];
            if (quantidade > 0) {
                // Find the price from the HTML
                const card = document.querySelector(`[data-produto="${produtoId}"]`);
                const precoText = card.querySelector('p').innerText;
                const preco = parseFloat(precoText.replace('R$', '').replace(',', '.'));

                itensParaAdicionar.push({
                    nome: nomeBase,
                    sabor: sabor,
                    quantidade: quantidade,
                    preco: preco
                });
            }
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

opcoesContainer.addEventListener('change', (event) => {
    if (event.target.name === 'sabor-cuscuz') {
        document.querySelector('.adicionais-cuscuz').style.display = 'block';
    }
});

modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        fecharModal();
    }
});

opcoesContainer.addEventListener('click', (event) => {
    if (event.target.name === 'acompanhamento-marmita') {
        const checkboxes = document.querySelectorAll('[name="acompanhamento-marmita"]:checked');
        if (checkboxes.length > 3) {
            alert('Você pode escolher no máximo 3 acompanhamentos.');
            event.target.checked = false;
        }
    } else if (event.target.name === 'carne-marmita') {
        const checkboxes = document.querySelectorAll('[name="carne-marmita"]:checked');
        if (checkboxes.length > 2) {
            alert('Você pode escolher no máximo 2 tipos de carne.');
            event.target.checked = false;
        }
    }
});
