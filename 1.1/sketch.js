let drawing = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
}

function sketch()
{
  background(100, 100, 100);
  fill(0, 0, 100);
  circle(windowWidth / 4, windowHeight / 2, 500);
  square((windowWidth / 2), windowHeight / 7, 500);
}

function sketch1()
{
  background (0, 0, 100);
  noStroke();
  fill(0, 100, 100, 0.2);

  circle(windowWidth/2, windowHeight/2, 500);
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
    default:
      break;
  }  
  if(drawing > 1){
    drawing = 0;
  }
}

function mouseClicked (){
  drawing++;
}