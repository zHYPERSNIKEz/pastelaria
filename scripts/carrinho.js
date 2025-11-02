// scripts/carrinho.js

// ############# SELETORES DE ELEMENTOS #############
const asideCarrinho = document.querySelector('aside.carrinho');

// ############# ESTADO (DADOS) #############
// Array para guardar os itens do carrinho
let carrinho = [];

// ############# FUNÇÕES #############

/**
 * Adiciona um array de itens ao carrinho e mostra o aside.
 * @param {Array} itens - Array de objetos de item a serem adicionados.
 */
function adicionarAoCarrinho(itens) {
    // Adiciona os novos itens ao array principal do carrinho
    carrinho.push(...itens);
    
    console.log('Carrinho atualizado:', carrinho);
    alert('Itens adicionados! (Veja o console para detalhes)');

    // Mostra o aside do carrinho
    asideCarrinho.classList.add('mostrar');
}