console.log("Am I working? Check, Connect, Neck Attack");

// Defined Game status
let gameIsOver = false;
let gameIsWon = false;
let gameIsRunning = false;

// The intervall manipulates the spawning of an obstacles and the virus animation
let interval = 0;

// Load Screens: Landing Page; Game Screen; GameOver screen
let splashScreen = document.querySelector("#splash-screen");
let playScreen = document.querySelector("#play-screen");
let gameOverScreen = document.querySelector("#gameover-screen");

// Load buttons
let startBtn = document.querySelector("#start-btn");
let tryAgainBtn = document.querySelector("#tryAgain-btn");

// Variables for the score
let scoreElement = document.querySelector("#score");
let score = 0;
const maxLife = 3;
let vaxxineScore = maxLife;

const randomMax = 10000;

// Variables for the mask images
let bg;
let mask0;
let mask1;
let mask2;
let mask3;
let mask4;
let mask5;
let maskArray;

// Define all variables of game obstacles
// character
let characterHeight = 65;
let characterWidth = 65;
let characterX = 20;
let characterY = 500 - characterHeight + 200;
// Virus
let virusX = 2000;
let virusY = 100;
let virusWidth = 55;
let virusHeight = 55;
// Vaxxine
let vaxX = 2000;
let vaxY = 500;
let vaxxineWidth = 80;
let vaxxineHeight = 70;
// Mask
let maskX = 2000;
let maskY = 0;
let maskWidth = 70;
let maskHeight = 70;

// Audios & sound effects
const soundBerghain = new Audio("sounds/berghain.mp3");
const soundKitKat = new Audio("sounds/kitkat.mp3");
const soundTresor = new Audio("sounds/tresor.mp3");
const soundSisyphos = new Audio("sounds/sisyphos.mp3");
const soundWildeRenate = new Audio("sounds/wilderenate.mp3");
const soundWatergate = new Audio("sounds/watergate.mp3");
const soundBackground = new Audio("sounds/background.mp3");
const soundVaxxine = new Audio("sounds/vaxxine.mp3");
const soundVirus = new Audio("sounds/virus.mp3");

// created an array for each object
let virusArray = [{ x: virusX, y: virusY, sound: soundVirus, i: 0 }];
let vaxxineArray = [{ x: vaxX, y: vaxY, sound: soundVaxxine }];

// collects timeouts
let timeouts = [];

// Defined all constructors
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
    this.length = 100;
    this.width = 100;
  }
}

class mask {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 100;
    this.width = 100;
  }
}

// Load all images
function preload() {
  // Load background Gif
  bg = loadImage("assets/ezgif.com-gif-maker.gif");

  // Load all forms of the characters
  char0 = loadImage("assets/character/char0.png");

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

// Stops all the sounds and calls clear all timeouts
function pauseSounds() {
  clearTimeouts()
  soundBackground.pause();
  soundBerghain.pause();
  soundKitKat.pause();
  soundTresor.pause();
  soundSisyphos.pause();
  soundWatergate.pause();
  soundWildeRenate.pause();
}

// Generates a random number
function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}


// clears all the timeouts
function clearTimeouts() {
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  //quick reset of the timer array that has been cleared
  timeouts = [];
}

function setup() {
  // Creates canvas
  const canvas = createCanvas(windowWidth, windowHeight - 20);
  const wHeight = canvas.height - 20;

  image(bg, 50, 0);
  // tint(0, 153, 204, 126); */ // Apply transparency without changing color
  //  ==> Needs to change (apply only on background) ==> (Maybe a debuff for Tresor Mask?)
  canvas.parent("play-screen");
  textAlign(CENTER);

  maskArray = [
    {
      x: getRandomNum(randomMax),
      y: getRandomNum(wHeight),
      img: mask0,
      sound: soundBerghain,
      name: "Berghain",
    },
    {
      x: getRandomNum(randomMax),
      y: getRandomNum(wHeight),
      img: mask1,
      sound: soundKitKat,
      name: "Kitkat",
    },
    {
      x: getRandomNum(randomMax),
      y: getRandomNum(wHeight),
      img: mask2,
      sound: soundSisyphos,
      name: "Sisyphos",
    },
    {
      x: getRandomNum(randomMax),
      y: getRandomNum(wHeight),
      img: mask3,
      sound: soundTresor,
      name: "Tresor",
    },
    {
      x: getRandomNum(10000),
      y: getRandomNum(wHeight),
      img: mask4,
      sound: soundWildeRenate,
      name: "WildeRenate",
    },
    {
      x: getRandomNum(randomMax),
      y: getRandomNum(wHeight),
      img: mask5,
      sound: soundWatergate,
      name: "Watergate",
    },
  ];
}

