console.log("Am I working? Check, Connect, Neck Attack");

//Defined Game status
let gameIsOver = false;
let gameIsWon = false;
let gameIsRunning = false;

//The intervall manipulates the spawning of an obstacles and the virus animation
let interval = 0;

//Load Screens: Landing Page; Game Screen; Victory Screen; GameOver screen
let splashScreen = document.querySelector("#splash-screen");
let playScreen = document.querySelector("#play-screen");
let gameOverScreen = document.querySelector("#game-over-screen");
let victoryScreen = document.querySelector("#victory-screen");

//Load buttons
let startBtn = document.querySelector("#start-btn");
let tryAgainBtn = document.querySelector("#tryAgain-btn");
let restartBtn = document.querySelector("#restart-btn");


//Load all images
function preload() {
  // Load background Gif
  bg = loadImage("assets/starsSecondScreen.gif");

  // Load all forms of the characters
  char0 = loadImage("assets/character/char0.png");
  char1 = loadImage("assets/character/char1.png");
  char2 = loadImage("assets/character/char2.png");
  char3 = loadImage("assets/character/char3.png");
  char4 = loadImage("assets/character/char4.png");
  char5 = loadImage("assets/character/char5.png");
  char6 = loadImage("assets/character/char6.png");

  // Load all collission objects
  virusBright = loadImage("assets/collision/stateBright.png");
  virusDark = loadImage("assets/collision/stateDark.png");
  vaxxinePic = loadImage("assets/collision/Vax.png");
  maskClean = loadImage("assets/collision/maskClean.png");
  mask0 = loadImage("assets/collision/all-masks/mask0.png");
  mask1 = loadImage("assets/collision/all-masks/mask1.png");
  mask2 = loadImage("assets/collision/all-masks/mask2.png");
  mask3 = loadImage("assets/collision/all-masks/mask3.png");
  mask4 = loadImage("assets/collision/all-masks/mask4.png");
  mask5 = loadImage("assets/collision/all-masks/mask5.png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 20);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight - 20);
  image(bg, 50, 0);
  /* tint(0, 153, 204, 126); */ // Apply transparency without changing color ==> Needs to change (apply only on background) ==> (Maybe a debuff for Tresor Mask?)
  canvas.parent("play-screen");
  textAlign(CENTER);
}

function draw() {
  //variable 'gameIsRunning' starts as false ( file: scetch.js - line: 6)
  if (gameIsRunning) {
    if (gameIsWon) {
      drawVictoryScreen();
    } else {
      background(bg, 255);

      interval += 1;
      //'frq' delay (in the number of drawings) between virus animation
      frq = 20;

      //Display the character, defined movement (file: character.js)
      drawCharacter();
      characterMovement();

      //spawns all objects: virus; vaxxines; masks (file: spawnObjects.js)
      spawnObjects();

      //Loop over each array of objects + create virus animation (file: obstacles.js)
      loopArraysOfAllObstacles();
      // All collisions (file: obstacles.js)
      virusCollision();
      vaxxineCollision();
      maskCollision();

      // displays the status bar with the score information (file: scoreBar.js)
      scoreBar();

      //calls the function gameOver if the player lost (/collides with a virus)
      if (gameIsOver) {
        gameOver();
      }
    }
  }
}

//Showing the Splash-Screen
window.addEventListener("load", () => {
  playScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  victoryScreen.style.display = "none";
  noLoop();

  //listener on start button; link to game-canvas
  startBtn.addEventListener("click", () => {
    splashScreen.style.display = "none";
    playScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    victoryScreen.style.display = "none";
    gameIsRunning = true;
    loop();
  });

  //listener on tryAgain button; link to game-canvas
  tryAgainBtn.addEventListener("click", () => {
    splashScreen.style.display = "none";
    playScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    victoryScreen.style.display = "none";
    gameIsOver = false;
    gameIsRunning = true;
    gameIsWon = false;
    loop();
  });

  //listener on re-start button; link to game-canvas
  restartBtn.addEventListener("click", () => {
    splashScreen.style.display = "none";
    playScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    victoryScreen.style.display = "none";
    gameIsOver = false;
    gameIsWon = false;
    gameIsRunning = true;
    loop();
  });

  //reset the stats
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