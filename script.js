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

    function playMove(row, column){
        if (gameOver){
            console.log("Game is already over.");
            return;
        }

        if (board[row][column] !== undefined){
            console.log("Invalid move: Cell Already Occupied");
            return;
        }

        board[row][column] = activePlayer.marker;

        const result = checkWinner(row, column);
        if (result !== null){
            gameOver = true;
            console.log(`${activePlayer.name} wins!`);
            return;
        }

        if (checkTie()){
            gameOver = true;
            console.log("It's a tie!");
            return;
        }
    
        switchPlayerTurn();

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


    function checkDiagonalWin(rowIndex, colIn){
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

function displayController(){
    
}



// Form Handling

