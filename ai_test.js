var ai = new AI_Player("AI", "x", "black", 3, "-");
function dpboard(board) {
    console.log(board[0][0] + " | " + board[0][1] + " | " + board[0][2]);
    console.log(board[1][0] + " | " + board[1][1] + " | " + board[1][2]);
    console.log(board[2][0] + " | " + board[2][1] + " | " + board[2][2]);
    console.log("-");
}

var board1 = [["x","-","-"],
              ["-","o","-"],
              ["-","o","-"]];

var board2 = [["x","o","x"],
              ["x","-","o"],
              ["-","o","-"]];

var board3 = [["o","x","x"],
              ["-","-","o"],
              ["o","o","x"]];

var board_x = [["-","-","-"],
               ["-","-","-"],
               ["-","-","-"]]; 

var board_y = [["-","-","-"],
               ["-","-","-"],
               ["-","-","-"]]; 

var board_z = [["-","-","-"],
               ["-","-","-"],
               ["-","-","-"]]; 

var board_n = [["-","-","-"],
               ["-","-","-"],
               ["-","-","-"]];   
                  
console.log(" 10 | board eval: " + ai.evaluate(board_x));
console.log(" 10 | board eval: " + ai.evaluate(board_y));
console.log(" xx | board eval: " + ai.evaluate(board_z));
console.log(" xx | board eval: " + ai.evaluate(board_n));
console.log("Eval: " + ai.evaluate(board1));

console.log("Best move for board 1 is: " + ai.getBestMove(board1));

var b1bm = ai.getBestMove(board1);
board1[b1bm[0]][b1bm[1]] = "+";
console.log(board1);
dpboard(board1);

console.log("Best move for board 2 is: " + ai.getBestMove(board2));
var b2bm = ai.getBestMove(board2);
board2[b2bm[0]][b2bm[1]] = "+";
console.log(board2);
dpboard(board2);
console.log("Best move for board 3 is: " + ai.getBestMove(board3));
var b3bm = ai.getBestMove(board3);
board3[b3bm[0]][b3bm[1]] = "+";
console.log(board3);
dpboard(board3);
