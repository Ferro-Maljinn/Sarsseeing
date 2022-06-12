//Defined all variables of game obstacles
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

//created an array for each object
let virusArray = [{ x: virusX, y: virusY, i: 0 }];
let vaxxineArray = [{ x: vaxX, y: vaxY }];
let maskArray = [{ x: maskX, y: maskY }];

//looping over each Array to keep spawning each obstacle in a specific intervall
function loopArraysOfAllObstacles() {
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

  //Note: Figure out how to loop over different images inside the same array.(to switch the mask of the character when colliding)
  for (let i = 0; i < maskArray.length; i++) {
    image(mask0, maskArray[i].x, maskArray[i].y, maskWidth, maskHeight);
  }
/*   for (let i = 0; i < maskArray.length; i++) {
    image(mask1, maskArray[i].x, maskArray[i].y, maskWidth, maskHeight);
  }
  for (let i = 0; i < maskArray.length; i++) {
    image(mask2, maskArray[i].x, maskArray[i].y, maskWidth, maskHeight);
  }
  for (let i = 0; i < maskArray.length; i++) {
    image(mask3, maskArray[i].x, maskArray[i].y, maskWidth, maskHeight);
  }
  for (let i = 0; i < maskArray.length; i++) {
    image(mask4, maskArray[i].x, maskArray[i].y, maskWidth, maskHeight);
  } */
}

// All collisions defined
//Manhatten distance is smaller than 50,=> splice (cut out) object,=> increment Scores by one, => reset score
function virusCollision() {
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
      score += 1;
      //print players score if game is over NOTE: write a conditional if player scored 0!!!! Reset the score on gameOver Screen without having to reload browser!!!
      scoreElement.innerText = score;
      if (gameIsOver == true) {
        score = 0;
      }
    }
  }
}

function vaxxineCollision() {
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
}

function maskCollision() {
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
}
