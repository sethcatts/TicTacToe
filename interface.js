let game = new Game();
let themes = {
    solar: {
        x: './images/solar/sun.png',
        o: './images/solar/moon.png',
        backgroundColor: 'black',
        backgroundImage: 'url("images/solar/background.png")',
        stingerImage: 'url("images/solar/stinger.png")',
        fontColor: "white",
        fontFamily: '"Share Tech Mono", monospace',
        cellBackgroundColor: "rgba(0, 0, 0, 0.5)",
        cellHighlightColor: "rgba(78, 78, 78, .5)",
        boardBorderColor: "rgba(255, 255, 255, 0)",
        boardBackgroundColor: "rgba(255, 255, 255, 0)"
    },

    cafe: {
        x: "./images/cafe/tea.png",
        o: "./images/cafe/coffee.png",
        backgroundColor: 'brown',
        backgroundImage: 'url("images/cafe/woodtexture.jpg")',
        stingerImage: 'url("images/cafe/stinger.png")',
        fontColor: "white",
        fontFamily: '"Pacifico", cursive',
        cellBackgroundColor: "rgba(77, 60, 48, 0.5)",
        cellHighlightColor: "rgba(78, 78, 78, .5)",
        boardBorderColor: "rgba(255, 255, 255, 0)",
        boardBackgroundColor: "rgba(255, 255, 255, 0)"
    },

    garden: {
        x: "./images/garden/flower_1.png",
        o: "./images/garden/flower_2.png",
        backgroundColor: 'brown',
        backgroundImage: 'url("images/garden/background.jpg")',
        stingerImage: 'none',
        fontColor: "rgba(252, 252, 252, 1)",
        fontFamily: '"Dancing Script", cursive',
        cellBackgroundColor: "rgba(97, 80, 66, 0.5)",
        cellHighlightColor: "rgba(166, 139, 201, .5)",
        boardBorderColor: "rgba(255, 255, 255, 0)",
        boardBackgroundColor: "rgba(255, 255, 255, 0.1)"
    },
}

setTheme("solar");
playAgain();

function setTheme(theme) {
    pieceTheme = themes[theme];
    theme = themes[theme];
    let rt = document.querySelector(":root");
    rt.style.setProperty("--background-color", theme.backgroundColor);
    rt.style.setProperty("--background-image", theme.backgroundImage);
    rt.style.setProperty("--font-color", theme.fontColor);
    rt.style.setProperty("--font-family", theme.fontFamily);
    rt.style.setProperty("--cell-background-color", theme.cellBackgroundColor);
    rt.style.setProperty("--cell-highlight-color", theme.cellHighlightColor);
    rt.style.setProperty("--board-border-color", theme.boardBorderColor);
    rt.style.setProperty("--board-background-color", theme.boardBackgroundColor);
    rt.style.setProperty("--stinger-image", theme.stingerImage);
}

function placePiece(coordinates) {
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
                elem.src = pieceTheme.x;
                document.getElementById(i + "" + j).appendChild(elem);
            } else if (frame.board[i][j] == "o") {
                document.getElementById(i + "" + j).innerHTML = "";
                let elem = document.createElement('img');
                elem.classList.add("placedPiece");
                elem.src = pieceTheme.o;
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
    if (document.getElementById("popup_gameoverbg").style.display != null) {
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
    setTheme(document.getElementById("themes-dropdown").value);
    checkForAIToggle();
    playAgain();
    clearBoard();
    drawFrame();
}


function checkForAIToggle() {
    if (document.getElementById("ai_toggle").checked) {
        game.player_2 = new AI_Player("Player Two (X)", "x", "o", "red", 1, "-");
        //Silly!
        if (game.currentPlayer != game.player_1) {
            game.currentPlayer = game.player_2;
        }
    } else {
        game.player_2 = new Player("Player Two (X)", "x");
    }
}

//Place piece if current player is an AI class instance and the game is not over
function AIAction() {
    if (game.currentPlayer instanceof AI_Player && !game.checkForWin() && !game.checkForTie()) {
        let move = game.player_2.getBestMove(game.board);
        placePiece(move.coords);
    }
}

function drawPieceShadow(coordinates) {
    if (game.legalMove(coordinates[0], coordinates[1])) {
        let elem = document.createElement('img');
        elem.src = pieceTheme[game.currentPlayer.piece];
        elem.classList.add("pieceHover");
        document.getElementById(coordinates[0] + "" + coordinates[1]).appendChild(elem);
    }
}

function erasePieceShadow(coordinates) {
    if (game.legalMove(coordinates[0], coordinates[1])) {
        document.getElementById(coordinates[0] + "" + coordinates[1]).innerHTML = "";
    }
}