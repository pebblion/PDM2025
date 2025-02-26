let samples, sampler, button1, button2, button3, button4, delTimeSlider, feedbackSlider, distSlider, wetSlider;


let rev = new Tone.Reverb(1).toDestination()
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
let pitch = new Tone.PitchShift(0).connect(del);
let vibrato = new Tone.Vibrato(10, 0.2).connect(pitch);
rev.wet.value = 0;

function preload()
{
  samples = new Tone.Players({
    humming: "media/humming.wav",
    hello: "media/hello.wav",
    goodbye: "media/goodbye.wav",
    one_moment: "media/one_moment.wav"
  }).connect(vibrato);
}

function setup() {
  createCanvas(400, 400);
  button1 = createButton("Play Humming");
  button1.mousePressed(() => {samples.player("humming").start();});

  button2 = createButton("Play Hello");
  button2.mousePressed(() => {samples.player("hello").start();});

  button3 = createButton("Play Goodbye");
  button3.mousePressed(() => {samples.player("goodbye").start();});

  button4 = createButton("Play Moment");
  button4.mousePressed(() => {samples.player("one_moment").start();});

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(10, 100);
  delTimeSlider.input(() => (del.delayTime.value = delTimeSlider.value()));

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 100);
  feedbackSlider.input(() => (del.feedback.value = feedbackSlider.value()));
  
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(10, 200);
  distSlider.input(() => (dist.distortion = distSlider.value()));

  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 200);
  wetSlider.input(() => (rev.wet.value = wetSlider.value()));

  pitchSlider = createSlider(-12, 12, 0, 1);
  pitchSlider.position(10, 300);
  pitchSlider.input(() => (pitch.pitch = pitchSlider.value()));

}

function draw() {
  background(220);
  text("Delay Time: " + del.delayTime.value, 10, 90);
  text("Feedback Amount: " + del.feedback.value, 200, 90);
  text("Distortion Amount: " +dist.distortion, 10, 180);
  text("Wet Amount: " + rev.wet.value, 200, 180);
  text("Pitch (Semi-tones): " +pitch.pitch, 10, 280);
}
