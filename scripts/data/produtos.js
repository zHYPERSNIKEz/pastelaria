// scripts/data/produtos.js

export const produtos = {
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
