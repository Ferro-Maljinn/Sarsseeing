console.log("Am I working?");

let gameIsOver = false;
let gameIsWon = false;
let score = 0;
let vaxxineScore = 0;
let maskScore = 0;
let interval = 0;
let mySound;
let isGameRunning = false;

//Lounch screen; Canvas screen; GameOver screen
let firstScreen = document.querySelector("#first-screen");
let secondScreen = document.querySelector("#second-screen");
let thirdScreen = document.querySelector("#third-screen");
let fourthScreen = document.querySelector("#fourth-screen");

//buttons
let startBtn = document.querySelector("#start-btn");
let tryAgainBtn = document.querySelector("#tryAgain-btn");
let restartBtn = document.querySelector("#restart-btn");

//character variables
let characterHeight = 75;
let characterWidth = 75;
let characterX = 20;
let characterY = 500 - characterHeight + 200;

//all object variables
//Virus
let virusX = 2000;
let virusY = 100;
let virusWidth = 70;
let virusHeight = 70;
//Vaxxine
let vaxX = 2000;
let vaxY = 500;
let vaxxineWidth = 80;
let vaxxineHeight = 70;
//Mask
let maskX = 2000;
let maskY = 700;
let maskWidth = 70;
let maskHeight = 70;

//Array of Obstacles
let virusArray = [{ x: virusX, y: virusY, i: 0 }];
let vaxxineArray = [{ x: vaxX, y: vaxY }];
let maskArray = [{ x: maskX, y: maskY }];

class virus {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.length = 100;
    this.width = 100;
  }
}

