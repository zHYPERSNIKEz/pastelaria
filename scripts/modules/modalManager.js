// scripts/modules/modalManager.js

export function abrirModal(event, modalContainer, modal, opcoesContainer, produtos, gerarOpcoesHTML, resetarQuantidades) {
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

export function fecharModal(modalContainer) {
    modalContainer.classList.remove('mostrar');
    document.body.style.overflow = ''; // Restaura a rolagem do fundo
}
