class Parquimetro {
    constructor() {
        this.tempoRestante = 0;
    }

    adicionarTempo(valorPago) {
        const maxMinutos = 120;

        // Tabela de compra (maior → menor)
        const tabela = [
            { preco: 3.00, minutos: 120 },
            { preco: 1.75, minutos: 60 },
            { preco: 1.00, minutos: 30 }
        ];

        // Se já atingiu máximo → devolve tudo
        if (this.tempoRestante >= maxMinutos) {
            return { minutosComprados: 0, troco: valorPago };
        }

        let troco = valorPago;
        let minutosComprados = 0;

        // Compra de minutos    
        for (const faixa of tabela) {
            while (
                troco >= faixa.preco &&
                (this.tempoRestante + minutosComprados + faixa.minutos) <= maxMinutos
            ) {
                troco -= faixa.preco;
                minutosComprados += faixa.minutos;
            }
        }

        // Atualiza tempo restante
        this.tempoRestante += minutosComprados;

        // Arredonda o troco para evitar problemas de precisão
        troco = Math.round(troco * 100) / 100;

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

// Interface Web

const parquimetroWeb = new Parquimetro();
const tempoRestanteEl = document.getElementById('tempoRestante');
const trocoEl = document.getElementById('troco');

function atualizarDisplay() {
    tempoRestanteEl.innerText = `Tempo restante: ${parquimetroWeb.obterTempoRestante()} minutos`;
}

function adicionarTempoWeb() {
    const valor = parseFloat(document.getElementById('valorPago').value) || 0;
    const { minutosComprados, troco } = parquimetroWeb.adicionarTempo(valor);

    alert(`+${minutosComprados} minutos adicionados.\nTroco: R$ ${troco.toFixed(2)}`);

    trocoEl.innerText = `Troco: R$ ${troco.toFixed(2)}`;
    atualizarDisplay();
}

function consumirTempoWeb() {
    const minutos = parseInt(document.getElementById('minutosConsumir').value) || 0;
    const ok = parquimetroWeb.consumirTempo(minutos);
    alert(ok ? 'Consumo bem-sucedido!' : 'Tempo insuficiente.');
    atualizarDisplay();
}

// Contagem regressiva automática
setInterval(() => {
    if (parquimetroWeb.tempoRestante > 0) {
        parquimetroWeb.consumirTempo(1);
        atualizarDisplay();
    }
}, 60000);

// Atualizar no início
atualizarDisplay();
                              