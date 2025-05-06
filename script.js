const resultado = document.getElementById('resultado');

function adicionarAoVisor(valor) {
    resultado.value += valor;
}

function limparVisor() {
    resultado.value = '';
}

function apagarUltimo() {
    resultado.value = resultado.value.slice(0, -1);
}

function calcular() {
    try {
        // Substitui × por * para multiplicação
        let expressao = resultado.value.replace('×', '*');
        
        // Trata cálculos com porcentagem
        if (expressao.includes('%')) {
            expressao = expressao.replace('%', '/100');
        }
        
        // Avalia a expressão
        const resposta = eval(expressao);
        
        // Verifica se o resultado é válido
        if (isNaN(resposta) || !isFinite(resposta)) {
            throw new Error('Cálculo inválido');
        }
        
        // Formata o resultado para evitar números decimais muito longos
        resultado.value = Number(resposta.toFixed(8)).toString();
    } catch (erro) {
        resultado.value = 'Erro';
        setTimeout(limparVisor, 1000);
    }
}

// Adiciona suporte ao teclado
document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;
    
    // Números e operadores
    if (/[\d+\-*/.%]/.test(tecla)) {
        adicionarAoVisor(tecla);
    }
    // Tecla Enter para calcular
    else if (tecla === 'Enter') {
        calcular();
    }
    // Backspace para apagar
    else if (tecla === 'Backspace') {
        apagarUltimo();
    }
    // Tecla Escape para limpar
    else if (tecla === 'Escape') {
        limparVisor();
    }
}); 