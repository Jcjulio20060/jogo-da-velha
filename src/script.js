let players = [];
let currentPlayer = 0;
let board = new Array(9).fill(null);

let btnPlay = document.getElementById('playGame');

btnPlay.addEventListener('click', ()=>{
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    if(player1 == '' || player2 == ''){ 
        alert('Player names are required');
        player1 = '';
        player2 = '';
        return;
    }
    players = [player1, player2];
    document.getElementById('game').style.display = 'block';
    document.getElementById('start').style.display = 'none';
    // document.getElementById('currentPlayer').innerHTML = players[currentPlayer];
});