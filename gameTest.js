const tictactoe = require("./game.js");
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let game = new tictactoe();


// game.placePiece(0,0); //Top Left
// game.placePiece(0,1); //Top Middle 
// game.placePiece(0,2); //Top Right
// game.placePiece(1,0); //Middle Left
// game.placePiece(1,1); //Middle Middle
// game.placePiece(1,2); //Middle Right
// game.placePiece(2,0); //Bottom Left
// game.placePiece(2,1); //Bottom Middle
// game.placePiece(2,1); //Bottom Right
// game.printBoard();
// console.log(game.getFrame());

game.placePiece(0,0); //Top Left
game.placePiece(0,1); //Top Middle 
game.placePiece(0,2); //Top Right
game.placePiece(2,0); //Bottom Left
game.placePiece(2,1); //Bottom Middle
game.placePiece(2,2); //Bottom Right
game.placePiece(1,0); //Middle Left
game.placePiece(1,1); //Middle Middle
game.placePiece(1,2); //Middle Right
game.printBoard();
console.log(game.getFrame());