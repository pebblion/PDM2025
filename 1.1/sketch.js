let drawing = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
}

function sketch()
{
  background(100, 100, 100);
  stroke('black');
  fill(0, 0, 100);
  circle(windowWidth / 4, windowHeight / 2, 500);
  square((windowWidth / 2), windowHeight / 7, 500);
}

function sketch1()
{
  background (0, 0, 100);
  noStroke();
  fill(0, 100, 100, 0.4);

  circle(windowWidth/2, windowHeight/4, 500);
  fill(120, 100, 100, 0.4);
  circle(windowWidth/2 + 200, windowHeight/2, 500);
  fill(240, 100, 100, 0.4);
  circle(windowWidth/2 - 200, windowHeight/2, 500);
}

function pacman() {
  background(0, 0, 0);
  
}
function draw() {
  switch(drawing)
  {
    case 0:
      sketch();
      break;
    case 1:
      sketch1();
      break;
    case 2:
      pacman();
      break;
    default:
      break;
  }  
  if(drawing > 2){
    drawing = 0;
  }
}

function mouseClicked (){
  drawing++;
}