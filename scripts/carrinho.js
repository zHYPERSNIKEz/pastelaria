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
    
    console.log('Carrinho atualizado:', carrinho.map(item => {
        let itemString = `${item.quantidade}x ${item.nome}`;
        if (item.sabor) {
            itemString += ` (${item.sabor})`;
        }
        if (item.preco) {
            itemString += ` - R$ ${item.preco.toFixed(2)}`;
        }
        return itemString;
    }));
    alert('Itens adicionados ao carrinho!');

    // Mostra o aside do carrinho
    asideCarrinho.classList.add('mostrar');
}