let GameStates = Object.freeze({ 
  MENU: "menu",
  LEVEL1: "level1",
  LEVEL2: "level2",
  LEVEL3: "level3",
  GAMEOVER: "gameover"
});

let gameState = GameStates.LEVEL1;
let player;
let port;
let connectionButton;
let zeroButton;
let input;
let speed = 0.01;
let cursorX;
let cursorY;
let dmgSound;
let init = true;


function preload(){
  snake = loadImage("media/Snake.png");
  mob = loadImage("media/enemy.png");
  tileset = loadImage("media/tile_set.png");
  bg = loadImage("media/finalbackground.png");
  bg2 = loadImage("media/level2bg.png");
  bg3 = loadImage("media/level3bg.png");

  //dmgSound = new Tone.Player("media/dmgsound.mp3").toDestination();
}

function setup() {
  createCanvas(256,256);
  //imageMode(CENTER);
  port = createSerial(); 
  connectionButton = createButton("Connect");
  connectionButton.mousePressed(connect);
  zeroButton = createButton("Zero Joystick");
  zeroButton.mousePressed(zero);
  cursorX = width/2;
  cursorY = height/2;
  //dmgSound.start();
  //Entities and Obstacles change positions for different levels
  player = new Player(0,0);
  goal = new Goal(width/2,0);

  rat = new Enemy(100, 100, "horizontal", 5);
  rat1 = new Enemy(200, 100, "vertical", 5);

  
  water = new Obstacle (100,200);
  water1 = new Obstacle (116,200);
  water2 = new Obstacle (132,200);
  water3 = new Obstacle (148,200);
  water4 = new Obstacle (164,200);
  water5 = new Obstacle (180,200);
  water6 = new Obstacle (196,200);
  water7 = new Obstacle (212,200);
  water8 = new Obstacle (228,200);
  water9 = new Obstacle (100-16,200)
  water10 = new Obstacle (100-32,200);
}

function connect()
{
  port.open('Arduino', 9600);
}

function zero()
{
  if(port.opened())
  {
    port.write('zero\n');
  }
}

function readJoystick()
{
  input = port.readUntil('\n');
  if (input !== "")
  {
    const values = input.split(",");
    if(values.length == 3) {
      let x = Number(values[0]);
      let y = Number(values[1]);
      let sw = Number(values[2]);

      //console.log(x + "," + y + "," + sw)
      cursorX += x * speed;
      cursorY += y * speed;
      //fill(0);
      //console.log(cursorX);
      //circle(cursorX, cursorY, 50);
    }
  }
}
function draw() {
  background(220);
  switch(gameState)
  {
    case GameStates.MENU:
      text('Press Enter to Start', width/2, height/2);
      break;
    case GameStates.LEVEL1:
      // if(init){
      //   player.setPos(0,0);
      //   init = false;
      // }
      background(bg);
      rat.move();
      rat1.move();
      //draw functions
      player.draw();
      goal.draw();
      rat.draw();
      rat1.draw();
      water.draw();
      water1.draw();
      water2.draw();
      water3.draw();
      water4.draw();
      water5.draw();
      water6.draw();
      water7.draw();
      water8.draw();
      water9.draw();
      water10.draw();
      water.collision();
      water1.collision();
      water2.collision();
      //console.log(goal.getPos())
      readJoystick();
      player.setPos(cursorX,cursorY);
      collision();
      break;
    case GameStates.LEVEL2:
      background(bg2);

      collision();
      break;
    case GameStates.LEVEL3:
      background(bg3);

      collision();
      break;
    case GameStates.GAMEOVER:
      background(0);
      break;
  }

}

function collision()
{
  if (cursorX >= goal.getPos()[0] && cursorX <= goal.getPos()[0] + 12 && cursorY <= goal.getPos()[1] + 12)
  {
    gameState = GameStates.LEVEL2;
  }

  // if (cursorX >= enemy.getPos()[0] && cursorX <= enemy.getPos()[0] + 12 && cursorY <= enemy.getPos()[1] + 12 && cursorY >= enemy.getPos()[1])
  // {
  //     player.hit();
  // }

  // if (cursorX >= .getPos()[0] && cursorX <= enemy.getPos()[0] + 12 && cursorY <= enemy.getPos()[1] + 12 && cursorY >= enemy.getPos()[1])
  //   {
  //       player.hit();
  //   }
  // collision has to be in classes

  if (player.getLives() === 0)
  {
    gameState = GameStates.GAMEOVER;
  }
}

