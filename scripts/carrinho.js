// scripts/carrinho.js

// ############# SELETORES DE ELEMENTOS #############
const asideCarrinho = document.querySelector('aside.carrinho');

// ############# ESTADO (DADOS) #############
// Carrega o carrinho do localStorage ou inicia um array vazio
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// ############# FUNÇÕES #############

/**
 * Adiciona um array de itens ao carrinho, atualizando quantidades se o item já existir.
 * Salva o carrinho no localStorage e mostra o aside.
 * @param {Array} itens - Array de objetos de item a serem adicionados.
 */
function adicionarAoCarrinho(itens) {
    // Para cada item novo que estamos tentando adicionar
    itens.forEach(novoItem => {
        // Procurar se um item idêntico (mesmo nome e sabor) já existe no carrinho
        const itemExistente = carrinho.find(
            item => item.nome === novoItem.nome && item.sabor === novoItem.sabor
        );

        if (itemExistente) {
            // Se existe, apenas aumenta a quantidade
            itemExistente.quantidade += novoItem.quantidade;
        } else {
            // Se não existe, adiciona o novo item ao carrinho
            carrinho.push(novoItem);
        }
    });

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    console.log('Carrinho atualizado:', carrinho);
    alert('Itens adicionados ao carrinho!');

    // Mostra o aside do carrinho se ele existir na página
    if (asideCarrinho) {
        asideCarrinho.classList.add('mostrar');
    }
}

// Mostra o aside do carrinho se já houver itens ao carregar a página
if (carrinho.length > 0 && asideCarrinho) {
    asideCarrinho.classList.add('mostrar');
}