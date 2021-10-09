/**
 * @class AI Player
 */
class AI_Player extends Player {
    /**
     * @constructor AI Player
     * @param {string} name 
     * @param {*} piece 
     * @param {*} color 
     * @param {*} difficulty 
     */
    constructor(name, piece, color, difficulty, blank) {
        super(name, piece, color);
        this.blank = blank;
        this.enemyPiece = "o";
        this.difficulty = difficulty;
    }

    /**
     * @description Return on object specifying the preventable loss state of the board
     * @param {array} 3x3 board 
     */
    preventableLossCheck(board) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == this.blank) {
                    board[i][j] = this.piece;
                    if (this.evaluate(board) == 10) {
                        board[i][j] = this.blank;
                        return {
                            boolean: false,
                            move: new Array(-1, -1)
                        };
                    }
                    board[i][j] = this.enemyPiece;
                    if (this.evaluate(board) == -10) {
                        board[i][j] = this.blank;
                        return {
                            boolean: true,
                            move: new Array(i, j)
                        };
                    }
                    board[i][j] = this.blank;
                }
            }
        }
        return {
            boolean: false,
            move: new Array(0, 0)
        };
    }

    /**
     * @desc Get best single move
     * @param {array} board 
     */
    getBestMove(board) {
        var bestVal = -1000;
        var bestMove = [-1, -1];
        var preventable = this.preventableLossCheck(board)

        if (preventable.boolean) {
            bestMove = preventable.move;
            bestVal = 1000;
        }

        if (!preventable.boolean) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == this.blank) {
                        board[i][j] = this.piece;
                        var moveVal = this.minimax(board, 0, false);
                        board[i][j] = this.blank;
                        if (moveVal > bestVal) {
                            bestVal = moveVal;
                            bestMove = new Array(i, j);
                        }
                    }
                }
            }
        }
        return bestMove;
    }

    /**
     * @desc check for a win
     * @param {array} board 
     * @returns {int} board score based on who, if anyone, won the game
     */
    evaluate(board) {
        //Check Rows
        for (var i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                if (board[i][0] == this.piece) {
                    return 10;
                } else if (board[i][0] == this.enemyPiece) {
                    return -10;
                }
            }
        }

        //Check columns
        for (var i = 0; i < 3; i++) {
            if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                if (board[0][i] == this.piece) {
                    return 10;
                } else if (board[0][i] == this.enemyPiece) {
                    return -10;
                }
            }
        }

        //Check diagonals
        if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
            if (board[0][0] == this.piece) {
                return 10;
            } else if (board[0][0] == this.enemyPiece) {
                return -10;
            }
        }

        if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
            if (board[0][2] == this.piece) {
                return 10;
            } else if (board[0][2] == this.enemyPiece) {
                return -10;
            }
        }

        //Not a winning board
        return 0;
    }

    /**
     * @desc Get best move from board
     * @param {array} board 
     * @param {int} depth 
     * @param {int} max 
     */
    minimax(board, depth, max) {
        var score = this.evaluate(board);

        if (score == 10) {
            return score - depth;
        } else if (score == -10) {
            return score + depth;
        }

        if (!this.isMovesLeft(board)) {
            return 0;
        }

        if (max) {
            var best = -1000;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] == this.blank) {
                        board[i][j] = this.piece;
                        best = Math.max(best, this.minimax(board, depth + 1, !max));
                        board[i][j] = this.blank;
                    }
                }
            }
            return best;
        } else {
            var best = 1000;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] == this.blank) {
                        board[i][j] = this.piece;
                        best = Math.min(best, this.minimax(board, depth + 1, !max));
                        board[i][j] = this.blank;
                    }
                }
            }
            return best;
        }
    }

    /**
     * @desc Check for empty squares on the board
     * @param {array} board 
     */
    isMovesLeft(board) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == this.blank) {
                    return true;
                }
            }
        }
        return false;
    }
}