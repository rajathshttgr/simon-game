let startGame = 0;
let level = 1;
let index = 0;
let gameStack = [];
const pickRandom = [".green", ".red", ".yellow", ".blue"];

function userInput(colorInput) {
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
  if (`.${color}` === gameStack[index]) {
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

//blink effect for button
function blinkButton(btnSelector) {
  const button = document.querySelector(btnSelector);

  button.style.boxShadow = "0 0 0 6px rgba(255, 255, 255, 0.8)";

  setTimeout(() => {
    button.style.boxShadow = "";
  }, 250);
}

//game lost and game reset
function gameLost() {
  document.querySelector("#message").innerHTML =
    "Game Over, Press Any Key to Restart";
  startGAme = 0;
  level = 1;

  document.querySelector("body").style.backgroundColor = "red";
  setTimeout(() => {
    document.querySelector("body").style.backgroundColor = "rgb(7, 10, 31)";
  }, 150);
}
