let game = new Game();
let theme = { x: "./images/theme-dark/x_1.png", o: "./images/theme-dark/o_1.png" }
let themes = {
    dark: { x: "./images/theme-dark/x_1.png", o: "./images/theme-dark/o_1.png" },
    light: { x: "/images/theme-light/x_1.png", o: "/images/theme-light/o_1.png" },
    blue_red: { x: "images/theme_blue-red/x_1.png", o: "images/theme_blue-red/o_1.png" },
    green_orange: { x: "images/theme_green-orange/x_1.png", o: "images/theme_green-orange/o_1.png" },
    yellow_purple: { x: "images/theme_yellow-purple/x_1.png", o: "images/theme_yellow-purple/o_1.png" }
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
}

function drawFrame() {
    let frame = game.getFrame();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            console.log(document.getElementById(i + "" + j).classList.contains("SelectedCell"));
            console.log(document.getElementById(i + "" + j).classList);
            if(!document.getElementById(i + "" + j).classList.contains("SelectedCell")) {
                console.log("redrew piece");
                if (frame.board[i][j] == "x") {
                    let elem = document.createElement('img');
                    elem.src = theme.x;
                    document.getElementById(i + "" + j).appendChild(elem);
                    document.getElementById(i + "" + j).classList.add("selectedCell");
                } else if (frame.board[i][j] == "o") {
                    let elem = document.createElement('img');
                    elem.src = theme.o;
                    document.getElementById(i + "" + j).appendChild(elem);
                    document.getElementById(i + "" + j).classList.add("selectedCell");
                } else {
                    document.getElementById(i + "" + j).innerHTML = "";
                }
            }
        }
    }
}

function playAgain() {
    document.getElementById("popup_gameoverbg").style.display = "none";
    game = new Game();
    drawFrame();
}

function toggleSettings() {
    let visiblity = document.getElementById("popup_bg").style.display;
    console.log(visiblity);
    let set = visiblity == "none" ? "block" : "none";
    document.getElementById("popup_bg").style.display = set;
}

function saveSettings() {
    document.getElementById("popup_bg").style.display = "none";
    let selectedTheme = document.getElementById("themes-dropdown").value;
    theme = themes[selectedTheme];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(i + "" + j).innerHTML = "";
        }
    }
    drawFrame();
}

function drawPieceShadow(coordinates) {
    if(game.legalMove(coordinates[0],coordinates[1])) {
        let cell = document.getElementById(coordinates[0] + "" + coordinates[1]);
        cell.style.backgroundImage = "url(" + theme[game.currentPlayer.piece] + ")";
    }
}
function erasePieceShadow(coordinates) {
    let cell = document.getElementById(coordinates[0] + "" + coordinates[1]);
    cell.style.backgroundImage = "None";
 }