function setup() {
  createCanvas(2000,1000);

  background('white');

}

function draw() {
  noStroke();
  fill("red");
  square(0, 0, 50);
  fill("orange");
  square(0, 55, 50);
  fill("yellow");
  square(0, 110, 50);
  fill("green");
  square(0, 165, 50);
  fill("cyan");
  square(0, 220, 50);
  fill("blue");
  square(0, 275, 50);
  fill("hotpink");
  square(0, 330, 50);
  fill("saddlebrown");
  square(0, 385, 50);
  fill("white");
  square(0, 440, 50);
  fill("black");
  square(0, 495, 50);

}

function mousePressed()
{
  strokeWeight(10);
  //color pallete
  if (mouseX > 0 && mouseX < 50)
  {
    if (mouseY < 55){ stroke("red");}
    else if (mouseY < 110) {stroke("orange");}
    else if (mouseY < 165) {stroke("yellow");}
    else if (mouseY < 220) {stroke("green");}
    else if (mouseY < 275) {stroke("cyan");}
    else if (mouseY < 330) {stroke("blue");}
    else if (mouseY < 385) {stroke("hotpink");}
    else if (mouseY < 440) {stroke("saddlebrown");}
    else if (mouseY < 495) {stroke("white");}
    else if (mouseY < 550) {stroke("black");}
    
  }
}

function mouseDragged()
{
  stroke("red", 90, 90);
  line(pmouseX, pmouseY, mouseX, mouseY);
    
}