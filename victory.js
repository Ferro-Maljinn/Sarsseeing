//When game is Won => Stop draw() | switch to victoryScreen | Reset everything

function drawVictoryScreen() {
  characterX = 20;
  characterY = 500 - characterHeight - 20;
  score = 0; //left
  vaxxineScore = 0;
  maskScore = 0;
  virusArray = [{ x: virusX, y: virusY, i: 0 }];
  splashScreen.style.display = "none";
  playScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  victoryScreen.style.display = "flex";
  noLoop();
}