class Player {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 60;
    this.duration = 3;
    this.lives = 3;
  }

  draw()
  {
    fill("yellow")
    text("Lives: " + this.lives, 450, 15);
    fill(0);
    image(snake, this.x, this.y, 20, 20, this.sprite, 0, 25, 25);
    
    if (frameCount % 20 === 0)
    {
      this.sprite+=60;
      //console.log(this.sprite);
    } 

    if (this.sprite === 180) {
      this.sprite = 60;
    }
  }

  setPos(x,y)
  {
    this.x = x;
    this.y = y;
  } 

  hit()
  {
    console.log("test");
    this.lives-=1;
    setPos(width/2, height/2);
    // move back to start
  }

  getLives()
  {
    return this.lives;
  }
}

class Enemy {
  constructor(x,y,axis,cycle){
    this.x = x;
    this.y = y;
    this.sprite = 0;
    this.movement = axis;
    if(axis === "horizontal") {this.direction = "right";}
    if(axis === "vertical") {this.direction = "down";}
    this.cycle = cycle; // How many movement ticks before direction change
    this.cycleCount = 0;
  }

  draw()
  {
    
    image(mob, this.x, this.y, 20, 20, this.sprite, 0, 40,40);
   
  }

  move()
  {
    switch (this.movement)
    {
      case "horizontal":
        //console.log(this.cycle);
        
        if (frameCount % 10 === 0 && this.direction === "right" && this.cycleCount < this.cycle)
          {
            this.x += 3;
            this.cycleCount++;
            if (this.cycleCount === this.cycle)
            {
              this.direction = "left";
              this.cycleCount = 0;
            }
          }
        else if (frameCount % 10 === 0 && this.direction === "left" && this.cycleCount < this.cycle) {
              this.x -= 3;
              this.cycleCount++;
              if (this.cycleCount === this.cycle)
              {
                this.direction = "right";
                this.cycleCount = 0;
              }
          }
        break;
      case "vertical":
        //this.direction = "down";
        //console.log(this.direction);
        if (frameCount % 10 === 0 && this.direction === "down" && this.cycleCount < this.cycle)
          {
            this.y += 3;
            this.cycleCount++;
            if (this.cycleCount === this.cycle)
            {
              this.direction = "up";
              this.cycleCount = 0;
            }
          }
        else if (frameCount % 10 === 0 && this.direction === "up" && this.cycleCount < this.cycle) {
              this.y -= 3;
              this.cycleCount++;
              if (this.cycleCount === this.cycle)
              {
                this.direction = "down";
                this.cycleCount = 0;
              }
        break;
    }
  }
    
    // if (frameCount % 10 === 0 && this.movement === "vertical")
    //   {
    //     //console.log("test");
    //     this.y += 5;
    //   }
  }

  getPos() {
    return [this.x,this.y];
  }
}

class Obstacle {
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
    this.sprite = [[0,80]];
  }

  draw() {
    image(tileset, this.x, this.y, 20, 20, this.sprite[0][0], this.sprite[0][1],16,16);

    if (frameCount % 40 === 0)
    {
      if (this.sprite[0][1] === 80) {
        this.sprite[0][1] += 16;
      } else { this.sprite[0][1] -=16 ;}
    }
  }

  setPos(x,y)
  {
    this.x = x;
    this.y = y;
  }

  getPos() {
    return [this.x,this.y];
  }

  collision()
  {
    if (cursorX >= this.x && cursorX <= this.x + 12 && this.y <= goal.getPos()[1] + 12 && cursorY >= this.y)
      {
        //player.hit();
        console.log("test");
      }
  }
}

class Goal {
  constructor(x,y)
  {
    this.x = x;
    this.y = y;
  }

  draw()
  {
    image(tileset, this.x,this.y, 20, 20, 0, 32, 15, 15);
  }

  getPos()
  {
    return [this.x,this.y]
  }
}
