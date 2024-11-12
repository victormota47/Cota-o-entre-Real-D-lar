let cotacaoAtual = 0;

async function fetchCotacao() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
        const data = await response.json();
        cotacaoAtual = parseFloat(data.USDBRL.bid);
        document.getElementById('cotacao').innerText = `Cotação atual: R$ ${cotacaoAtual.toFixed(2)}`;
    } catch (error) {
        document.getElementById('cotacao').innerText = "Erro ao buscar cotação.";
        console.error("Erro:", error);
    }
}

window.onload = fetchCotacao;

function converter() {
    const valor = parseFloat(document.getElementById('valor').value);
    const tipoConversao = document.getElementById('conversao').value;

    if (!isNaN(valor) && cotacaoAtual > 0) {
        let resultado;
        if (tipoConversao === 'realParaDolar') {
            resultado = valor / cotacaoAtual;
            document.getElementById('resultado').innerText = `R$ ${valor} é aproximadamente US$ ${resultado.toFixed(2)}`;
        } else {
            resultado = valor * cotacaoAtual;
            document.getElementById('resultado').innerText = `US$ ${valor} é aproximadamente R$ ${resultado.toFixed(2)}`;
        }
    } else {
        document.getElementById('resultado').innerText = "Digite um valor válido para conversão.";
    }
}
