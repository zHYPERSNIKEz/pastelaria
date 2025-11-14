// scripts/compras.js

document.addEventListener('DOMContentLoaded', () => {
    const carrinhoItemsContainer = document.getElementById('carrinho-items');
    const carrinhoVazioContainer = document.getElementById('carrinho-vazio');
    const carrinhoSummary = document.getElementById('carrinho-summary');
    const totalPriceEl = document.getElementById('total-price');
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido');
    const nomeInput = document.getElementById('nome');
    const enderecoInput = document.getElementById('endereco');
    const referenciaInput = document.getElementById('referencia');
    const formaPagamentoSelect = document.getElementById('forma-pagamento');
    const trocoInput = document.getElementById('troco');

    // Carrega o carrinho do localStorage ou inicia um array vazio
    let carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || [];

    function salvarCarrinho() {
        sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function renderCarrinho() {
        // Limpa o container de itens
        carrinhoItemsContainer.innerHTML = '';

        if (carrinho.length === 0) {
            carrinhoVazioContainer.classList.remove('hidden');
            carrinhoSummary.classList.add('hidden');
            carrinhoItemsContainer.classList.add('hidden');
        } else {
            carrinhoVazioContainer.classList.add('hidden');
            carrinhoSummary.classList.remove('hidden');
            carrinhoItemsContainer.classList.remove('hidden');

            carrinho.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.classList.add('carrinho-item');

                const itemPrecoTotal = item.preco * item.quantidade;

                itemEl.innerHTML = `
                    <div class="item-details">
                        <h3>${item.nome}</h3>
                        ${item.sabor ? `<p class="item-sabor">${item.sabor}</p>` : ''}
                        <p class="item-price">R$ ${itemPrecoTotal.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                        <span>${item.quantidade}</span>
                        <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                    </div>
                    <div class="item-remove">
                        <button class="remove-btn" data-index="${index}">Remover</button>
                    </div>
                `;
                carrinhoItemsContainer.appendChild(itemEl);
            });
        }
        updateTotal();
        addEventListeners();
    }

    function updateTotal() {
        const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        totalPriceEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    function addEventListeners() {
        // Botões de quantidade
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const action = e.target.dataset.action;

                if (action === 'increase') {
                    carrinho[index].quantidade++;
                } else if (action === 'decrease') {
                    carrinho[index].quantidade--;
                    if (carrinho[index].quantidade <= 0) {
                        carrinho.splice(index, 1); // Remove o item se a quantidade for 0 ou menos
                    }
                }
                salvarCarrinho();
                renderCarrinho();
            });
        });

        // Botões de remover
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                carrinho.splice(index, 1);
                salvarCarrinho();
                renderCarrinho();
            });
        });
    }

    // Lógica para o campo de troco
    formaPagamentoSelect.addEventListener('change', () => {
        if (formaPagamentoSelect.value === 'dinheiro') {
            trocoInput.style.display = 'block';
        } else {
            trocoInput.style.display = 'none';
        }
    });

    // Lógica para finalizar o pedido
    finalizarPedidoBtn.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        const nome = nomeInput.value.trim();
        if (!nome) {
            alert('Por favor, informe seu nome.');
            nomeInput.focus();
            return;
        }

        const endereco = enderecoInput.value.trim();
        if (!endereco) {
            alert('Por favor, informe o endereço de entrega.');
            enderecoInput.focus();
            return;
        }

        const referencia = referenciaInput.value.trim();
        const formaPagamento = formaPagamentoSelect.options[formaPagamentoSelect.selectedIndex].text;
        const troco = trocoInput.value.trim();

        // Construir a mensagem do pedido
        let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n\n';
        
        carrinho.forEach(item => {
            mensagem += `*${item.quantidade}x ${item.nome}*`;
            if (item.sabor) {
                mensagem += ` (${item.sabor})`;
            }
            mensagem += '\n';
        });

        const totalPedido = totalPriceEl.textContent;

        mensagem += `\n*Total do Pedido:* ${totalPedido}\n\n`;
        mensagem += `*Cliente:* ${nome}\n`;
        mensagem += `*Endereço de Entrega:*\n${endereco}\n`;
        if (referencia) {
            mensagem += `*Ponto de Referência:*\n${referencia}\n`;
        }
        mensagem += `\n*Forma de Pagamento:* ${formaPagamento}\n`;

        if (formaPagamentoSelect.value === 'dinheiro' && troco) {
            mensagem += `*Troco para:* R$ ${troco}\n`;
        }

        // Número de telefone para o qual a mensagem será enviada (substitua pelo número correto)
        const telefone = '5521996718050'; // <<<<<<< SUBSTITUA PELO NÚMERO DO WHATSAPP
        const mensagemCodificada = encodeURIComponent(mensagem);

        // Redirecionar para o WhatsApp
        window.open(`https://wa.me/${telefone}?text=${mensagemCodificada}`, '_blank');
        
        // Opcional: Limpar o carrinho após finalizar o pedido
        // carrinho = [];
        // salvarCarrinho();
        // renderCarrinho();
    });

    // Renderização inicial
    renderCarrinho();
    // Dispara o evento change para garantir que o campo de troco seja exibido corretamente no carregamento
    formaPagamentoSelect.dispatchEvent(new Event('change'));
});
