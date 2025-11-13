// scripts/modules/optionsGenerator.js

import { produtos } from '../data/produtos.js';

export function gerarOpcoesHTML(produtoId) {
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
