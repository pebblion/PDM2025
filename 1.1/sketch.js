let drawing = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
}

function sketch()
{
  background(100, 100, 100);
  stroke('black');
  strokeWeight('1');
  fill(0, 0, 100);
  circle(windowWidth / 4, windowHeight / 2, 500);
  square((windowWidth / 2), windowHeight / 4, 500);
}

function sketch1()
{
  background (0, 0, 100);
  noStroke();
  fill(0, 100, 100, 0.4);

  circle(windowWidth/2, windowHeight/4 + 100, 300);
  fill(120, 100, 100, 0.4);
  circle(windowWidth/2 + 100, windowHeight/2, 300);
  fill(240, 100, 100, 0.4);
  circle(windowWidth/2 - 100, windowHeight/2, 300);
}

function pacman() {
  background(0, 0, 0);
  noStroke();
  fill(60, 100, 100);
  arc(windowWidth/4 + 100, windowHeight/2, 350, 350, 3.9, 2.3);
  fill(0, 80, 100)
  circle(windowWidth/2 + 150, windowHeight/2 - 50, 300);
  rect(windowWidth/2, windowHeight/2 - 50, 300, 200);
  fill(0, 0, 100);
  circle(windowWidth/2 + 75, windowHeight/2 - 50, 125);
  circle(windowWidth/2 + 225, windowHeight/2 - 50, 125);
  fill(240, 100, 100);
  circle(windowWidth/2 + 75, windowHeight/2 - 50, 100);
  circle(windowWidth/2 + 225, windowHeight/2 - 50, 100);

}
function star(){
  background(240, 100, 100);
  fill(120, 100, 50);
  stroke('white');
  strokeWeight(10);
  circle(windowWidth/2, windowHeight/2, 350);

  fill("red");
  beginShape();
  vertex(windowWidth/2 - 200, windowHeight/2 - 50);
  vertex(windowWidth/2 - 50, windowHeight/2 - 50);
  vertex(windowWidth/2, windowHeight/2 - 200);
  vertex(windowWidth/2 + 50, windowHeight/2 - 50);
  vertex(windowWidth/2 + 200, windowHeight/2 - 50);
  vertex(windowWidth/2 + 70, windowHeight/2 + 40);
  vertex(windowWidth/2 + 150, windowHeight/2 + 200);
  vertex(windowWidth/2, windowHeight/2 + 75);
  vertex(windowWidth/2 - 150, windowHeight/2 + 200);
  vertex(windowWidth/2 -70, windowHeight/2 + 40);
  
  endShape(CLOSE);
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
    case 3:
      star();
      break;
  }  
  if(drawing > 3){
    drawing = 0;
  }
}

function mouseClicked (){
  drawing++;
}