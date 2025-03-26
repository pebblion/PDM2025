function setup() {
  createCanvas(windowWidth, windowHeight);

  background('white');

  selectSynth = new Tone.Synth().toDestination();
  selectSynth.set({
    oscillator: {
      type: 'sine'
    }
  }
  )
  musicSynth = new Tone.PolySynth(Tone.Synth).toDestination();
  musicSynth.set({
   oscillator: {
    type: 'sine'
   } 
  }
  )
  selectSound = new Tone.Part(((time, note) => {
    selectSynth.triggerAttackRelease(note, "16n", time);
  }), [
    [0, "C4"],
    ["0:0:1", "D4"]
  ]);
  Tone.Transport.start();

  music = new Tone.Part(((time, value) => {
    musicSynth.triggerAttackRelease(value.note, value.dur, time);
  }),
[
  {time: 0, note: ["G4"], dur: "8n"},
  {time: "0:1", note: ["F4"], dur: "8n"},
  {time: "0:2", note: ["G4"], dur: "8n"},
  {time: "0:3", note: ["F4"], dur: "8n"},
  {time: "0:4", note: ["E4"], dur: "8n"},
  {time: "0:5", note: ["D4"], dur: "8n"},
  {time: "0:5:1", note: ["D4"], dur: "16n"},
  {time: "0:5:2", note: ["D4"], dur: "16n"},
  {time: "0:5:3", note: ["D4"], dur: "16n"},
  {time: "0:6", note: ["G4", "B4", "D4"], dur: "16n"},
  {time: "0:7", note: ["F4", "A4", "C4"], dur: "16n"},
  {time: "0:8", note: ["A5", "C#5", "E5"], dur: "16n"},
  {time: "0:9", note: ["G4"], dur: "4n"},
  {time: "0:10", note: ["F4"], dur: "4n"},
  {time: "0:11", note: ["E4"], dur: "4n"},
  {time: "0:12", note: ["F4"], dur: "4n"},
  {time: "0:13", note: ["G4"], dur: "4n"},
  {time: "0:14", note: ["F4"], dur: "4n"},
  {time: "0:15", note: ["D4"], dur: "4n"},
])
  
  music.start(0);
  music.loop = true;
  music.loopEnd = "4m";
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
  Tone.start();
  strokeWeight(10);
  //color pallete
  if (mouseX > 0 && mouseX < 50)
  {
    selectSound.start();
    musicSynth.volume.value = -0.5;
    //Tone.Transport.toggle();
    //Tone.Transport.toggle();
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
  selectSound.stop();
  Tone.Transport.bpm.rampTo(180, 5);
  stroke("red", 90, 90);
  line(pmouseX, pmouseY, mouseX, mouseY);
    
}
