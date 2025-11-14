# Instruções para Agentes AI - Projeto Parquimetro

## Visão Geral da Arquitetura

Este é um projeto front-end simples de um parquímetro digital que consiste em três componentes principais:

- `index.html`: Interface do usuário
- `script.js`: Lógica de negócios do parquímetro
- `style.css`: Estilização (atualmente vazio)

### Componentes Principais

#### Classe Parquimetro
A lógica principal está implementada na classe `Parquimetro` em `script.js`. Seus principais métodos são:

- `constructor(precoPorMinuto)`: Inicializa o parquímetro com uma taxa por minuto
- `adicionarTempo(valorPago)`: Converte pagamento em minutos de estacionamento
- `consumirTempo(minutos)`: Decrementa o tempo disponível
- `obterTempoRestante()`: Retorna o saldo de minutos

### Padrões e Convenções

1. **Monetização**
   - O valor base é definido em reais por minuto (R$/min)
   - Exemplo: `new Parquimetro(0.50)` = R$0,50 por minuto

2. **Manipulação de Tempo**
   - Todas as operações de tempo são feitas em minutos (inteiros)
   - O tempo é sempre arredondado para baixo ao converter de pagamento para minutos

3. **Integração com UI**
   - A interface com o usuário é feita através de eventos no DOM
   - O botão "Iniciar Estacionamento" está vinculado a `Parquimetro.tempo()`
   - O botão "Parar Estacionamento" usa id="stopButton"

### Pontos de Atenção

1. **Validações Pendentes**
   - Implementar validação de entrada para valores negativos
   - Adicionar tratamento para valores decimais no input de tempo

2. **Interações Pendentes**
   - Implementar a lógica do botão "Parar Estacionamento"
   - Adicionar feedback visual do tempo restante

3. **Estilização**
   - O arquivo `style.css` está vazio e precisa ser implementado
   - Seguir padrões de design responsivo para melhor experiência mobile

### Fluxos de Desenvolvimento

Para executar o projeto localmente:
1. Abra `index.html` em um navegador moderno
2. O console do navegador mostra logs de operações do parquímetro
3. Use as ferramentas de desenvolvedor (F12) para depuração