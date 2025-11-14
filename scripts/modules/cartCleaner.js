// scripts/modules/cartCleaner.js

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutos em milissegundos
let inactivityTimer;

/**
 * Limpa o carrinho no sessionStorage.
 */
function clearCart() {
    // Verifica se há um carrinho antes de tentar limpar e notificar
    if (sessionStorage.getItem('carrinho')) {
        console.log('Limpando carrinho por inatividade ou fechamento da página.');
        sessionStorage.removeItem('carrinho');
        // Opcional: Adicionar um alerta para o usuário, embora possa não ser visto se a página estiver fechando.
        // alert('Seu carrinho foi limpo devido à inatividade.');
    }
}

/**
 * Inicia o cronômetro de inatividade.
 */
function startInactivityTimer() {
    // Limpa qualquer timer anterior para garantir que não haja múltiplos timers rodando
    clearTimeout(inactivityTimer); 
    inactivityTimer = setTimeout(clearCart, INACTIVITY_TIMEOUT);
    console.log(`Usuário inativo. O carrinho será limpo em ${INACTIVITY_TIMEOUT / 60000} minutos se a página não for reaberta.`);
}

/**
 * Para o cronômetro de inatividade.
 */
function stopInactivityTimer() {
    clearTimeout(inactivityTimer);
    console.log('Usuário ativo. Timer de limpeza de carrinho interrompido.');
}

// Adiciona um listener para o evento 'unload', que ocorre quando a página está sendo fechada.
// Isso garante que o carrinho seja limpo ao fechar a aba ou o navegador.
// window.addEventListener('unload', clearCart);

// Adiciona um listener para o evento 'visibilitychange', que detecta quando o usuário
// sai ou volta para a aba do navegador.
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Se a página ficou oculta (usuário trocou de aba, minimizou, etc.), inicia o timer.
        startInactivityTimer();
    } else {
        // Se a página voltou a ficar visível, para o timer.
        stopInactivityTimer();
    }
});

console.log('Gerenciador de limpeza de carrinho por inatividade ativado.');
