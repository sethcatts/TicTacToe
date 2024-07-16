class AI_Player extends Player {
    /**
     * @constructor AI Player
     * @param {string} name 
     * @param {*} piece 
     * @param {*} color 
     * @param {*} difficulty 
     */
    constructor(name, piece, enemyPiece, color, difficulty, blank) {
        super(name, piece, color);
        this.blank = blank;
        this.enemyPiece = enemyPiece;
        this.difficulty = difficulty;
    }

    getBestMove(board) {
        let bestMove = { rating: -10, coords: [-1, -1] };
        let depth = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == this.blank) {
                    board[i][j] = this.piece;
                    let moveRating = this.minimax(board, depth, false, this.piece, this.enemyPiece, this.blank);
                    if (moveRating > bestMove.rating) {
                        bestMove.rating = moveRating;
                        bestMove.coords = [i, j];
                    }
                    board[i][j] = this.blank;
                }
            }
        }
        return bestMove;
    }

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
                        bestRating = Math.min(bestRating, this.minimax(board, depth + 1, !isPlayerPiece, playerPiece, enemyPiece, blank));
                        board[i][j] = blank;
                    }
                }
            }
            return bestRating;
        }
    }

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
    }

    boardFull(board, blank) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == blank) { return false; }
            }
        }
        return true;
    }
}

