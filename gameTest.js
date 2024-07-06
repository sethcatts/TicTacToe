const tictactoe = require("./game.js");
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let game = new tictactoe();

game.printBoard();


rl.question('coords: ', coords => {
    console.log('Coords:' + coords);
    rl.close();
});
