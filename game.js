/**
 * @class Game
 */
class Game {
  /**
   * @constructor
   * @desc Game constructor
   * @implements {player} Player
   */
  constructor() {
    this.blank 		      = "-";
    this.board 		      = this.createBoard();
    this.gameOver       = false;
    this.tie            = false;
    this.player_1       = new Player("Player One (O)", "o");
    this.player_2       = new Player("Player Two (X)", "x");
    this.currentPlayer  = this.player_1;
    this.waitingPlayer  = this.player_2;
  }

  /**
   * @desc Create the game board using the specified blank tile
   * @returns {array} Array representing the current game board
   */
  createBoard() {
    let board = [];
    for (let i = 0; i < 3; i++) {
      let tempArray = [];
      for (let j = 0; j < 3; j++) {
        tempArray.push(this.blank);
      }
      board.push(tempArray);
      tempArray = [];
    }
    return board;
  }

  /**
   * @desc Get the current board array
   * @returns {array} Board array
   */
  getBoard() {
    return this.board;
  }

  /**
   * @desc Set game board array
   * @param {array} boardArray - The desired board
   */
  setBoard(boardArray) {
    this.board = boardArray;
  }

  /**
   * @desc Print the board as it currently looks
   */
  printBoard() {
    //console.clear();
    for (let i = 0; i < this.board[0].length; i++) {
      console.log(this.board[i][0] + " " + this.board[i][1] + " " + this.board[i][2]);
    }
  }

  /**
   * @desc Place a piece in the game board array
   * @param {int} x - Board x pos
   * @param {int} y - Board y pos
   * @returns {boolean} Legality of move
   */
  placePiece(x, y) {
    if(this.legalMove(x, y) && !this.gameOver) {
      this.board[x][y] = this.currentPlayer.getPiece();
      this.checkForWin();
      this.checkForTie();
      if(!this.gameOver) {
        this.switchMovingPlayer();
      }
      return true;
    } else {
      console.error("GAME CLASS ERROR: Attempted illegal move");
      return false;
    }
  }

  /**
   * @desc Set the player object for player 1 or 2
   * @param {player} player Player to be added to game object
   * @param {int} num Player object to replace with the new player
   */
  setPlayer(player, num) {
    //if player piece does not match...
    //We probably wanna always replace the second moving player to keep things simple
    //Or maybe switch to the human player after this 'activation' of the AI?
    //CURRENTLY -> First mover is 'o', A.I. should always be assigned 'x'
    this.player_2 = player;
    this.waitingPlayer = this.player_2;
  }

  /**
   * @desc Switch the current moving player
   * @returns {player} Current player
   */
  switchMovingPlayer() {
    if(this.currentPlayer == this.player_1) {
      this.currentPlayer = this.player_2;
      this.waitingPlayer = this.player_1;
    } else {
      this.currentPlayer = this.player_1;
      this.waitingPlayer = this.player_2;
    }
    return this.currentPlayer;
  }

  /**
   * @desc Switch the theme for both player objects 
   * @param {string} theme - New theme
   */
  setPlayersPieceTheme(theme) {
    this.player_1.setSet(theme);
    this.player_2.setSet(theme);
  }

  /**
   * @desc Set the name of one of the players
   * @param {int} player - 1 or 2 
   * @param {string} name - Selected player's new name
   */
  setPlayerName(player, name) {
    if(player == 1) {
      this.player_1.setPlayerName(name);
    } else if(player == 2) {
      this.player_2.setPlayerName(name);
    } else {
      console.log("Invalid player selected for name change");
    }
  }


  /**
   * @desc Get the current theme
   * @returns {string} theme
   */
  getCurrentTheme() {
    return this.currentPlayer.getSet();
  }

  /**
   * @desc Verify if a move is legal at the board position provided
   * @param {int} x - Board x pos
   * @param {int} y - Board y pos
   * @returns {boolean} Move legality
   */
  legalMove(x, y) {
    if(x <= this.board.length && y <= this.board[0].length) {
	    return this.board[x][y] === this.blank;
    } else {
	    return false;
    }
  }
  
  /**
   * @desc Check if the game board is full of player pieces
   * @returns {boolean}
   */
  boardFull() {
    var boardFull = true;
    for(var i = 0; i < 3; i++) {
      if(this.board[i].includes(this.blank)) {
        boardFull = false;
      }
    }
    return boardFull;
  }

  /**
   * @desc Check if the specified cell on the game board is empty
   * @param {int} x - Board x pos
   * @param {int} y - Board y pos   
   * @returns {boolean} 
   */
  emptyCell(x, y) {
    return this.board[x][y] == this.blank;
  }

	/**
   * @desc Check if the current game board is in a tie state
   * @returns {boolean}
   */
  checkForTie() {
	  if(this.boardFull() && !this.gameOver) {
      this.tie = true;
		  return true;
	  } else {
		  return false;
	  }
  }

  /**
   * @desc Check the current game board for a winning state
   * @returns {boolean}
   */
  checkForWin() {
    /**
     * @desc Helper - check if all params are equal
     * @param {string} f - 1
     * @param {string} s - 2
     * @param {string} t - 3
     * @returns {boolean}
     */
    function c(f,s,t) {
      return (f == s && f == t);
    }
    let state = false;
    let R = this.board;
    if(c(R[0][0], R[0][1], R[0][2]) && R[0][0] != this.blank) {
      state = true;
    } else if(c(R[1][0], R[1][1], R[1][2]) && R[1][0] != this.blank) {
      state = true
    } else if(c(R[2][0], R[2][1], R[2][2]) && R[2][0] != this.blank) {
      state = true
    } else if(c(R[0][0], R[1][0], R[2][0]) && R[0][0] != this.blank) {
      state = true
    } else if(c(R[0][1], R[1][1], R[2][1]) && R[0][1] != this.blank) {
      state = true
    } else if(c(R[0][2], R[1][2], R[2][2]) && R[0][2] != this.blank) {
      state = true
    } else if(c(R[0][0], R[1][1], R[2][2]) && R[0][0] != this.blank) {
      state = true
    } else if(c(R[2][0], R[1][1], R[0][2]) && R[0][2] != this.blank) {
      state = true
    }
    this.gameOver = state;
    return state;
  }
}
