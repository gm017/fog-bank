
class SynthButton {
  constructor(xPos, yPos, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.live = 0;
  }
  display() {
    if (this.live === 0) {
      fill(255, 0, 130);
    } else {
      fill(0, 255, 0);
    }
    rect(this.xPos, this.yPos, this.size, this.size);
  }
}

let button1;

let ready = false;
let osc;
let osc2;
let lfo;

let synth;
let fmSynth1;
let fmSynth2;
let fmSynth3;
let fmSynth4;
let fmSynth5;
let fmSynth6;



let drone01, drone02, drone03, drone04, drone05, drone06, drone07, drone08, drone09, drone10, drone11, drone12, drone13, drone14, drone15, drone16, drone17, drone18;

let pitchArray = [];

let dronesArray = [];

function preload() {

}

function setup() {
  createCanvas(600, 100);
  background(0);

  fmSynth1 = new Tone.FMSynth();
  fmSynth2 = new Tone.FMSynth();
  fmSynth3 = new Tone.FMSynth();
  fmSynth4 = new Tone.FMSynth();
  fmSynth5 = new Tone.FMSynth();
  fmSynth6 = new Tone.FMSynth();

  synth = new Tone.FMSynth();




  fmSynth1.toMaster();
  fmSynth2.toMaster();
  fmSynth3.toMaster();
  fmSynth4.toMaster();
  fmSynth5.toMaster();
  fmSynth6.toMaster();


  synth.toMaster();

  osc = new Tone.Oscillator();
  osc.frequency.value = 220;
  osc.connect(Tone.Master);

  osc2 = new Tone.Oscillator();
  osc2.frequency.value = 341;
  osc2.connect(Tone.Master);

  lfo = new Tone.LFO("10hz", 110, 930);
  lfo.connect(osc.frequency);



  setInterval(() => {
    if (typeof pitch === 'number') {
      pitchArray.push(Math.round(pitch));
    }
  }, 500);


  button1 = new SynthButton(0, 0, 100);
  button2 = new SynthButton(100, 0, 100);
  button3 = new SynthButton(200, 0, 100);
  button4 = new SynthButton(300, 0, 100);
  button5 = new SynthButton(400, 0, 100);
  button6 = new SynthButton(500, 0, 100);

}

function draw() {
  background(0);
  if (typeof pitch === 'number') {
    text(pitch, width / 2, height / 2);
  }
  if (ready) {
    // Audio stuff

    if (typeof pitch === 'number' && pitch < 1000) {
      synth.frequency.value = pitch;
      fmSynth1.frequency.value = pitch + 40;
      fmSynth2.frequency.value = pitch + 59;
      fmSynth3.frequency.value = pitch + 60;
      fmSynth4.frequency.value = pitch + 70;
      fmSynth5.frequency.value = pitch + 80;
      fmSynth6.frequency.value = pitch + 90;


    } else if (typeof pitch === 'number') {
      synth.frequency.value = pitch - 500;
      fmSynth1.frequency.value = pitch + 40 - 500;
      fmSynth2.frequency.value = pitch + 59 - 500;
      fmSynth3.frequency.value = pitch + 60 - 500;
      fmSynth4.frequency.value = pitch + 70 - 500;
      fmSynth5.frequency.value = pitch + 80 - 500;
      fmSynth6.frequency.value = pitch + 90 - 500;

    }

  } else {
    fill(255);


  }

  // fill(255, 0, 0);
  noStroke();
  button1.display();
  button2.display();
  button3.display();
  button4.display();
  button5.display();
  button6.display();

}

function keyPressed() {

  if (key === 'p') {

    if (!ready) {

      // osc.start();
      // osc2.start();
      // lfo.start();


      ready = true;

    }

    fmSynth1.triggerAttackRelease(30, 1200)
    fmSynth2.triggerAttackRelease(40, 1200)
    fmSynth3.triggerAttackRelease(50, 1200)
    fmSynth4.triggerAttackRelease(60, 1200)
    fmSynth5.triggerAttackRelease(70, 1200)
    fmSynth6.triggerAttackRelease(80, 1200)

    // synth.triggerAttackRelease(pitch, 1000);

    // else {
    //   osc.stop();
    //   osc2.stop();
    //   lfo.stop();


    //   ready = false;
    //   console.log('not ready');
    // }
  }
}
