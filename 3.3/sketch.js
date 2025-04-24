let msg = 0;
function setup() {
  createCanvas(400, 400);
  port = createSerial();
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToSerial);

  LEDButton = createButton("Turn on LED");
  LEDButton.mousePressed(LED);
}

function draw() {
 //background(220);

  let str = port.readUntil("\n");
  if (str !== "")
  {
    text(str, 20, 20);
  }

  background(Number(str));

  // if (port.opened())
  //   {
  //     port.write("0,255,0\n");
  //     //console.log("test");
  //   }
}

function connectToSerial()
{
  port.open('Arduino', 9600);
}

function LED()
{
  if (port.opened())
  {
    port.write("0,255,0\n");
    //console.log("test");
  }
}