let startGame = 0;
let level = 1;
let index = 0;
let gameStack = [];
const pickRandom = ["green", "red", "yellow", "blue"];

const gameOverSound = new Audio("soundEffect/game-over.wav");
gameOverSound.preload = "auto";

const userClickSound = new Audio("soundEffect/user-click.wav");
userClickSound.preload = "auto";

function userInput(colorInput) {
  userClickSound.play();
  if (startGame === 0) {
    startLevel();
    return;
  }
  verifyInput(colorInput);
}

// Starts a new level
function startLevel() {
  document.querySelector("#message").innerHTML = `Level ${level}`;
  addRandomColor();
  startGame = 1;
}

// Adds a random color to the game sequence
function addRandomColor() {
  const randomColor = pickRandom[Math.floor(Math.random() * pickRandom.length)];
  gameStack.push(randomColor);
  blinkButton(randomColor);
}

// Verifies user input against the game sequence
function verifyInput(color) {
  if (color === gameStack[index]) {
    index++;
    if (index === gameStack.length) {
      level++;
      index = 0;
      document.querySelector("#message").innerHTML = `Level ${level}`;
      setTimeout(addRandomColor, 1000);
    }
  } else {
    gameLost();
    resetGame();
  }
}

// Reset the game state
function resetGame() {
  startGame = 0;
  level = 1;
  index = 0;
  gameStack = [];
}

// Blink effect for button
function blinkButton(color) {
  const button = document.getElementById(color);

  button.style.boxShadow = "0 0 0 6px rgba(255, 255, 255, 0.8)";
  setTimeout(() => {
    button.style.boxShadow = "";
  }, 250);
}

// Game lost and game reset
function gameLost() {
  //Sound effect game over
  gameOverSound.play();
  document.querySelector("#message").innerHTML =
    "Game Over, Press Any Key to Restart";
  document.body.style.backgroundColor = "red";
  setTimeout(() => {
    document.body.style.backgroundColor = "rgb(7, 10, 31)";
  }, 150);
}
