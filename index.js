console.log("Am I working?");


let gameIsOver = false;

//Lounch screen; Canvas screen; GameOver screen
let firstScreen = document.querySelector("#first-screen");
let secondScreen = document.querySelector("#second-screen");
let thirdScreen = document.querySelector("#third-screen");

//buttons
let startBtn = document.querySelector("#start-btn");
let restartBtn = document.querySelector("#restart-btn");

//character variables
let sarsHeight = 150;
let sarsWidth = 150;
let sarsX = 20;
let sarsY = 700 - sarsHeight - 20;

//all object variables
let covX = 1000;
let covY = 500;
let covLength = 100;
let covHeight = 100;

//Array of Objects
let virusArray = [
  { x: covX, y: covY },
  { x: covX - 300, y: covY + 100 },
  { x: covX + 300, y: covY + 800 },
  { x: covX - 400, y: covY + 100 },
  { x: covX , y: covY + 100 },
  { x: covX + 200, y: covY + 1000 },
  { x: covX + 200, y: covY + 100 },
  { x: covX + 200, y: covY + 100 },
  { x: covX + 200, y: covY + 100 },
  { x: covX + 200, y: covY + 100 },
  { x: covX + 200, y: covY + 100 },
];

//Load all images
function preload() {
  bg = loadImage("./assets/stars-moving");
  sars = loadImage("/Assets/Character.png");
  virusBright = loadImage("/Assets/State=bright.png");
  virusDark = loadImage("/Assets/State=dark.png");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('second-screen')
}
function draw() {
  background(bg);

  //character of Sars
  image(sars, sarsX, sarsY, sarsWidth, sarsHeight);

  //for loop for the looping of the objectArray
  for (let i = 0; i < virusArray.length; i++) {
    image(
      virusBright,
      virusArray[i].x,
      virusArray[i].y,
      covLength,
      covHeight
    );
    virusArray[i].x -= 4;

    //collision with virus
    if (
      sarsY >= virusArray[i].y + 20 &&
      sarsY <= virusArray[i].y + covHeight - 40 &&
      sarsX + sarsWidth >= virusArray[i].x &&
      sarsX <= virusArray[i].x + covLength
    ) {
      gameIsOver = true;
    }
    if (virusArray[i].x < -500) {
      virusArray[i].x = 2000;
    }
  }

  // function to move my char left, right, up and down
  if (keyIsPressed && key === 'a' && sarsX > 0) {
    sarsX -= 5;
  }
  else if (keyIsPressed && key === 'd' && sarsX + sarsWidth < width) {
    sarsX += 5;
  }
  else if (keyIsPressed && key === 'w' && sarsY > 0) {
    sarsY -= 5;
  }
  else if (keyIsPressed && key === 's' && sarsY + sarsHeight < height) {
    sarsY += 5;
  }
  if (gameIsOver) {
    gameOver();
  }
}

//Stop draw function to reset objects + display game-over screen
function gameOver() {
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "flex";
  noLoop();
}

//Showing the first screen
window.addEventListener("load", () => {
  secondScreen.style.display = "none";
  thirdScreen.style.display = "none";
  noLoop();

  //listener on start button; link to game-canvas
  startBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    loop();
  });

  //listener on re-start button; link to game-canvas
  restartBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    gameIsOver = false;

    //Start the game again
    virusArray = [
      { x: covX, y: covY },
      { x: covX + 800, y: covY + 200 },
      { x: covX + 1400, y: covY + 400 },
    ];
    loop();
  });

  //to simulate that the game is over
  restartBtn.addEventListener("click", () => {
    gameIsOver = true;
  });
});
