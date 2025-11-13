// scripts/modules/cartInteraction.js

let quantidadesSabores = {};

export function resetarQuantidades() {
    quantidadesSabores = {};
    const saborItems = document.querySelectorAll('.sabor-item');
    saborItems.forEach(item => {
        item.querySelector('.qtd').innerText = 0;
        if (item.querySelector('.menos')) {
            item.querySelector('.menos').classList.add('disabled');
        }
    });
}

export function handleCliqueQuantidade(event, modalContainer) {
    const botao = event.target;
    const saborItem = botao.closest('.sabor-item');
    if (!saborItem) return;

    const produtoId = modalContainer.dataset.produtoId;
    const sabor = saborItem.dataset.sabor;
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

export function coletarItensDoModal(modal, modalContainer, adicionarAoCarrinho, fecharModal) {
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
                sabor: '',
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
                sabor: '',
                quantidade: quantidade,
                preco: preco
            });
        }
    } else {
        for (const sabor in quantidadesSabores) {
            const quantidade = quantidadesSabores[sabor];
            if (quantidade > 0) {
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
        adicionarAoCarrinho(itensParaAdicionar);
        fecharModal(modalContainer);
    } else {
        alert('Nenhum item selecionado.');
    }
}
