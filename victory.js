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
