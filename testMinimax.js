let minimaxModule = require("./minimax");

let boardWin = [["x", "x", "x"], 
                ["-", "o", "-"], 
                ["o", "o", "-"]];

let boardLos = [["o", "-", "-"], 
                ["o", "x", "x"], 
                ["o", "-", "x"]];

let boardTie = [["o", "x", "o"], 
                ["x", "x", "o"], 
                ["x", "o", "x"]];

let boardBnk = [["-", "-", "-"], 
                ["-", "-", "-"], 
                ["-", "-", "-"]];

let boardTst = [["-", "-", "-"],
                ["-", "-", "-"], 
                ["-", "-", "-"]];
                


console.assert(minimaxModule.evaluate(boardWin, "x", "o") == 10, "Winning board did not evaluate to 10");
console.assert(minimaxModule.evaluate(boardLos, "x", "o") == -10, "Lossing board did not evaluate to -10");
console.assert(minimaxModule.evaluate(boardTie, "x", "o") == 0, "Tie board did not evaluate to 0");

console.assert(minimaxModule.boardFull(boardTie, "-") == true, "Board full did not return true when given a full board")
console.assert(minimaxModule.boardFull(boardWin, "-") == false, "Board full did not return false when given a board with moves")

console.assert(minimaxModule.minimax(boardWin, 0, true, "x", "o", "-") == 10, "Minimax did not see that the board is already won");
console.assert(minimaxModule.minimax(boardLos, 0, true, "x", "o", "-") == -10, "Minimax did not see that the board is already lost");
console.assert(minimaxModule.minimax(boardTie, 0, true, "x", "o", "-") == 0, "Minimax did not see that the board is a tie/full");

console.log("Board value of minimax: " + minimaxModule.minimax(boardTst, 0, true, "x", "o", "-"));

console.log(minimaxModule.getBestMove(boardTst, "x", "o", "-"));
//console.log(minimaxModule.evaluate(boardTst, "x", "o"));

