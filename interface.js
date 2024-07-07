let game = new Game();


function placePiece(coordinates) {  
    //Update game state
    game.placePiece(coordinates[0], coordinates[1]);
    
    //update gui state based on a requested frame from the game instance
    drawFrame();

    //check game state and display state messages
    let frame = game.getFrame();
    if(frame.gameOver) {
        let popup_gameover = document.getElementById("popup_gameoverbg");
        if(frame.tie) {
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
            if (frame.board[i][j] == "x") {
                let elem = document.createElement('img');
                elem.className = "selectedCell";
                elem.src = "./images/theme_blue-red/x_1.png";
                document.getElementById(i + "" + j).appendChild(elem);
            } else if (frame.board[i][j] == "o") {
                let elem = document.createElement('img');
                elem.className = "selectedCell";
                elem.src = "./images/theme_blue-red/o_1.png";
                document.getElementById(i + "" + j).appendChild(elem);
            } else {
                document.getElementById(i + "" + j).innerHTML = "";
            }
        }
    }
}

function playAgain() {
    document.getElementById("popup_gameoverbg").style.display = "none";
    game = new Game();
    drawFrame();
}

function drawPieceShadow(coordinates) {}
function erasePieceShadow(coordinates) {}