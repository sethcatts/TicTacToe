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
        this.themes = {
            "dark": "theme-dark/",
            "light": "theme-light/",
            "blue_red": "theme_blue-red/",
            "green_orange": "theme_green-orange/",
            "yellow_purple": "theme_yellow-purple/"
        }
        this.name           = name;
        this.piece          = piece;
        this.set            = this.themes.dark;
        this.themeKey       = "dark";               //Need this in order to maintain theme between games. 
                                                    //Sloppy, fix if something better comes up
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
     * @desc Get piece image path for this player
     * @returns {string} piece image path
     */
    getPieceImage() {
        return "images/" + this.set + this.piece + "_1.png"; 
    }

    /**
     * @desc Get active theme key for this player
     * @returns {string} theme key
     */
    getSet() {
        return this.themeKey;
    }
    
    /**
     * @desc Set player name
     * @param {string} name - Player name 
     */
    setName(name) {
        this.name = name;
    }

    /**
     * @desc Set piece theme for this player
     * @param {string} theme - theme key 
     */
    setSet(theme) {
        this.set = this.themes[theme];
        this.themeKey = theme;
    }
}
