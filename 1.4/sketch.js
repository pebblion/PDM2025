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
let side = false;
let squish = false;
let bugs = [];

function preload() {
  bugSprite = loadImage("media/bugf.png");
}
function setup() {
  createCanvas(400, 400);

  for (let i=0; i < 15; i++)
  { 
    bugs[i] = new bug(random(32, width-32), random(32, height-32), random(directions), bugSprite);
  }
}

function draw() {
  background(220);
  textSize(20);
  text("Score:", 0, 20);
  text(score, 60, 20);
  text("Timer:", 100, 20);
  text(timer, 160, 20);
  if (frameCount % 60 == 0 && timer > 0) { 
    timer--;
  }
  if (timer <= 0) {gameState = GameStates.END;}
  

 switch(score)
 {
  case 0:
    bugs[0].draw();
    break;
  case 2:
    bugs[1].draw();
    break;
 }
   
 //console.log(mob1.pos);
}

function mouseClicked()
{
  console.log('clicked');
  bugs[0].mouseClicked();
}

class bug {
  constructor(x,y, direction, sprite) {
  this.x = x;
  this.y = y;
  this.frames = {};
  this.speed = 0;
  this.direction = direction;
  this.squished = false;
  this.animation = new SpriteAnimation(sprite, 0, 0, 5);
  this.squish_animation = new SpriteAnimation(sprite, 5, 0, 1);
  }
  
  mouseClicked()
  {
    if (mouseX >= bugs[0].x && mouseX <= bugs[0].x + 20 && mouseY) {bugs[0].squished = true; score++;}
  }

  get pos() {
    return [this.x, this.y]
  }

  draw()
  {
    switch(this.direction) {
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
  
    translate(this.x, this.y);
    if (!this.squished) {this.animation.draw();}
    
    if(this.squished){this.squish_animation.draw();}

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

    //if(side == true) {scale (-1,1);}
    //else if(side == false){scale(1,1);}
    image(this.spritesheet, 0, 0, 32, 32, this.u*32, this.v*32, 32, 32);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}
