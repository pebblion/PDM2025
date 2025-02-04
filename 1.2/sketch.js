function setup() {
  createCanvas(2000,1000);

  background('white');
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
  fill("pink");
  square(0, 330, 50);
  fill("brown");
  square(0, 385, 50);
  fill("white");
  square(0, 440, 50);
  fill("black");
  square(0, 495, 50);

  strokeWeight(10);

}

function draw() {
  
}

function mousePressed()
{
  //color pallete
  if (mouseX > 0 && mouseX < 50)
  {
    //red
    if (mouseY < 55){ stroke("red");}
    else if (mouseY < 110) {stroke("orange");}
    else if (mouseY < 165) {stroke("yellow");}
    else if (mouseY < 220) {stroke("green");}
    else if (mouseY < 275) {stroke("cyan");}
    else if (mouseY < 330) {stroke("blue");}
    else if (mouseY < 385) {stroke("pink");}
    else if (mouseY < 440) {stroke("brown");}
    else if (mouseY < 495) {stroke("white");}
    else if (mouseY < 550) {stroke("black");}


    
  }
}

function mouseDragged()
{
  if(mouseX > 50)
  {
    stroke("red", 90, 90);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
    
}