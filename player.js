/**
 * @class Player
 */
class Player {
    /**
     * @constructor
     * @desc Player constructor
     * @param {string} name - player name
     * @param {char} piece - (x or o) 
     * @param {string} color - color
     */
    constructor(name, piece) {
        this.name           = name;
        this.piece          = piece;             
    }

    /**
     * @desc Get name
     * @returns {string} - object's name property
     */
    getName() {
        return this.name;
    }

    /**
     * @desc Get player piece
     * @returns {char} - object piece 
     */
    getPiece() {
        return this.piece;
    }
    
    /**
     * @desc Set player name
     * @param {string} name - Player name 
     */
    setName(name) {
        this.name = name;
    }
}

//module.exports = Player;