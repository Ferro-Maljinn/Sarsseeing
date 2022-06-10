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

//Defined the random spawning with an intervall
function spawnObjects() {
  //random virus spawning
  if (interval % 10 == 0) {
    virusArray.push(new virus(width, random(140, windowHeight), interval));
  }
  //random vaxxine spawning
  if (interval % 1000 == 0) {
    vaxxineArray.push(new vaxxine(width, random(10, windowHeight)));
  }
  //random mask spawning
  if (interval % 600 == 0) {
    maskArray.push(new mask(width, random(10, windowHeight)));
  }
}
