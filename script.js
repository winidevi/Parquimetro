class Parquimetro {
    constructor() {
        this.tempoRestante = 0;
        this.tabelaPrecos = [
            { minutos: 120, preco: 3.00 },
            { minutos: 60, preco: 1.75 },
            { minutos: 30, preco: 1.00 }
        ];
    }

    adicionarTempo(valorPago) {
        let minutosComprados = 0;
        let valorRestante = valorPago;

        // Compra o maior tempo possível com o valor pago
        for (const faixa of this.tabelaPrecos) {
            while (valorRestante >= faixa.preco) {
                valorRestante -= faixa.preco;
                minutosComprados += faixa.minutos;
            }
        }

        this.tempoRestante += minutosComprados;

        // Arredonda troco
        const troco = Math.round(valorRestante * 100) / 100;

        return { minutosComprados, troco };
    }

    consumirTempo(minutos) {
        if (minutos > this.tempoRestante) return false;
        this.tempoRestante -= minutos;
        return true;
    }

    obterTempoRestante() {
        return this.tempoRestante;
    }
}

// --- Instância global ---
const parquimetroWeb = new Parquimetro();
const tempoRestanteEl = document.getElementById('tempoRestante');
const trocoEl = document.getElementById('troco');

function atualizarDisplay() {
    tempoRestanteEl.innerText = `Tempo restante: ${parquimetroWeb.obterTempoRestante()} minutos`;
}

function adicionarTempoWeb() {
    const valor = parseFloat(document.getElementById('valorPago').value) || 0;
    const { minutosComprados, troco } = parquimetroWeb.adicionarTempo(valor);
    alert(`+${minutosComprados} minutos adicionados.\nTroco: R$${troco.toFixed(2)}`);
    trocoEl.innerText = `Troco: R$${troco.toFixed(2)}`;
    atualizarDisplay();
}

function consumirTempoWeb() {
    const minutos = parseInt(document.getElementById('minutosConsumir').value) || 0;
    const ok = parquimetroWeb.consumirTempo(minutos);
    alert(ok ? 'Consumo bem-sucedido!' : 'Tempo insuficiente.');
    atualizarDisplay();
}

// --- Contagem regressiva automática ---
setInterval(() => {
    if (parquimetroWeb.tempoRestante > 0) {
        parquimetroWeb.consumirTempo(1);
        atualizarDisplay();
    }
}, 60000); // 1 minuto = 60000 ms

// Atualiza o display inicial
atualizarDisplay();


