let explode, noise1, filt, dist;
let playnoise = false;

function preload()
{
  explode = loadImage("media/explosion.gif");
}

function setup() {
  createCanvas(400, 400);
  // synth = new Tone.Synth({
  //   envelope: {
  //     attack: 0.5,
  //     sustain: 0.2,
  //     decay: 0.5
  //   }
  // }).toDestination();
  
  dist = new Tone.Distortion(0.6).toDestination();
  filt = new Tone.Filter().connect(dist);
  filt.set({
    frequency: 500,
    type: "lowpass",
    envelope : { 
      decay: 0.3,
      attack: 0.1,
      sustain: 0.8
    }
  })

  noise1 = new Tone.Noise().connect(filt);
  noise1.set({
    type: "brown"
  })
}

function draw() {
  background(220);
  if (playnoise) {image(explode, 50, 50);}
}

function mouseClicked()
{
  if(!playnoise) {noise1.start(); playnoise = true; }
  else {noise1.stop(); playnoise = false;}
}