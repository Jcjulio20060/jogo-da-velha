let players = [];
let currentPlayer = 0;
let gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// Função para iniciar o jogo
function startGame() {
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    if (player1 == '' || player2 == '') {
        alert('Players name is required');
        return;
    }
    players.push(player1);
    players.push(player2);
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    choosePlayer();
    mudaJanela(1, 2);
}

// Função para escolher o jogador inicial
function choosePlayer() {
    let choice = Math.floor(Math.random() * 2);
    currentPlayer = choice;
    document.getElementById('currentPlayer').innerHTML = players[currentPlayer];
    trocaPosicao();
}

// Função para trocar a posição dos jogadores
function trocaPosicao() {
    if (players[currentPlayer] == players[0]) {
        return;
    } else {
        let atualPlayer = players[0];
        players[0] = players[1];
        players[1] = atualPlayer;
        currentPlayer = 0;
    }
}

// Função para lidar com o clique nas células do tabuleiro
function handleClick(cell) {
    let row;
    let col;
    if (cell < 3) {
        row = 0;
        col = cell;
    } else if (cell < 6) {
        row = 1;
        col = cell - 3;
    } else {
        row = 2;
        col = cell - 6;
    }
    if (gameboard[row][col] !== null) {
        alert('This cell is already taken');
    } else {
        let cellElement = document.getElementById('cell-' + cell);
        if (currentPlayer === 0) {
            gameboard[row][col] = 0;
            cellElement.innerHTML = '<span class="x-1"></span><span class="x-2"></span>';
        } else {
            gameboard[row][col] = 1;
            cellElement.innerHTML = '<span class="circle"></span>';
        }
        let result1 = verificaLinha();
        let result2 = false;
        let result3 = false;
        if (!result1) {
            result2 = verificaColuna();
            if (!result2) {
                result3 = vericicaTransversaç();
            }
        }
        if (result1 || result2 || result3) {
            finalizaGame();
        } else if (empate()) {
            mudaJanela(2, 4);
        } else {
            trocaPlayer();
        }
    }
}

// Função para trocar o jogador atual
function trocaPlayer() {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.getElementById('currentPlayer').innerHTML = players[currentPlayer];
}

// Função para verificar se há uma linha vencedora
function verificaLinha() {
    for (let i = 0; i < 3; i++) {
        if (gameboard[i][0] !== null && gameboard[i][0] === gameboard[i][1] && gameboard[i][0] === gameboard[i][2]) {
            return true;
        }
    }
    return false;
}

// Função para verificar se há uma coluna vencedora
function verificaColuna() {
    for (let i = 0; i < 3; i++) {
        if (gameboard[0][i] !== null && gameboard[0][i] === gameboard[1][i] && gameboard[0][i] === gameboard[2][i]) {
            return true;
        }
    }
    return false;
}

// Função para verificar se há uma diagonal vencedora
function vericicaTransversaç() {
    if (gameboard[0][0] !== null && gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2]) {
        return true;
    }
    if (gameboard[0][2] !== null && gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0]) {
        return true;
    }
    return false;
}

// Função para finalizar o jogo
function finalizaGame() {
    let winner = players[currentPlayer];
    let winner1 = document.getElementById('winner');
    winner1.innerHTML = winner;
    mudaJanela(2, 3);
}

// Função para reiniciar o jogo
function restartGame() {
    gameboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    currentPlayer = 0;
    document.getElementById('currentPlayer').innerHTML = players[currentPlayer];
    for (let i = 0; i < 9; i++) {
        document.getElementById('cell-' + i).innerHTML = '';
    }
    document.getElementById('player1').value = players[0];
    document.getElementById('player2').value = players[1];
    mudaJanela(3, 1);
}

// Função para mudar de janela
function mudaJanela(one, two) {
    document.getElementById(one).style.display = 'none';
    document.getElementById(two).style.display = 'block';
}

// Função para verificar se houve empate
function empate() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameboard[i][j] === null) {
                return false; // Ainda há células vazias, não é empate
            }
        }
    }
    return true; // Todas as células estão preenchidas, é empate
}