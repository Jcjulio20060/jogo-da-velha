let players = [];
let currentPlayer = 0;
let gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function startGame(){
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    if(player1 == '' || player2 == ''){
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

function choosePlayer(){
    let choice = Math.floor(Math.random() * 2);
    currentPlayer = choice;
    document.getElementById('currentPlayer').innerHTML = players[currentPlayer];
    trocaPosicao();
}

function trocaPosicao(){
    if(players[currentPlayer] == players[0]){
        return;
    } else {
        let atualPlayer = players[0];
        players[0] = players[1];
        players[1] = atualPlayer;
        currentPlayer = 0;
    }
}

function handleClick(cell){
    let row;
    let col;
    if(cell < 3){
        row = 0;
        col = cell;
    } else if(cell < 6){
        row = 1;
        col = cell - 3;
    } else {
        row = 2;
        col = cell - 6;
    }
    if(gameboard[row][col] !== null){
        alert('This cell is already taken');
    }
    else {
        let cellElement = document.getElementById('cell-' + cell);
        if(currentPlayer === 0){
            gameboard[row][col] = 0;
            cellElement.innerHTML = '<span class="x-1"></span><span class="x-2"></span>';
        } else {
            gameboard[row][col] = 1;
            cellElement.innerHTML = '<span class="circle"></span>';
        }
        let result1 = verificaLinha();
        let result2 = false;
        let result3 = false;
        if(!result1){
            result2 = verificaColuna();
            if(!result2){
                result3 = vericicaTransversaç();
            }
        }
        if(result1 || result2 || result3){
            finalizaGame();
        }
        trocaPlayer();
    }
}

function trocaPlayer(){
    if(currentPlayer === 0){
        currentPlayer = 1;
    } else {
        currentPlayer = 0;
    }
    document.getElementById('currentPlayer').innerHTML = players[currentPlayer];
}

function verificaLinha(){
    for(let i = 0; i < 3; i++){
        if(gameboard[i][0] !== null && gameboard[i][0] === gameboard[i][1] && gameboard[i][0] === gameboard[i][2]){
            return true;
        }
    }
    return false;
}

function verificaColuna(){
    for(let i = 0; i < 3; i++){
        if(gameboard[0][i] !== null && gameboard[0][i] === gameboard[1][i] && gameboard[0][i] === gameboard[2][i]){
            return true;
        }
    }
    return false;
}

function vericicaTransversaç(){
    if(gameboard[0][0] !== null && gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2]){
        return true;
    }
    if(gameboard[0][2] !== null && gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0]){
        return true;
    }
    return false;
}

function finalizaGame(){
    let winner = players[currentPlayer];
    let winner1 = document.getElementById('winner');
    winner1.innerHTML = winner;
    mudaJanela(2, 3);
}

function restartGame(){
    gameboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    currentPlayer = 0;
    document.getElementById('currentPlayer').innerHTML = players[currentPlayer];
    for(let i = 0; i < 9; i++){
        document.getElementById('cell-' + i).innerHTML = '';
    }
    document.getElementById('player1').value = players[0];
    document.getElementById('player2').value = players[1];
    mudaJanela(3, 1);
}

function mudaJanela(one, two){
    document.getElementById(one).style.display = 'none';
    document.getElementById(two).style.display = 'block';
}