"use strict";

// BOARD values to determine objects moves and position
// width, height, numRows, numCols refer to values from engine.js
const BOARD = {
    width : 505,
    height : 606,
    numRows : 6,
    numCols : 5,
    dx : 101,
    dy : 83,
    playerStartPosition: {
        x : 202,
        y : 404,
    },
    Boundary : { // inclusive values
        left : 0,
        right : 404,
        up : 404-83*5,
        down : 404,
    },
}
Object.seal(BOARD);

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.currentPosition = BOARD.playerStartPosition;
        this.pressedKey = null;
        this.halfWidth = 30;
    }

    getX() {
        return this.currentPosition.x;
    }

    getY() {
        return this.currentPosition.y;
    }

    getHalfWidth() {
        return this.halfWidth;
    }
    
    // update player's position inside the board.
    update() {
        if (this.currentPosition.y === 404-83*5) {
            window.alert("you won!! press ok if you want to play again!");
            this.resetPlayer();
        }
        switch(this.pressedKey) {
            case null:
                // no input. don't do anything. 
                break;
            case "left":
                // move left if player is not in the left boundary
                if (this.currentPosition.x !== BOARD.Boundary.left) {
                    this.currentPosition.x -= BOARD.dx;
                } 
                break;
            case "up":
                // move up if player is not in the upper boundary
                if (this.currentPosition.y !== BOARD.Boundary.up) {
                    this.currentPosition.y -= BOARD.dy;
                }
                break;
            case "right":
                // move right if player is not in the right boundary
                if (this.currentPosition.x !== BOARD.Boundary.right) {
                    this.currentPosition.x += BOARD.dx;
                }
                break;
            case "down":
                // move down if player is not in the down boundary
                if (this.currentPosition.y !== BOARD.Boundary.down) {
                    this.currentPosition.y += BOARD.dy;
                }
                break;
        }

        this.pressedKey = null;
    }

    resetPlayer() {
        this.currentPosition.x = 202;
        this.currentPosition.y = 404;
        this.render();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.currentPosition.x, this.currentPosition.y);
    }

    handleInput(keyInput) {
        this.pressedKey = keyInput;
    }
    
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
