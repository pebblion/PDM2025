let moodSynth, backSynth, melodySynth, reverb;

let moodNotes = {
  "q": "C4",
  "w": "Eb4",
  //D minor
  "e": "D4",
  "r": "F4",
  "t": "A4",
  // E minor
  "y": "E4",
  "u": "G4",
  "i": "B4",
}

let melody={
  "g": "D4",
  "h": "F4",
  "j": "D5",
  "k": "E5",
  "l": "F5",
  "v": "C5",
  "b": "A4",
  "n": "G4",
  "m": "E4"
}

function setup() {
  createCanvas(1000,800);
  reverb = new Tone.Reverb(2).toDestination();
  filt = new Tone.Filter(1000, "lowpass").connect(reverb)

  moodSynth = new Tone.PolySynth(Tone.Synth).connect(filt);
  moodSynth.set({
    envelope: {
      attack: 0.5,
      decay: 0.5,
      sustain: 0.9,
      release: 0.5
    },

    oscillator: {
      type: 'sine'
    }
  })
  moodSynth.volume.value = 0.3; 
  melodySynth = new Tone.PolySynth(Tone.Synth).connect(filt);
  melodySynth.set({
    envelope: {
      attack: 0.5,
      decay: 0.5,
      sustain: 0.9,
      release: 0.5
    },

    oscillator: {
      type: 'square'
    }
  })
}

function draw() {
  background(220);
  textSize(20);
  text('Two Synths', 300, 50)
  text('Synth 1, sine oscillator', 100, 80)
  text(' q: C4\n w: Eb4\n e: D4\n r: F4\n t: A4\n y: E4\n u: G4\n i: B4', 100, 120);
  text('Synth 2, square oscillator', 500, 80);
  text(' g: D4\n h: F4\n j: D5\n k: E5\n l: F5\n v: C5\n b: A4\n n: G4\n m: E4', 500, 120);
}

function keyPressed()
{
  let moodPitch = moodNotes[key]
  let melodyPitch = melody[key]
  if(moodPitch){moodSynth.triggerAttack(moodPitch)}
  if(melodyPitch){melodySynth.triggerAttack(melodyPitch)}
}

function keyReleased()
{
  let moodPitch = moodNotes[key]
  let melodyPitch = melody[key]
 
  if(moodPitch){moodSynth.triggerRelease(moodPitch)}
  if(melodyPitch){melodySynth.triggerRelease(melodyPitch)}
}