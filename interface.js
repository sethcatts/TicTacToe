let game = new Game();
let themes = {
    dark: { x: "./images/theme-dark/x_1.png", o: "./images/theme-dark/o_1.png" },
    light: { x: "/images/theme-light/x_1.png", o: "/images/theme-light/o_1.png" },
    blue_red: { x: "images/theme_blue-red/x_1.png", o: "images/theme_blue-red/o_1.png" },
    green_orange: { x: "images/theme_green-orange/x_1.png", o: "images/theme_green-orange/o_1.png" },
    yellow_purple: { x: "images/theme_yellow-purple/x_1.png", o: "images/theme_yellow-purple/o_1.png" }
}
let theme = themes.light;

playAgain();

function placePiece(coordinates) {
    console.log(coordinates);

    //Update game state
    game.placePiece(coordinates[0], coordinates[1]);

    //update gui state based on a requested frame from the game instance
    drawFrame();

    //check game state and display state messages
    let frame = game.getFrame();
    if (frame.gameOver) {
        let popup_gameover = document.getElementById("popup_gameoverbg");
        if (frame.tie) {
            document.getElementById("gameoverstate").innerHTML = "Tie!";
            if (popup_gameover.style.display != "block") {
                popup_gameover.style.display = "block";
            } else {
                popup_gameover.style.display = "none";
            }
        } else {
            document.getElementById("gameoverstate").innerHTML = "Winner: " + frame.lastMover.name;
            if (popup_gameover.style.display != "block") {
                popup_gameover.style.display = "block";
            } else {
                popup_gameover.style.display = "none";
            }
        }
    }

    AIAction();
}

/**
 * Redraws the board based on the board supplied by the instance of Game
 * Note: Creates and destroys sub elements of cells
 */
function drawFrame() {
    let frame = game.getFrame();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (frame.board[i][j] == "x") {
                document.getElementById(i + "" + j).innerHTML = "";
                let elem = document.createElement('img');
                elem.classList.add("placedPiece");
                elem.src = theme.x;
                document.getElementById(i + "" + j).appendChild(elem);
            } else if (frame.board[i][j] == "o") {
                document.getElementById(i + "" + j).innerHTML = "";
                let elem = document.createElement('img');
                elem.classList.add("placedPiece");
                elem.src = theme.o;
                document.getElementById(i + "" + j).appendChild(elem);
            } else {
                document.getElementById(i + "" + j).innerHTML = "";
            }
        }
    }

}

/**
 * Create a new game instance, clear/draw the new board
 */
function playAgain() {
    if(document.getElementById("popup_gameoverbg").style.display != null) {
        document.getElementById("popup_gameoverbg").style.display = "none";
    }
    game = new Game();
    checkForAIToggle();
    clearBoard();
    drawFrame();
}

/**
 * Remove all sub elements from board cells
 */
function clearBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cell = document.getElementById(i + "" + j);
            cell.classList.remove("selectedCell");
            cell.innerHTML = "";
        }
    }
}

/**
 * -
 */
function toggleSettings() {
    let visibility = document.getElementById("popup_bg").style.display == "none" ? "block" : "none";
    document.getElementById("popup_bg").style.display = visibility;
}

/**
 * Apply theme to board
 */
function saveSettings() {
    document.getElementById("popup_bg").style.display = "none";
    theme = themes[document.getElementById("themes-dropdown").value];
    checkForAIToggle();
    playAgain();
    clearBoard();
    drawFrame();
}


function checkForAIToggle() {
    if(document.getElementById("ai_toggle").checked) {
        game.player_2 = new AI_Player("Player Two (X)", "x", "o", "red", 1, "-");
        //Silly!
        if(game.currentPlayer != game.player_1) { 
            game.currentPlayer = game.player_2;
        }
    } else {
        game.player_2 = new Player("Player Two (X)", "x");
    }
}

//Place piece if current player is an AI class instance and the game is not over
function AIAction() {
    if(game.currentPlayer instanceof AI_Player && !game.checkForWin() && !game.checkForTie()) {
        let move = game.player_2.getBestMove(game.board);
        placePiece(move.coords);
    }
}

function drawPieceShadow(coordinates) {
    if(game.legalMove(coordinates[0], coordinates[1])){ 
        let elem = document.createElement('img');
        elem.src = theme[game.currentPlayer.piece];
        elem.classList.add("pieceHover");
        document.getElementById(coordinates[0] + "" + coordinates[1]).appendChild(elem);
    }
}

function erasePieceShadow(coordinates) {
    if(game.legalMove(coordinates[0], coordinates[1])) {
        document.getElementById(coordinates[0] + "" + coordinates[1]).innerHTML = "";
    }
}