const Player = require('./player');
const AI_Player = require('./ai_player');

var ai = new AI_Player("AI", "x", "black", 3, "-");

function printBoard(board) {
    console.log(board[0][0] + " | " + board[0][1] + " | " + board[0][2]);
    console.log(board[1][0] + " | " + board[1][1] + " | " + board[1][2]);
    console.log(board[2][0] + " | " + board[2][1] + " | " + board[2][2]);
    console.log("-");
}

function testIsWinningBoard() {
    var board1 = [
        ["x", "o", "x"],
        ["o", "o", "x"],
        ["o", "-", "-"]
    ];
    var board2 = [
        ["x", "o", "x"],
        ["o", "o", "x"],
        ["o", "o", "-"]
    ];
    var board3 = [
        ["x", "o", "x"],
        ["o", "o", "x"],
        ["o", "-", "x"]
    ];

    console.assert(ai.isWinningBoard(board1) == 0, "isWinningBoard did not return 0 for an unwon board");
    console.assert(ai.isWinningBoard(board2) == -10, "isWinningBoard did not return -10 for a lost board");
    console.assert(ai.isWinningBoard(board3) == 10, "isWinningBoard did not return 10 for a won board");
}

function testIsEnemyWinAt() {
    var board1 = [
        ["x", "o", "x"],
        ["o", "o", "x"],
        ["o", "-", "-"]
    ];
    console.assert(ai.isEnemyWinAt(board1).isEnemyWinSpace == true, "Failed to spot a loss");
}

function runTests() {
    testIsWinningBoard();
    testIsEnemyWinAt();
}

runTests();




