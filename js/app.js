// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
    }
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

         if ((player.x >= this.x - 40 && player.x <= this.x + 40) && (player.y >= this.y - 60 && player.y <= this.y + 60)) {
            //alert("case "+player.x+" and this.x "+this.x);
            player.reset();
            gameEnder--;
            life.lifeChecker(gameEnder);
            //score.resetScore();
        }
        /*if (player.x >= this.x - 40 && player.x <= this.x + 40) {
            if (player.y >= this.y - 40 && player.y <= this.y + 40) {
                player.x = 200;
                player.y = 400;
            }
        }*/

        else if (this.x < 500)
            this.x = Math.round(this.x + 500 * Math.random() * dt);

        else
            this.x = -100;



        //console.log("player :"+player.x+" "+player.y)
        //console.log("enemy :" + this.x + " " + this.y)
    };
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

class Score {
    constructor(score) {
        this.score = score;
        document.getElementById("score").innerHTML = this.score;
    }
    incrementScore() {
        var currentScore = document.getElementById("score").innerHTML;
        var newScore = +currentScore + +10;
        document.getElementById("score").innerHTML = newScore;
    }
    resetScore() {
        this.score = 0;
        document.getElementById("score").innerHTML = this.score;
        console.log("current score", this.score);
    }


}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(sprite) {
        this.sprite = sprite;
        this.reset();
    }
    handleInput(movement) {
        let distanceToMove = 50;
        let maxLeft = 0;
        let maxRight = 400;
        let maxUp = 0;
        let maxDown = 400;
        switch (movement) {
            case 'left':
                if (this.x > maxLeft)
                    this.x = this.x - distanceToMove;

                break;
            case 'right':
                if (this.x < maxRight)
                    this.x = this.x + distanceToMove;
                break;
            case 'up':
                if (this.y > maxUp)
                    this.y = this.y - distanceToMove;
                else if (this.y == maxUp) {
                    //score++;
                    //document.getElementById("score").innerHTML = score;
                    player.reset();
                    score.incrementScore();
                }

                break;
            case 'down':
                if (this.y < maxDown)
                    this.y = this.y + distanceToMove;
                break;
        }
        //console.log("handle unput");
    };
    update() {
        //console.log("handle update2");

    };
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };


    reset() {
        this.x = 200;
        this.y = 400;

    }
}


class Lives {
    constructor(counter) {
        this.sprite = 'images/Heart.png';
        this.count = counter;

    }
    render(count) {
        //console.log(this.count);


        var div = document.createElement("div");
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.color = "white"
        div.setAttribute("class", "lives-wrapper");
        document.body.appendChild(div);
        this.lifeChecker(count);
    }
    lifeChecker(getGameEnder) {
        switch (true) {
            case getGameEnder == 3:
                document.getElementsByClassName("lives-wrapper")[0].innerHTML = "<span id='livesWrapper'><img src='" + this.sprite + "' /><img src='" + this.sprite + "' /><img src='" + this.sprite + "' /></span>";
                console.log("case1");
                break;
            case getGameEnder == 2:
                document.getElementsByClassName("lives-wrapper")[0].innerHTML = "<span id='livesWrapper'><img src='" + this.sprite + "' /><img src='" + this.sprite + "' /></span>";
                console.log("case1");
                break;
            case getGameEnder == 1:
                document.getElementsByClassName("lives-wrapper")[0].innerHTML = "<span id='livesWrapper'><img src='" + this.sprite + "' /></span>";
                console.log("case1");
                break;
            case getGameEnder == 0:
                //document.getElementsByClassName("lives-wrapper")[0].innerHTML = "<span id='livesWrapper'><img src='" + this.sprite + "' /></span>";
                console.log("gameover");
                //score.resetScore();
                gameEnder = 3;
                life.render(gameEnder);
                document.getElementsByClassName("game-over-layer")[0].style.display = "block"
                break;
            /*default:
            //div.innerHTML ="<span id='livesWrapper'><img src='"+this.sprite+"' /><img src='"+this.sprite+"' /><img src='"+this.sprite+"' /></span>";
            alert("gameover");
            break;*/
        }
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//initiate game with lives,score and lives
var gameEnder = 3;
var score = new Score(0);
//score.resetScore();
//initiate lives
var life = new Lives(gameEnder);
life.render(gameEnder);

//restart game
function restartGame() {
    document.getElementsByClassName("game-over-layer")[0].style.display = "none";
    gameEnder = 3;
    score.resetScore();

}
//document.getElementById("lives").innerHTML = score;
//player
var player = new Player('images/char-boy.png');
//player.reset();

//enemies objects
var enemy1 = new Enemy(0, 150);
var enemy2 = new Enemy(0, 200);
var enemy3 = new Enemy(0, 250);
var enemy4 = new Enemy(0, 50);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
