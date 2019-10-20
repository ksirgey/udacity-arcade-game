// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = 70;
    this.width = 100;
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
    //this.speed = 600 + Math.floor(Math.random() * 100);
    this.x += 10 + (this.speed * dt);
    if (this.x > 505) {
      this.x = -100 * (Math.floor(Math.random() * 10) + 1);
      this.speed = 200 + (Math.floor(Math.random() * 250));
    }

    if (player.x < this.x + 70 &&
        player.x + 70 > this.x &&
        player.y < this.y + 40 &&
        player.y + 40 > this.y) {
          player.x = 202;
          player.y = 400;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.height = 80;
  this.width = 70;
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {

};

Player.prototype.handleInput = function(direction) {
  let width = 101;
  let height = 83;

  if (direction === 'left' && this.x - width >= 0) {
    this.x -= 101;
  } else if (direction === 'right' && this.x + width < 505) {
    this.x += 101;
  } else if (direction === 'up' && this.y >= 0) {
    this.y -= 83;
  } else if (direction === 'down' && this.y + height < 415) {
    this.y += 83;
  }
  if (this.y < 0) {
    setTimeout(function () {
      this.x = 202;
      this.y = 400;
    }, 1100),
    gameEnds();
  }
}

const enemyPositions = [59, 142, 225];
// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
const allEnemies = enemyPositions.map((y) => {
  return new Enemy(-150, y, 100);
});
// Place the player object in a variable called player
const player = new Player(202, 400, 'images/char-horn-girl.png');

function gameEnds() {
  modalPage();
}

function modalPage() {
  const modal = document.querySelector('.modal');
  setTimeout(function () {
    modal.classList.toggle('removed');
  }, 100),
  setTimeout(function () {
    modal.classList.toggle('removed');
  }, 1100)
}


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
