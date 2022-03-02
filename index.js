console.log("Am I working?");

let gameIsOver = false;
let score = 0;
let interval = 0;

//Lounch screen; Canvas screen; GameOver screen
let firstScreen = document.querySelector("#first-screen");
let secondScreen = document.querySelector("#second-screen");
let thirdScreen = document.querySelector("#third-screen");

//buttons
let startBtn = document.querySelector("#start-btn");
let restartBtn = document.querySelector("#restart-btn");

//character variables
let sarsHeight = 100;
let sarsWidth = 90;
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
let virusArray = [{ x: covX, y: covY, i: 0 }];

class virus {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
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
  textAlign(CENTER);
}

function draw() {
  background(bg);
  interval += 1;
  // delay (in the number of drawings) between changing virus' frames
  frq = 20;

  //character of Sars
  image(sars, sarsX, sarsY, sarsWidth, sarsHeight);
  //random virus spawning
  if (interval % 100 == 0) {
    virusArray.push(new virus(width, random(20, windowHeight), interval));
  }

  //for loop for the looping of the objectArray
  for (let i = 0; i < virusArray.length; i++) {
    if (int(int((interval + virusArray[i].i) / frq)) % 2 == 0) {
      image(
        virusBright,
        virusArray[i].x,
        virusArray[i].y,
        covLength,
        covHeight
      );
    } else {
      image(virusDark, virusArray[i].x, virusArray[i].y, covLength, covHeight);
    }
  }

  for (let i = 0; i < virusArray.length; i++) {
    virusArray[i].x -= 4;

    //collision with virus
    if (
      sarsX < virusArray[i].x + covLength - 50 && //left
      sarsX + sarsWidth > virusArray[i].x + 50 && //Right
      sarsY < virusArray[i].y - 50 + covLength && //Top
      sarsHeight + sarsY > virusArray[i].y + 50 //Bottom
    ) {
      gameIsOver = true;
    }
    /*    if (virusArray[i].x < -500) {
      virusArray[i].x = 2000;
    } */
    if (virusArray[i].x < 0) {
      virusArray.splice(i, 1);
      score = score + 1;
      if (gameIsOver == true) {
        score = 0;
      }
    }
    console.log(score);
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
  // status bar
  fill(255, 204, 0);
  textSize(64);
  text("Score:", 200, 100);
  text(score, 350, 100);
}

//Stop draw function to reset objects + display game-over screen
function gameOver() {
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "flex";
  sarsX = 20;
  sarsY = 500 - sarsHeight - 20;
  score = 0; //left
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
