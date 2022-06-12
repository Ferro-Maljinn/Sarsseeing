let score = 0;
let vaxxineScore = 0;
let maskScore = 0;

let scoreElement = document.querySelector('#score');

function scoreBar() {
  fill(176, 196, 222, 100);
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
