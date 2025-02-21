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
let up = false;
let squish = false;
let bugs = [];
let speed = 1;

function preload() {
  bugSprite = loadImage("media/bugf.png");
}
function setup() {
  createCanvas(400, 400);


  bugs[0] = new bug(random(32, width-32), random(32, height-32), random(directions), bugSprite);

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
  

 bugs[0].draw();
 if (timer == 28) { bugs[1] = new bug(random(32, width-32), random(32, height-32), random(directions), bugSprite);}
 if (timer <= 28) { bugs[1].draw(); }

 /*
 if (timer <= 26) { bugs[2].draw();}
 if (timer <= 24) { bugs[3].draw();}
 if (timer <= 22) { bugs[4].draw();}
 if (timer <= 20) { bugs[5].draw();}
 */
 //console.log(mob1.pos);
}

function mouseClicked()
{
  console.log('clicked');
  bugs[0].mouseClicked(0);
  if (timer <= 28) { bugs[1].mouseClicked(1);}
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
  
  mouseClicked(num)
  {
    if (mouseX >= bugs[num].x && mouseX <= bugs[num].x + 20 && mouseY >= bugs[num].y && mouseY <= bugs[num].y + 20) {bugs[num].squished = true; score++;}
  }

  get pos() {
    return [this.x, this.y]
  }

  draw()
  {
  
    if (!this.squished) {
      switch(this.direction) {
        case "left":
          this.x -= 1;
          side=false;
          break;
        case "right":
          this.x += 1;
          side=true;
          break;
        case "up":
          this.y -= 1;
          up = true;
          side=false;
          break;
        case "down":
          this.y += 1;
          up = false;
          side = false;
          break;   
      }
      
      translate(this.x, this.y); 
      this.animation.draw(this.direction);
      
      }
    
    if(this.squished){translate(this.x, this.y);  this.squish_animation.draw();}

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

  draw(direction) {

    push();
    switch(direction)
    {
      case "right":
        scale(-1,1);
        break;
      case "left":
        scale(1,1);
        break;
      case "up":
        rotate(PI/2);
        break;
      case "down":
        rotate((3*PI)/2);
        break;
    }
    pop();
    /*
    if(up == true) {rotate(PI/2);}
    else if(up == false) {rotate((3*PI)/4);}
    */
    image(this.spritesheet, 0, 0, 32, 32, this.u*32, this.v*32, 32, 32);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}
