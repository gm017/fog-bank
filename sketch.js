
let ready = false;
let osc;
let osc2;
let lfo;

let synth;

let drone01, drone02, drone03, drone04, drone05, drone06, drone07, drone08, drone09, drone10, drone11, drone12, drone13, drone14, drone15, drone16, drone17, drone18;

let pitchArray = [];

let dronesArray = [];

function preload() {

}

function setup() {
  createCanvas(400, 400);
  background(0);

  synth = new Tone.Synth();

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


}

function draw() {
  background(0);
  if (typeof pitch === 'number') {
    text(pitch, width / 2, height / 2);
  }
  if (ready) {
    // Audio stuff

    osc.frequency.value = pitch;

  } else {
    fill(255);


  }



}

function keyPressed() {

  if (key === 'p') {

    if (!ready) {

      // osc.start();
      // osc2.start();
      // lfo.start();


      ready = true;

    }
    synth.triggerAttackRelease(pitch, 0.01);
    // else {
    //   osc.stop();
    //   osc2.stop();
    //   lfo.stop();


    //   ready = false;
    //   console.log('not ready');
    // }
  }
}
