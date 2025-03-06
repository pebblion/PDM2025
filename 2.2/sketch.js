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

let backNotes= {
  "a": "C4",
  "s": "C5"
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
  createCanvas(400, 400);
  reverb = new Tone.Reverb(2).toDestination();
  filt = new Tone.Filter(1000, "lowpass").connect(reverb)
  backFilt = new Tone.Filter(1500, "lowpass").connect(reverb)
  backSynth = new Tone.PolySynth(Tone.Synth).connect(backFilt);
  backSynth.set({
    envelope: {
      attack: 0.5,
      decay: 0.2,
      sustain: 0.1,
      release: 0.1
    },

    
    oscillator: {
      type: 'sawtooth'
    }
    
  })

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
}

function keyPressed()
{
  let backPitch = backNotes[key]
  let moodPitch = moodNotes[key]
  let melodyPitch = melody[key]
  if(backPitch){backSynth.triggerAttack(backPitch)}
  if(moodPitch){moodSynth.triggerAttack(moodPitch)}
  if(melodyPitch){melodySynth.triggerAttack(melodyPitch)}
}

function keyReleased()
{
  let pitch = backNotes[key]
  let moodPitch = moodNotes[key]
  let melodyPitch = melody[key]
  if(pitch) {backSynth.triggerRelease(pitch)}
  if(moodPitch){moodSynth.triggerRelease(moodPitch)}
  if(melodyPitch){melodySynth.triggerRelease(melodyPitch)}
}