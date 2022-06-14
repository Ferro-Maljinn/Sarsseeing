console.log("Am I working? Check, Connect, Neck Attack");

//Defined Game status
let gameIsOver = false;
let gameIsWon = false;
let gameIsRunning = false;

//The intervall manipulates the spawning of an obstacles and the virus animation
let interval = 0;

//Load Screens: Landing Page; Game Screen; Victory Screen; GameOver screen
let splashScreen = document.querySelector("#first-screen");
let playScreen = document.querySelector("#second-screen");
let gameOverScreen = document.querySelector("#third-screen");
let victoryScreen = document.querySelector("#fourth-screen");

//Load buttons
let startBtn = document.querySelector("#start-btn");
let tryAgainBtn = document.querySelector("#tryAgain-btn");
let restartBtn = document.querySelector("#restart-btn");

let scoreElement = document.querySelector("#score");
let score = 0;
let vaxxineScore = 0;

//Load sound effects
let soundBackground = new Audio("sounds/background.mp3");
soundBackground.volume = 1;
let soundVaxxine = new Audio("sounds/vaxxine.mp3");
soundVaxxine.volume = 1;
let soundVirus = new Audio("sounds/virus.mp3");
soundVaxxine.volume = 1;

let bg;
let mask0;
let mask1;
let mask2;
let mask3;
let mask4;
let mask5;
let maskArray;

//Define all variables of game obstacles
//character
let characterHeight = 65;
let characterWidth = 65;
let characterX = 20;
let characterY = 500 - characterHeight + 200;
//Virus
let virusX = 2000;
let virusY = 100;
let virusWidth = 55;
let virusHeight = 55;
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

let soundBerghain;
let soundKitKat;
let soundTresor;
let soundWildeRenate;
let soundWatergate;
let soundSisyphos;

//created an array for each object
let virusArray = [{ x: virusX, y: virusY, sound: soundVirus, i: 0 }];
let vaxxineArray = [{ x: vaxX, y: vaxY, sound: soundVaxxine }];
//Defined all constructors
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
  // Load background Gif
  bg = loadImage("assets/ezgif.com-gif-maker.gif");

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
  /* let virusArray = [{ x: virusX, y: virusY, i: 0 }];
  let vaxxineArray = [{ x: vaxX, y: vaxY }]; */

  soundBerghain = new Audio("sounds/");
  soundBerghain.volume = 1;
  soundKitKat = new Audio("sounds/kitkat.mp3");
  soundKitKat.volume = 1;
  soundTresor = new Audio("sounds/tresor.mp3");
  soundTresor.volume = 1;
  soundSisyphos = new Audio("sounds/sisyphos.mp3");
  soundSisyphos.volume = 1;
  soundWildeRenate = new Audio("sounds/wilderenate.mp3");
  soundWildeRenate.volume = 1;
  soundWatergate = new Audio("sounds/watergate.mp3");
  soundWatergate.volume = 1;

  maskArray = [
    {
      x: maskX + 3000,
      y: maskY + 60,
      img: mask0,
      sound: soundBerghain,
      name: "Berghain",
    },
    {
      x: maskX + 2450,
      y: maskY + 95,
      img: mask1,
      sound: soundKitKat,
      name: "Kitkat",
    },
    {
      x: maskX + 9000,
      y: maskY + 80,
      img: mask2,
      sound: soundSisyphos,
      name: "Sisyphos",
    },
    {
      x: maskX + 200,
      y: maskY + 30,
      img: mask3,
      sound: soundTresor,
      name: "Tresor",
    },
    {
      x: maskX + 700,
      y: maskY + 10,
      img: mask4,
      sound: soundWildeRenate,
      name: "WildeRenate",
    },
    {
      x: maskX + 5000,
      y: maskY,
      img: mask5,
      sound: soundWatergate,
      name: "Watergate",
    },
  ];
}

