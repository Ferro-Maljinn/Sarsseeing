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
let sarsHeight = 90;
let sarsWidth = 66;
let sarsX = 20;
let sarsY = 500 - sarsHeight - 20;

//all object variables
//Virus
let covX = 2000;
let covY = 100;
let covLength = 100;
let covHeight = 100;
//Vaxxine
/* let vaxX = 2000;
let vaxY = 500;
let vaxLength = 100;
let vaxHeight = 100; */

//Array of virus Objects
let virusArray = [
  { x: covX, y: covY },
  /*   { x: covX - 300, y: covY + 100 },
  { x: covX + 300, y: covY + 800 },
  { x: covX - 400, y: covY + 100 },
  { x: covX, y: covY + 100 },
  { x: covX + 200, y: covY + 1000 },
  { x: covX + 100, y: covY + 300 },
  { x: covX + 200, y: covY + 50 },
  { x: covX + 500, y: covY + 40 },
  { x: covX + 900, y: covY + 10 },
  { x: covX + 200, y: covY + 100 }, */
];
//Array of vaxxine Objects
/* let vaxxineArray = [
  { x: vaxX + 9000, y: vaxY + 400 },
  { x: vaxX - 8000, y: vaxY + 100 },
  { x: vaxX + 5000, y: vaxY + 800 },
]; */

class virus {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 100;
    this.width = 100;
  }
}

//Load all images
function preload() {
  bg = loadImage("assets/starsSecondScreen.gif");
  sars = loadImage("assets/character.png");

  virusBright = loadImage("assets/collision/stateBright.png");
  virusDark = loadImage("assets/collision/stateDark.png");

  vaxxine = loadImage("assets/collision/Vax.png");

  maskClean = loadImage("assets/collision/maskClean.png");
  maskDirty = loadImage("assets/collision/maskDirty.png");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("second-screen");
}

let interval = 0;

function draw() {
  background(bg);
  interval += 1;

  //character of Sars
  image(sars, sarsX, sarsY, sarsWidth, sarsHeight);
  //random virus spawning
  if (interval % 100 == 0) {
    virusArray.push(new virus(width, random(20, windowHeight)));
  }

  //for loop for the looping of the objectArray
  for (let i = 0; i < virusArray.length; i++) {
    image(virusBright, virusArray[i].x, virusArray[i].y, covLength, covHeight);
    virusArray[i].x -= 4;

    //collision with virus
    if (
      sarsX < virusArray[i].x + covLength &&
      sarsX + sarsWidth > virusArray[i].x &&
      sarsY < virusArray[i].y + covLength &&
      sarsHeight + sarsY > virusArray[i].y
    ) {
      gameIsOver = true;
    }
    /*    if (virusArray[i].x < -500) {
      virusArray[i].x = 2000;
    } */
  }

  // function to move my char left, right, up and down
  if (keyIsPressed && key === "a" && sarsX > 0) {
    sarsX -= 10;
  } else if (keyIsPressed && key === "d" && sarsX + sarsWidth < width) {
    sarsX += 3;
  } else if (keyIsPressed && key === "w" && sarsY > 0) {
    sarsY -= 5;
  } else if (keyIsPressed && key === "s" && sarsY + sarsHeight < height) {
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
    gameIsOver = false;
  });
});
