module.exports = {
    getBestMove(board, playerPiece, enemyPiece, blank) {
        let bestMove = { rating: -10, coords: [-1, -1] };
        let depth = 0;

        //For each move possible with get a rating from minimax
        //whichever move has the highest rating we use
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == blank) {
                    board[i][j] = playerPiece;
                    let moveRating = this.minimax(board, depth, false, playerPiece, enemyPiece, blank);
                    //console.log("move: " + i + ", " + j + "\n" + "rating: " + moveRating);
                    if (moveRating > bestMove.rating) {
                        bestMove.rating = moveRating;
                        bestMove.coords = [i, j];
                    }
                    board[i][j] = blank;
                }
            }
        }
        return bestMove;
    },

    minimax(board, depth, isPlayerPiece, playerPiece, enemyPiece, blank) {
        let rating = this.evaluate(board, playerPiece, enemyPiece);
        if (rating == 10) { return 10; }
        if (rating == -10) { return -10; }
        if (this.boardFull(board, blank)) { return 0; }

        if (isPlayerPiece) {
            let bestRating = -10;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] == blank) {
                        board[i][j] = playerPiece;
                        //this.help(board, depth, isPlayerPiece, playerPiece, enemyPiece, blank);
                        bestRating = Math.max(bestRating, this.minimax(board, depth + 1, !isPlayerPiece, playerPiece, enemyPiece, blank));
                        board[i][j] = blank;
                    }
                }
            }
            return bestRating;
        } else {
            let bestRating = 10;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] == blank) {
                        board[i][j] = enemyPiece;
                        //this.help(board, depth, isPlayerPiece, playerPiece, enemyPiece, blank);
                        bestRating = Math.min(bestRating, this.minimax(board, depth + 1, !isPlayerPiece, playerPiece, enemyPiece, blank));
                        board[i][j] = blank;
                    }
                }
            }
            return bestRating;
        }
    },

    evaluate(board, playerPiece, enemyPiece) {
        //Check Rows
        for (var i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                if (board[i][0] == playerPiece) {
                    return 10;
                } else if (board[i][0] == enemyPiece) {
                    return -10;
                }
            }
        }

        //Check columns
        for (var i = 0; i < 3; i++) {
            if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                if (board[0][i] == playerPiece) {
                    return 10;
                } else if (board[0][i] == enemyPiece) {
                    return -10;
                }
            }
        }

        //Check diagonals
        if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
            if (board[0][0] == playerPiece) {
                return 10;
            } else if (board[0][0] == enemyPiece) {
                return -10;
            }
        }

        if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
            if (board[0][2] == playerPiece) {
                return 10;
            } else if (board[0][2] == enemyPiece) {
                return -10;
            }
        }

        return 0;
    },

    boardFull(board, blank) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == blank) { return false; }
            }
        }
        return true;
    },

    help(board, depth, isPlayerPiece, playerPiece, enemyPiece, blank) {
        console.log("--- Help ---");
        console.log("Depth: " + depth);
        console.log("Player is mover: " + isPlayerPiece);
        console.log(" | " + board[0][0] + " | " + board[0][1] + " | " + board[0][2] + " | ");
        console.log(" | " + board[1][0] + " | " + board[1][1] + " | " + board[1][2] + " | ");
        console.log(" | " + board[2][0] + " | " + board[2][1] + " | " + board[2][2] + " | ");
        console.log("\n\n");
    }
}