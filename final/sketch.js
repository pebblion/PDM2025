let GameStates = Object.freeze({ 
  MENU: "menu",
  LEVEL1: "level1",
  LEVEL2: "level2",
  END: "end"
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

function preload(){
  snake = loadImage("media/Snake.png");
  //enemy =  loadImage();
}

function setup() {
  createCanvas(1000,500);
  imageMode(CENTER);
  //frameRate(30);
  port = createSerial(); 
  connectionButton = createButton("Connect");
  connectionButton.mousePressed(connect);
  zeroButton = createButton("Zero Joystick");
  zeroButton.mousePressed(zero);
  cursorX = width/2;
  cursorY = height/2; 
  player = new Player(10,10);
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
      break;
    case GameStates.LEVEL1:
      player.draw();
      readJoystick();
      player.setPos(cursorX,cursorY);
  }
  //player.draw();
}

class Player {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 60;
    this.duration = 3;
  }

  draw()
  {
    
    image(snake, this.x, this.y, 20, 20, this.sprite, 0, 25, 25);
    
    if (frameCount % 10 === 0)
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
}

class Enemy {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.frameCount;
  }

  draw()
  {

  }
}


