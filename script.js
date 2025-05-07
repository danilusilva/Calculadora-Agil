const resultado = document.getElementById('resultado');
let aguardandoIndice = false;
let numeroParaRaiz = 0;

// Previne múltiplos pontos decimais e operadores consecutivos
function validarEntrada(valor) {
    const ultimoChar = resultado.value.slice(-1);
    const operadores = ['+', '-', '*', '/', '^', '%'];
    
    // Previne múltiplos pontos decimais
    if (valor === '.' && resultado.value.includes('.')) {
        return false;
    }
    
    // Previne operadores consecutivos
    if (operadores.includes(valor) && operadores.includes(ultimoChar)) {
        return false;
    }
    
    return true;
}

function adicionarAoVisor(valor) {
    if (validarEntrada(valor)) {
        resultado.value += valor;
    }
}

function limparVisor() {
    resultado.value = '';
    aguardandoIndice = false;
}

function apagarUltimo() {
    resultado.value = resultado.value.slice(0, -1);
}

function calcularRaiz() {
    try {
        // Pega o número do visor
        const numero = parseFloat(resultado.value);
        
        if (isNaN(numero)) {
            throw new Error('Digite um número válido');
        }
        
        // Armazena o número e limpa o visor para receber o índice
        numeroParaRaiz = numero;
        resultado.value = '';
        aguardandoIndice = true;
        resultado.placeholder = 'Digite o índice da raiz';
    } catch (erro) {
        resultado.value = erro.message;
        setTimeout(limparVisor, 1500);
    }
}

function calcular() {
    try {
        if (!resultado.value) {
            return;
        }

        // Se estiver aguardando o índice da raiz
        if (aguardandoIndice) {
            const indice = parseFloat(resultado.value);
            
            if (isNaN(indice)) {
                throw new Error('Índice inválido');
            }
            
            if (indice === 0) {
                throw new Error('Índice não pode ser zero');
            }
            
            // Verifica se o número é negativo e o índice é par
            if (numeroParaRaiz < 0 && indice % 2 === 0) {
                throw new Error('Não é possível calcular raiz par de número negativo');
            }
            
            // Calcula a raiz n-ésima
            const resposta = Math.pow(Math.abs(numeroParaRaiz), 1/indice);
            
            // Ajusta o sinal se necessário
            const resultadoFinal = numeroParaRaiz < 0 && indice % 2 !== 0 ? -resposta : resposta;
            
            resultado.value = Number(resultadoFinal.toFixed(8)).toString();
            aguardandoIndice = false;
            resultado.placeholder = '';
            return;
        }

        // Substitui × por * para multiplicação
        let expressao = resultado.value.replace('×', '*');
        
        // Substitui ^ por ** para potenciação
        expressao = expressao.replace(/\^/g, '**');
        
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
        resultado.value = erro.message;
        setTimeout(limparVisor, 1500);
    }
}

// Adiciona suporte ao teclado
document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;
    
    // Previne o comportamento padrão para algumas teclas
    if (['Enter', 'Escape', 'Backspace'].includes(tecla)) {
        evento.preventDefault();
    }
    
    // Números e operadores
    if (/[\d+\-*/.%^]/.test(tecla)) {
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