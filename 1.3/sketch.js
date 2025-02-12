let cyclops;
let character;
let side;

function preload() {
  cyclops = loadImage("media/cyclops.png");
  ninja = loadImage("media/ninja.png");
  guy = loadImage("media/guy.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  character = new Character(random(80, width-80),random(80, height-80));
  character.addAnimation("down", new SpriteAnimation(cyclops, 6, 5, 6));
  character.addAnimation("up", new SpriteAnimation(cyclops, 0, 5, 6));
  character.addAnimation("stand", new SpriteAnimation(cyclops, 0, 0, 1));
  character.addAnimation("right", new SpriteAnimation(cyclops, 1, 0, 8));
  character.addAnimation("left", new SpriteAnimation(cyclops, 1, 0, 8));
  character.currentAnimation = "stand";

  ninjacharacter = new Character(random(80,width-80), random(80, height-80));
  ninjacharacter.addAnimation("down", new SpriteAnimation(ninja, 6, 5, 6));
  ninjacharacter.addAnimation("up", new SpriteAnimation(ninja, 0, 5, 6));
  ninjacharacter.addAnimation("stand", new SpriteAnimation(ninja, 0, 0, 1));
  ninjacharacter.addAnimation("right", new SpriteAnimation(ninja, 1, 0, 8));
  ninjacharacter.addAnimation("left", new SpriteAnimation(ninja, 1, 0, 8));
  ninjacharacter.currentAnimation = "stand";

  guycharacter = new Character(random(80,width-80), random(80, height-80));
  guycharacter.addAnimation("down", new SpriteAnimation(guy, 6, 5, 6));
  guycharacter.addAnimation("up", new SpriteAnimation(guy, 0, 5, 6));
  guycharacter.addAnimation("stand", new SpriteAnimation(guy, 0, 0, 1));
  guycharacter.addAnimation("right", new SpriteAnimation(guy, 1, 0, 8));
  guycharacter.addAnimation("left", new SpriteAnimation(guy, 1, 0, 8));
  guycharacter.currentAnimation = "stand";
}

function draw() {
  background(220);

  character.draw();
  ninjacharacter.draw();
  guycharacter.draw();
}

function keyPressed() {
  character.keyPressed();
  ninjacharacter.keyPressed();
  guycharacter.keyPressed();
}

function keyReleased() {
  character.keyReleased();
  ninjacharacter.keyReleased();
  guycharacter.keyReleased();
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down": 
          this.y += 2;
          break;
        case "right":
          this.x += 2;
          break;
        case "left":
          this.x -= 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        side = false;
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        side = true;
        break; 
    }
  }
  
  keyReleased() {
   
    this.currentAnimation = "stand";
    
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

  draw() {

    
    if(side == true) {scale (-1,1);}
    else if(side == false){scale(1,1);}
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}