function draw() {
  // variable 'gameIsRunning' starts as false ( file: scetch.js - line: 6)
  if (gameIsRunning) {
    background(bg, 255);
    interval += 1;
    /* console.log("Interval is counting", interval); */
    //'frq' delay (in the number of drawings) between virus animation
    frq = 20;

    // Display the character, defined movement
    image(char0, characterX, characterY, characterWidth, characterHeight);

    // spawns all objects: virus; vaxxines; masks
    // random virus spawning
    if (interval % 9 == 0) {
      virusArray.push(new virus(width, random(50, windowHeight), interval));
    }
    // random vaxxine spawning
    if (interval % 1000 == 0) {
      vaxxineArray.push(new vaxxine(width, random(10, windowHeight)));
    }

    // iterating the Array objects, display them &
    // creating animation of the virus, with frequency(frq)
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

    // Loop over each array of objects
    // All collisions
    // Manhatten distance is smaller than 50,=> splice (cut out) object,
    // => increment Scores by one, => reset score
    for (let i = 0; i < virusArray.length; i++) {
      virusArray[i].x -= 4; //speed
      // Score increases
      if (virusX + virusWidth <= characterX) {
        score += 1;
      }
      // collision with virus
      if (
        characterX < virusArray[i].x + virusWidth - 20 && //left
        characterX + characterWidth > virusArray[i].x + 20 && //Right
        characterY < virusArray[i].y - 20 + virusWidth && //Top
        characterHeight + characterY > virusArray[i].y + 10 //Bottom
      ) {
        // If character collides with virus cut out virus obstacle imediately
        virusArray.splice(i, 1);
        vaxxineScore -= 1;
        if (vaxxineScore == 0) {
          gameIsOver = true;
        }
        soundVirus.play();
      }
      if (virusArray[i].x < 0) {
        virusArray.splice(i, 1);
        score += 1;
        //print players score if game is over NOTE: write a conditional if player scored 0!!
        // Reset the score on gameOver Screen without having to reload browser!!!
        scoreElement.innerText = score;
        if (gameIsOver == true) {
          score = 0;
          vaxxineScore = maxLife;
        }
      }
    }
    for (let i = 0; i < vaxxineArray.length; i++) {
      vaxxineArray[i].x -= 6;

      // collision with vaxxine
      if (
        characterX < vaxxineArray[i].x + vaxxineWidth - 20 && // Left
        characterX + characterWidth > vaxxineArray[i].x + 20 && // Right
        characterY < vaxxineArray[i].y - 20 + vaxxineWidth && // Top
        characterHeight + characterY > vaxxineArray[i].y + 20 // Bottom
      ) {
        soundVaxxine.play();
        vaxxineArray.splice(i, 1);

        if (vaxxineScore < maxLife) {
          vaxxineScore += 1;
        }
      }
    }

    for (let i = 0; i < maskArray.length; i++) {
      image(maskArray[i].img, maskArray[i].x, maskArray[i].y, 64, 60);
      maskArray[i].x -= 5;

      if (
        characterX < maskArray[i].x + 100 - 20 && // Left
        characterX + characterWidth > maskArray[i].x + 20 && // Right
        characterY < maskArray[i].y - 20 + 100 && // Top
        100 + characterY > maskArray[i].y + 20 // Bottom
      ) {
        maskArray[i].x = 15000;
        // Checks name of maskArray.name and plays the assigned sound,
        // then => backgroundmusik stops until the given timeout
        //push all setTimeout() inside the timeout Array
        if (maskArray[i].name == "Berghain") {
          pauseSounds();
          maskArray[i].sound.play();
          // seconds = 30 sec
          timeouts.push(
            setTimeout(() => {
              soundBackground.play();
            }, 30000)
          );
        }

        if (maskArray[i].name == "Kitkat") {
          pauseSounds();
          maskArray[i].sound.play();
          // seconds = 15 sec
          timeouts.push(
            setTimeout(() => {
              soundBackground.play();
            }, 15000)
          );
        }
        
        if (maskArray[i].name == "Tresor") {
          pauseSounds();
          maskArray[i].sound.play();
          // seconds = 13 sec
          timeouts.push(
            setTimeout(() => {
              soundBackground.play();
            }, 13000)
          );
        }

        if (maskArray[i].name == "Sisyphos") {
          pauseSounds();
          maskArray[i].sound.play();
          // seconds = 17 sec
          timeouts.push(
            setTimeout(() => {
              soundBackground.play();
            }, 17000)
          );
        }

        if (maskArray[i].name == "WildeRenate") {
          pauseSounds();
          maskArray[i].sound.play();
          // seconds = 27 sec
          timeouts.push(
            setTimeout(() => {
              soundBackground.play();
            }, 27000)
          );
        }

        if (maskArray[i].name == "Watergate") {
          pauseSounds();
          maskArray[i].sound.play();
          // seconds = 15 sec
          timeouts.push(
            setTimeout(() => {
              soundBackground.play();
            }, 15000)
          );
        }

      }
      // Eliminate mask if player collides with it and print itback again
      if (maskArray[i].x < -200) {
        maskArray[i].x = maskX + getRandomNum(randomMax);
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

    /* let colorScore = color("rgba(101, 153, 255, 0.58)");
    fill(colorScore);
    rect(0, 0, windowWidth, 140); */

    virusBright.resize(50, 50);
    image(virusBright, 40, 60);

    vaxxinePic.resize(70, 70);
    image(vaxxinePic, 500, 50);

    fill(255, 204, 0);
    textStyle(BOLD);
    textSize(40);
    let vaxxineScoreAndVaxxineTotal =
      "" + vaxxineScore.toString() + " / " + maxLife;
    text(vaxxineScoreAndVaxxineTotal, 640, 100);
    text("Score: " + score.toString(), 200, 100);
    textStyle(NORMAL);
  }
}

// Stop draw function to reset objects + display game-over screen

function gameOver() {
  splashScreen.style.display = "none";
  playScreen.style.display = "none";
  gameOverScreen.style.display = "flex";
  characterX = 20;
  characterY = 500 - characterHeight - 20;
  vaxxineScore = maxLife;
  virusArray = [{ x: virusX, y: virusY, i: 0 }];
  gameIsRunning = false;
  scoreElement.innerText = `${score}`;
  pauseSounds();
  noLoop();
}

// Showing the first screen
window.addEventListener("load", () => {
  playScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  noLoop();

  // listener on start button; link to game-canvas
  startBtn.addEventListener("click", () => {
    splashScreen.style.display = "none";
    playScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    gameIsRunning = true;
    soundBackground.play();
    loop();
  });

  // listener on tryAgain button; link to game-canvas
  tryAgainBtn.addEventListener("click", () => {
    splashScreen.style.display = "none";
    playScreen.style.display = "flex";
    gameOverScreen.style.display = "none";
    score = 0;
    gameIsOver = false;
    gameIsRunning = true;
    gameIsWon = false;
    pauseSounds();
    soundBackground.play();
    loop();
  });

  // reset the stats
  virusArray = [
    { x: virusX, y: virusY },
    { x: virusX + 800, y: virusY + 200 },
    { x: virusX + 1400, y: virusY + 400 },
  ];
  loop();
});

// to simulate that the game is over
tryAgainBtn.addEventListener("click", () => {
  gameIsOver = false;
});
