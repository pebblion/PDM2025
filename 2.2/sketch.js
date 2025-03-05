let synth1, filter, reverb, activeKey, polySynth, noise1;

function preload() {

}

let keynotes = {
  "a": "A4",
  "s": "B4",
  "d": "C5",
  "f": "D5",
}

let keynotes1 = { 
  "q": "D4",
  "w": "F4",
  "e": "G4",
  "r": "A5",
  "t": "G5"
}
function setup() {
  createCanvas(400, 400);
  filter = new Tone.Filter(1000, "lowpass").toDestination();
  reverb = new Tone.Reverb(2).connect(filter);
  synth1 = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    }
  }).connect(reverb);
  synth1.portamento.value = 0.5;
  polySynth = new Tone.PolySynth(Tone.Synth).connect(reverb);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.5,
      sustain: 1,
      release: 0.5
    },
    /*
    oscillator: {
      type: 'sawtooth'
    }
      */
  })
  polySynth.volume.value = 0.4;
  ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  })
  //noise1 = new Tone.Noise().start();
}

function draw() {
  background(220);
}

function keyPressed() {
  let pitch = keynotes[key];
  let pitch1 = keynotes1[key];
  if (pitch && key !== activeKey) {
    synth1.triggerRelease(); 
    synth1.triggerAttack(pitch);
    activeKey = key;
  } else if (pitch1) {
    polySynth.triggerAttack(pitch1);
  }
}

function keyReleased() {
  let pitch1 = keynotes1[key];
  if (key === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
} else if(pitch1) {
  polySynth.triggerRelease(pitch1);
}
}