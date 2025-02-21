let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
})

let gameState = GameStates.START;
let score = 0;
let timer = 30;
let directions = ["left", "right", "up", "down"];
let bugSprite;

function preload() {
  bugSprite = imageLoad("media/bugf.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  text("Score:", 50, 20);
  text("Timer:", 100, 20);
}

function draw() {
  background(220);
  mob1 = new bug(random(32,width-32),random(32,height-32), "left", bugSprite);
}

class bug {
  constructor(x,y, direction, sprite) {
  this.x = x;
  this.y = y;
  this.frames = {};
  this.direction = direction;
  this.animation = new SpriteAnimation(sprite, 0, 0, 5);
  }

  draw()
  {
    switch(direction) {
      case "left":
        this.x -= 1;
        break;
      case "right":
        this.x += 1;
        break;
      case "up":
        this.y -= 1;
        break;
      case "down":
        this.y += 1;
        break;   
    }
    this.animation.draw();
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  // change sprites direction based on parameter
  draw() {

    if(side == true) {scale (-1,1);}
    else if(side == false){scale(1,1);}
    image(this.spritesheet, 0, 0, 32, 32, this.u*32, this.v*32, 32, 32);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}
