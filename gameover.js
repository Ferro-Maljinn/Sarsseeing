//When game is over => Stop draw() | switch to gameOverScreen | Reset everything
function gameOver() {
  splashScreen.style.display = "none";
  playScreen.style.display = "none";
  gameOverScreen.style.display = "flex";
  victoryScreen.style.display = "none";
  characterX = 20;
  characterY = 500 - characterHeight - 20;
  score = 0; //left
  vaxxineScore = 0;
  maskScore = 0;
  virusArray = [{ x: virusX, y: virusY, i: 0 }];
  gameIsRunning = false;
  noLoop();
}
