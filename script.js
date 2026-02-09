const gameBoardModule = (function () {
    const gameBoard = [[undefined,undefined,undefined], [undefined,undefined,undefined], [undefined,undefined,undefined]];
    return {gameBoard};
})();

function playerFactory (name, marker){
    return {name, marker};
}


const submitButton = document.querySelector("#startGame");
submitButton.addEventListener("click", (event) => {
    const player1Name = document.querySelector("#player1NameInput").value;
    const player2Name = document.querySelector("#player2NameInput").value; 

    gameController.startGame(player1Name, player2Name);
});

const gameController = (function (){
    const board = gameBoardModule.gameBoard;
    let players = [];

    
    let activePlayer = null;
    let gameOver = false;
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0]? players[1]: players[0];
    };

    const getActivePlayer = () => activePlayer;

    function startGame(player1Name, player2Name){
        players = [];
        const player1 = playerFactory(player1Name, "X");
        const player2 = playerFactory(player2Name, "0");
        players.push(player1, player2);
        
        activePlayer = players[0];
        gameOver = false;

        // Clear the board.
        for (let row = 0; row< board.length;row++){
            for (let col = 0;col< board[row].length;col++){
                board[row][col] = undefined;
            }
        }
        
        const textBox = document.querySelector("#textBox");
        const content = document.createElement("h3");
        content.innerText = `Game Started, ${player1Name} turn!`
        textBox.appendChild(content);
    }

    const resultBox = document.querySelector("#resultBox");
    const content = document.createElement("h3");
    function playMove(row, column){
        if (gameOver){
            content.innerText = "Game is already over."
            resultBox.appendChild(content);

            console.log("Game is already over.");
            return;
        }

        if (board[row][column] !== undefined){
            content.innerText = "Invalid move: Cell Already Occupied";
            resultBox.appendChild(content);

            console.log("Invalid move: Cell Already Occupied");
            return;
        }

        board[row][column] = activePlayer.marker;

        const placedMarker = activePlayer.marker;
        const result = checkWinner(row, column);
        if (result !== null){
            gameOver = true;
            content.innerText = `${activePlayer.name} wins!`;
            resultBox.appendChild(content);

            console.log(`${activePlayer.name} wins!`);
            return placedMarker;
        }

        if (checkTie()){
            gameOver = true;
            content.innerText = "It's a tie!";
            resultBox.appendChild(content);

            console.log("It's a tie!");
            return placedMarker;
        }
    
        switchPlayerTurn();
        return placedMarker;
    }

    function checkRowWin(rowIndex){

        if (board[rowIndex][0] && board[rowIndex][0] === board[rowIndex][1] && board[rowIndex][0] === board[rowIndex][2]){
            return board[rowIndex][0];
        }
        return null;
    }


    function checkColumnWin(colIndex){
        if (board[0][colIndex] && board[0][colIndex] === board[1][colIndex] && board[0][colIndex] === board[2][colIndex]){
            return board[0][colIndex];
        }
        return null;
    }


    function checkDiagonalWin(){
        if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
            return board[0][0];
        }
        if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]){
            return board[0][2];
        }

        return null;
    }

    function checkWinner(row, col){
        let winner = checkRowWin(row);
        if (winner) return winner;


        winner = checkColumnWin(col);
        if (winner) return winner;

        if ((row === col) || (row+col ===2)){
            winner = checkDiagonalWin();
            if (winner) return winner;
        }

        return null;
    }

    function checkTie(){
        for (let row = 0; row<board.length; row++){
            for (let col = 0;col< board[row].length; col++){
                if (board[row][col] === undefined){
                    return false;
                }
            }
        }
        return true;
    }

    return {startGame, playMove, getActivePlayer};
})();

function xMarker(location) {
    location.innerText = "X";
    location.classList.add("cellDecoration");
}

function oMarker(location) {
    location.innerText = "0";
    location.classList.add("cellDecoration");
}
// Event Delegation
document.addEventListener("click", (event) => {
    if (event.target.matches(".cell")){
        const cell = event.target;
        const col = parseInt(cell.dataset.col);
        const row = parseInt(cell.dataset.row);

        const marker = gameController.playMove(row,col);

        if (!marker) return;
        if (marker === "X"){
            xMarker(cell);
        }else{
            oMarker(cell);
        }   
    }
});