function drawVictoryScreen() {
  characterX = 20;
  characterY = 500 - characterHeight - 20;
  score = 0; //left
  vaxxineScore = 0;
  virusArray = [{ x: virusX, y: virusY, i: 0 }];
  splashScreen.style.display = "none";
  playScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  victoryScreen.style.display = "flex";
  noLoop();
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
      image(char0, characterX, characterY, characterWidth, characterHeight);

      //spawns all objects: virus; vaxxines; masks
      //random virus spawning
      if (interval % 12 == 0) {
        virusArray.push(new virus(width, random(50, windowHeight), interval));
      }
      //random vaxxine spawning
      if (interval % 1000 == 0) {
        vaxxineArray.push(new vaxxine(width, random(10, windowHeight)));
      }
      //random mask spawning
      /* if (interval % 600 == 0) {
        maskArray.push(new mask(width, random(10, windowHeight)));
      } */

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

      //Loop over each array of objects
      // All collisions
      //Manhatten distance is smaller than 50,=> splice (cut out) object,=> increment Scores by one, => reset score
      for (let i = 0; i < virusArray.length; i++) {
        virusArray[i].x -= 4; //speed
        // Score increases
        if (virusX + virusWidth <= characterX) {
          score += 1;
          scoreElement;
        }
        //collision with virus
        if (
          characterX < virusArray[i].x + virusWidth - 20 && //left
          characterX + characterWidth > virusArray[i].x + 20 && //Right
          characterY < virusArray[i].y - 20 + virusWidth && //Top
          characterHeight + characterY > virusArray[i].y + 10 //Bottom
        ) {
          console.log('is game over?')
          gameIsOver = true;
          soundBackground.pause();
          soundBerghain.pause();
          soundKitKat.pause();
          soundTresor.pause();
          soundSisyphos.pause();
          soundWatergate.pause();
          soundVirus.pause();
        }
        if (virusArray[i].x < 0) {
          virusArray.splice(i, 1);
          score = score + 1;
          //print players score if game is over NOTE: write a conditional if player scored 0!!!! Reset the score on gameOver Screen without having to reload browser!!!
          scoreElement.innerText = score;
          if (gameIsOver == true) {
            score = 0;
          }
        }
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
          soundVaxxine.play();
          /* setTimeout(() => {
            //to replay then the background music
            soundBackground.play();
          }, 1000);
          soundBackground.play(); */

          vaxxineArray.splice(i, 1);
          vaxxineScore = vaxxineScore + 1;
          if (vaxxineScore == 10) {
            gameIsWon = true;
            vaxxineScore = 0;
          }
        }
      }
      for (let i = 0; i < maskArray.length; i++) {
        image(maskArray[i].img, maskArray[i].x, maskArray[i].y, 64, 60);
        maskArray[i].x -= 5;

        if (
          characterX < maskArray[i].x + 100 - 20 && //left
          characterX + characterWidth > maskArray[i].x + 20 && //Right
          characterY < maskArray[i].y - 20 + 100 && //Top
          100 + characterY > maskArray[i].y + 20 //Bottom
        ) {
          maskArray[i].x = 15000;
          // Check name of maskArray.name and play, backgroundmusik = stop on masks related to the clubs
          if (maskArray[i].name == "Berghain") {
            soundBackground.pause();
            maskArray[i].sound.play();
            setTimeout(() => {
              //to replay then the background music
              soundBackground.play();
            }, 78000);
          }
          if (maskArray[i].name == "Kitkat") {
            soundBackground.pause();
            maskArray[i].sound.play();
            setTimeout(() => {
              //to replay then the background music
              soundBackground.play();
            }, 1000);
          }
          if (maskArray[i].name == "Tresor") {
            soundBackground.pause();
            maskArray[i].sound.play();
            setTimeout(() => {
              //to replay then the background music
              soundBackground.play();
            }, 27000);
          }
          if (maskArray[i].name == "Sisyphos") {
            soundBackground.pause();
            maskArray[i].sound.play();
            setTimeout(() => {
              //to replay then the background music
              soundBackground.play();
            }, 10000);
          }
          if (maskArray[i].name == "WildeRenate") {
            soundBackground.pause();
            maskArray[i].sound.play();
            setTimeout(() => {
              //to replay then the background music
              soundBackground.play();
            }, 1000);
          }
          if (maskArray[i].name == "Watergate") {
            soundBackground.pause();
            maskArray[i].sound.play();
            setTimeout(() => {
              //to replay then the background music
              soundBackground.play();
            }, 16000);
          }
        }
        //Eliminate mask if player collides with it and print itback again
        if (maskArray[i].x < -200) {
          maskArray[i].x = 10000;
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
      let colorScore = color("rgba(101, 153, 255, 0.58)");
      fill(colorScore);
      rect(0, 0, windowWidth, 140);

      virusBright.resize(50, 50);
      image(virusBright, 40, 60);

      vaxxinePic.resize(70, 70);
      image(vaxxinePic, 500, 50);

      fill(255, 204, 0);
      textStyle(BOLD);
      textSize(40);
      let vaxxineScoreAndVaxxineTotal = "" + vaxxineScore.toString() + " / 10";
      text(vaxxineScoreAndVaxxineTotal, 640, 100);
      text("Score: " + score.toString(), 200, 100);
      textStyle(NORMAL);
    }
  }
}

//Stop draw function to reset objects + display game-over screen

function gameOver() {
  splashScreen.style.display = "none";
  playScreen.style.display = "none";
  gameOverScreen.style.display = "flex";
  victoryScreen.style.display = "none";
  characterX = 20;
  characterY = 500 - characterHeight - 20;
  vaxxineScore = 0;
  virusArray = [{ x: virusX, y: virusY, i: 0 }];
  gameIsRunning = false;
  soundBackground.pause();
  /* maskArray.sound.pause(); */ //Doesnt work!
  scoreElement.innerText = `${score}`;
  noLoop();
}

//Showing the first screen
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
    soundBackground.play();
    gameIsRunning = true;
    loop();
  });

  //listener on tryAgain button; link to game-canvas
  tryAgainBtn.addEventListener("click", () => {
    splashScreen.style.display = "none";
    playScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    victoryScreen.style.display = "none";
    score = 0;
    gameIsOver = false;
    gameIsRunning = true;
    gameIsWon = false;
    soundBackground.play();
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
    soundBackground.play();
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
