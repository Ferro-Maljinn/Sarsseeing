//character variables
let characterHeight = 75;
let characterWidth = 75;
let characterX = 20;
let characterY = 500 - characterHeight + 200;

//Display character
function drawCharacter() {
  image(char0, characterX, characterY, characterWidth, characterHeight);
}

// function to move my char left, right, up and down
function characterMovement() {
  //left
  if (keyIsPressed && keyIsDown(LEFT_ARROW) && characterX > 0) {
    characterX -= 10;
  }
  //right
  if (
    keyIsPressed &&
    keyIsDown(RIGHT_ARROW) &&
    characterX + characterWidth < width
  ) {
    characterX += 3;
  }
  //Up
  if (keyIsPressed && keyIsDown(UP_ARROW) && characterY > 140) {
    characterY -= 5;
  }
  //Down
  if (
    keyIsPressed &&
    keyIsDown(DOWN_ARROW) &&
    characterY + characterHeight < height
  ) {
    characterY += 5;
  }
}