class vaxxine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class mask {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//Load all images
function preload() {
  bg = loadImage("assets/starsSecondScreen.gif");
  character = loadImage("assets/character-normal-state.png");

  virusBright = loadImage("assets/collision/stateBright.png");
  virusDark = loadImage("assets/collision/stateDark.png");

  vaxxinePic = loadImage("assets/collision/Vax.png");

  maskClean = loadImage("assets/collision/maskClean.png");
  maskDirty = loadImage("assets/collision/maskDirty.png");

  //soundFormats("mp3", "ogg");
  // mySound = loadSound("assets/doorbell");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 20);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight - 20);
  canvas.parent("second-screen");
  textAlign(CENTER);
  // Including sound
  // let cnv = createCanvas(100, 100);
  // cnv.mousePressed(canvasPressed);
  //background(220);
  //text("tap here to play", 10, 20);
}
/**
 */
function drawVictoryScreen() {
  characterX = 20;
  characterY = 500 - characterHeight - 20;
  score = 0; //left
  vaxxineScore = 0;
  maskScore = 0;
  virusArray = [{ x: virusX, y: virusY, i: 0 }];
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "none";
  fourthScreen.style.display = "flex";
  noLoop();
}

function draw() {
  if (isGameRunning) {
    if (gameIsWon) {
      drawVictoryScreen();
    } else {
      background(bg);
      interval += 1;
      // delay (in the number of drawings) between changing virus frames
      frq = 20;

      //character
      image(character, characterX, characterY, characterWidth, characterHeight);
      //random virus spawning
      if (interval % 10 == 0) {
        virusArray.push(new virus(width, random(50, windowHeight), interval));
      }
      //random vaxxine spawning
      if (interval % 1000 == 0) {
        vaxxineArray.push(new vaxxine(width, random(10, windowHeight)));
      }
      //random mask spawning
      if (interval % 600 == 0) {
        maskArray.push(new mask(width, random(10, windowHeight)));
      }

      //iterating the Array objects, display them & creating animation of the virus, with frequency(frq)
      for (let i = 0; i < virusArray.length; i++) {
        if (int(int((interval + virusArray[i].i) / frq)) % 2 == 0) {
          image(
            virusBright,
            virusArray[i].x,
            virusArray[i].y,
            virusWidth,
            virusHeight
          );
        } else {
          image(
            virusDark,
            virusArray[i].x,
            virusArray[i].y,
            virusWidth,
            virusHeight
          );
        }
      }

      for (let i = 0; i < vaxxineArray.length; i++) {
        image(
          vaxxinePic,
          vaxxineArray[i].x,
          vaxxineArray[i].y,
          vaxxineWidth,
          vaxxineHeight
        );
      }

      for (let i = 0; i < maskArray.length; i++) {
        image(maskClean, maskArray[i].x, maskArray[i].y, maskWidth, maskHeight);
      }

      /*       for (let i = 0; i < maskArray.length; i++) {
        image(
          maskDirty,
          maskArray[i].x,
          maskArray[i].y,
          maskWidth,
          maskHeight
        );
      } */

      // All collisions
      //Manhatten distance is smaller than 50,=> splice (cut out) object,=> increment Scores by one, => reset score
      for (let i = 0; i < virusArray.length; i++) {
        virusArray[i].x -= 4; //speed
        //collision with virus
        if (
          characterX < virusArray[i].x + virusWidth - 20 && //left
          characterX + characterWidth > virusArray[i].x + 20 && //Right
          characterY < virusArray[i].y - 20 + virusWidth && //Top
          characterHeight + characterY > virusArray[i].y + 10 //Bottom
        ) {
          gameIsOver = true;
        }
        if (virusArray[i].x < 0) {
          virusArray.splice(i, 1);
          score = score + 1;
          if (gameIsOver == true) {
            score = 0;
          }
        }
        /*   console.log(score); */
      }

      for (let i = 0; i < vaxxineArray.length; i++) {
        vaxxineArray[i].x -= 6;
        //collision with vaxxine
        if (
          characterX < vaxxineArray[i].x + vaxxineWidth - 20 && //left
          characterX + characterWidth > vaxxineArray[i].x + 20 && //Right
          characterY < vaxxineArray[i].y - 20 + vaxxineWidth && //Top
          characterHeight + characterY > vaxxineArray[i].y + 20 //Bottom
        ) {
          vaxxineArray.splice(i, 1);
          vaxxineScore = vaxxineScore + 1;
          if (vaxxineScore == 1) {
            gameIsWon = true;
            //mySound.play();
          }
        }
        /*   console.log(vaxxineScore); */
      }

      for (let i = 0; i < maskArray.length; i++) {
        maskArray[i].x -= 6;
        //collision with maskArray
        if (
          characterX < maskArray[i].x + maskWidth - 20 && //left
          characterX + characterWidth > maskArray[i].x + 20 && //Right
          characterY < maskArray[i].y - 20 + maskWidth && //Top
          characterHeight + characterY > maskArray[i].y + 20 //Bottom
        ) {
          //increment maskScore by one
          maskArray.splice(i, 1);
          maskScore = maskScore + 1;
          if (maskScore == 20) {
            // Needs to change to = Virus intervall to be decreased
            gameIsWon = true;
          }
        }
      }

      // function to move my char left, right, up and down
      if (keyIsPressed && keyIsDown(LEFT_ARROW) && characterX > 0) {
        characterX -= 10;
      }
      if (
        keyIsPressed &&
        keyIsDown(RIGHT_ARROW) &&
        characterX + characterWidth < width
      ) {
        characterX += 3;
      }
      if (keyIsPressed && keyIsDown(UP_ARROW) && characterY > 0) {
        characterY -= 5;
      }
      if (
        keyIsPressed &&
        keyIsDown(DOWN_ARROW) &&
        characterY + characterHeight < height
      ) {
        characterY += 5;
      }
      if (gameIsOver) {
        gameOver();
      }
      // status bar
      fill(176, 196, 222);
      rect(0, 0, windowWidth, 140);

      virusBright.resize(50, 50);
      image(virusBright, 40, 60);

      vaxxinePic.resize(70, 70);
      image(vaxxinePic, 500, 50);

      maskClean.resize(50, 50);
      image(maskClean, 850, 60);

      fill(255, 204, 0);
      textStyle(BOLD);
      textSize(40);
      let vaxxineScoreAndVaxxineTotal = "" + vaxxineScore.toString() + " / 10";
      text(vaxxineScoreAndVaxxineTotal, 640, 100);
      let maskScoreAndMaskTotal = "" + maskScore.toString() + " / 20";
      text(maskScoreAndMaskTotal, 980, 100);
      text("Score: " + score.toString(), 200, 100);
      textStyle(NORMAL);
    }
  }
}

//Stop draw function to reset objects + display game-over screen
function gameOver() {
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "flex";
  fourthScreen.style.display = "none";
  characterX = 20;
  characterY = 500 - characterHeight - 20;
  score = 0; //left
  vaxxineScore = 0;
  maskScore = 0;
  virusArray = [{ x: virusX, y: virusY, i: 0 }];
  isGameRunning = false;
  noLoop();
}

//Showing the first screen
window.addEventListener("load", () => {
  secondScreen.style.display = "none";
  thirdScreen.style.display = "none";
  fourthScreen.style.display = "none";
  noLoop();

  //listener on start button; link to game-canvas
  startBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    fourthScreen.style.display = "none";
    isGameRunning = true;
    loop();
  });

  //listener on tryAgain button; link to game-canvas
  tryAgainBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    fourthScreen.style.display = "none";
    gameIsOver = false;
    isGameRunning = true;
    gameIsWon = false;
    loop();
  });

  //listener on re-start button; link to game-canvas
  restartBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    fourthScreen.style.display = "none";
    gameIsOver = false;
    gameIsWon = false;
    isGameRunning = true;
    loop();
  });

  //Start the game again
  virusArray = [
    { x: virusX, y: virusY },
    { x: virusX + 800, y: virusY + 200 },
    { x: virusX + 1400, y: virusY + 400 },
  ];
  loop();
});

//to simulate that the game is over
tryAgainBtn.addEventListener("click", () => {
  gameIsOver = false;
});
