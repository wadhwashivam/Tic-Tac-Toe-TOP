const gameBoardModule = (function () {
    const gameBoard = [[undefined,undefined,undefined], [undefined,undefined,undefined], [undefined,undefined,undefined]];
    return {gameBoard};
})();

function playerFactory (name){
    const marker = "@" + name;
    return {name, marker}
}

const gameController = (function (){
    const board = gameBoardModule.gameBoard;
    const player1 = playerFactory("player1");
    const player2 = playerFactory("player2");

    const players = [player1, player2];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0]? players[1]: players[0];
    };

    const getActivePlayer = () => activePlayer;

    // const printNewRound !!

    function startGame(){

    }


    let gameOver = false;
    function playMove(row, column){
        if (gameOver) {
            console.log("Game is already over.");
            return;
        }

        const board = gameBoardModule.gameBoard;

        if (board[row][column] !== undefined){
            console.log("Invalid move: Cell Already Occupied");
            return;
        }

        board[row][column] = activePlayer.marker;

        const result = checkWinner(row, col);
        if (result !== null){
            gameOver = true;
            console.log(`${activePlayer.name} wins!`);
        }


        switchPlayerTurn();

    }

    function checkRowWin(rowIndex){
        const board = gameBoardModule.gameBoard;
        const row = board[rowIndex];

        if (row[rowIndex][0] && row[rowIndex][0] === row[rowIndex][1] && row[rowIndex][0] === row[rowIndex][2]){
            return row[rowIndex][0];
        }
        return null;
    }


    function checkColumnWin(colIndex){
        const board = gameBoardModule.gameBoard;

        if (board[0][colIndex] && board[0][colIndex] === board[1][colIndex] && board[0][colIndex] === board[2][colIndex]){
            return board[0][colIndex];
        }
        return null;
    }


    function checkDiagonalWin(rowIndex){
        const board = gameBoardModule.gameBoard;

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
    return {startGame, playMove};
})();