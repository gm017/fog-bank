

let pitchDisplay;

let button1;

let playing = false;
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

let fire;
let qImg;
let wImg;
let eImg;
let rImg;
let tImg;
let yImg;

let distCount = 3;

let presetCount = 0;
let presetsArray = [];
let dist;


// let drone01, drone02, drone03, drone04, drone05, drone06, drone07, drone08, drone09, drone10, drone11, drone12, drone13, drone14, drone15, drone16, drone17, drone18;
// let dronesArray = [];

let pitchArray = [];

function preload() {
  fire = loadImage('img/fire.jpeg');
  qImg = loadImage('img/q.png');
  wImg = loadImage('img/w.png');
  eImg = loadImage('img/e.png');
  rImg = loadImage('img/r.png');
  tImg = loadImage('img/t.png');
  yImg = loadImage('img/y.png');
}


function setup() { //BEGIN SETUP
  createCanvas(600, 200, WEBGL);
  background(0);

  dist = new Tone.Chebyshev(distCount).toMaster();

  lfo = new Tone.LFO("5hz", 200, 400).start();

  fmSynth1 = new Tone.FMSynth().connect(dist);
  fmSynth2 = new Tone.FMSynth().connect(dist);
  fmSynth3 = new Tone.FMSynth().connect(dist);
  fmSynth4 = new Tone.FMSynth().connect(dist);
  fmSynth5 = new Tone.FMSynth().connect(dist);
  fmSynth6 = new Tone.FMSynth().connect(dist);

  fmSynth1.toMaster();
  fmSynth2.toMaster();
  fmSynth3.toMaster();
  fmSynth4.toMaster();
  fmSynth5.toMaster();
  fmSynth6.toMaster();

  setInterval(() => {
    if (typeof pitch === 'number') {
      pitchArray.push(Math.round(pitch));
    }
  }, 500);

  button1 = new SynthButton(0, 0, 100, qImg);
  button2 = new SynthButton(100, 0, 100, wImg);
  button3 = new SynthButton(200, 0, 100, eImg);
  button4 = new SynthButton(300, 0, 100, rImg);
  button5 = new SynthButton(400, 0, 100, tImg);
  button6 = new SynthButton(500, 0, 100, yImg);

  presetDisplay1 = new PresetDisplays(0, 100, 100, 255, false, 0);
  presetDisplay2 = new PresetDisplays(100, 100, 100, 255, false, 1);
  presetDisplay3 = new PresetDisplays(200, 100, 100, 255, false, 2);
  presetDisplay4 = new PresetDisplays(300, 100, 100, 255, false, 3);
  presetDisplay5 = new PresetDisplays(400, 100, 100, 255, false, 4);
  presetDisplay6 = new PresetDisplays(500, 100, 100, 255, false, 5);


  presetValues1 = new PresetValues(40, 41, 42, 193, 194, 95);
  presetValues2 = new PresetValues(101, 105, 109, 401, 405);
  presetValues3 = new PresetValues(200, 202, 209, 601, 605);
  presetValues4 = new PresetValues(301, 305, 309, 801, 805);
  presetValues5 = new PresetValues(401, 405, 409, 1001, 1005);
  presetValues6 = new PresetValues(501, 505, 509, 1201, 1205);

  presetsArray = [presetValues1, presetValues2, presetValues3, presetValues4, presetValues5, presetValues6];

}

function draw() { //BEGIN DRAW
  background(0);
  voiceControlPitch();
  increaseDistortion();
  displayButtons();
  displayPresets();

  pitchDisplay = map(pitch, 0, pitch, 0, 100);
  push();
  translate(-width / 2, 0, 0);
  translate(pitchDisplay, 0, 0);
  fill(0, 255, 0)
  box(50)
  pop();

}


function voiceControlPitch() {
  if (playing) {
    // Audio stuff
    if (typeof pitch === 'number' && pitch < 1000) {
      if (button1.live === 1) {
        fmSynth1.frequency.value = pitch + 1000;
        fmSynth1.harmonicity.value = pitch / 100;

      }
      if (button2.live === 1) {
        fmSynth2.frequency.value = pitch + 1000;
        fmSynth2.harmonicity.value = pitch / 200;
      }
      if (button3.live === 1) {
        fmSynth3.frequency.value = pitch + 1000;
        fmSynth3.harmonicity.value = pitch / 300;
      }
      if (button4.live === 1) {
        fmSynth4.frequency.value = pitch + 1000;
        fmSynth4.harmonicity.value = pitch / 400;

      }
      if (button5.live === 1) {
        fmSynth5.frequency.value = pitch + 1000;
        fmSynth5.harmonicity.value = pitch / 500;
      }
      if (button6.live === 1) {
        fmSynth6.frequency.value = pitch + 1000;
        fmSynth6.harmonicity.value = pitch / 600;
      }
    } else if (typeof pitch === 'number') {
      if (button1.live === 1) {
        fmSynth1.frequency.value = pitch - 500 + 40;
      }
      if (button2.live === 1) {
        fmSynth2.frequency.value = pitch - 500 + 59;
      }
      if (button3.live === 1) {
        fmSynth3.frequency.value = pitch - 500 + 60;
      }
      if (button4.live === 1) {
        fmSynth4.frequency.value = pitch - 500 + 70;
      }
      if (button5.live === 1) {
        fmSynth5.frequency.value = pitch - 500 + 80;
      }
      if (button6.live === 1) {
        fmSynth6.frequency.value = pitch - 500 + 90;
      }
    }
  }
}

function displayPresets() {
  push();
  translate(-width / 2, -height / 2, 0);
  noStroke();
  presetDisplay1.display();
  presetDisplay2.display();
  presetDisplay3.display();
  presetDisplay4.display();
  presetDisplay5.display();
  presetDisplay6.display();
  pop();
}

function displayButtons() {
  push();
  translate(-width / 2, -height / 2, 0);
  noStroke();
  button1.display();
  button2.display();
  button3.display();
  button4.display();
  button5.display();
  button6.display();
  pop();
}

function increaseDistortion() {
  if (distCount < 100) {
    distCount += 0.1;
  } else {
    distCount = 3;
  }
}

function switchPreset(vals) {
  fmSynth1.frequency.value = vals.synth1Freq;
  fmSynth2.frequency.value = vals.synth2Freq;
  fmSynth3.frequency.value = vals.synth3Freq;
  fmSynth4.frequency.value = vals.synth4Freq;
  fmSynth5.frequency.value = vals.synth5Freq;
  fmSynth6.frequency.value = vals.synth6Freq;
}

function keyPressed() {

  if (keyCode === RIGHT_ARROW && presetCount < 5) {
    presetCount++
    switchPreset(presetsArray[presetCount]);
  } else if (keyCode === RIGHT_ARROW && presetCount === 5) {
    presetCount = 0;
    switchPreset(presetsArray[presetCount]);
  }
  if (keyCode === LEFT_ARROW && presetCount > 0) {
    presetCount--
    switchPreset(presetsArray[presetCount]);
  } else if (keyCode === LEFT_ARROW && presetCount === 0) {
    presetCount = 5;
    switchPreset(presetsArray[presetCount]);

  }

  if (!playing) {
    playing = true;
  }

  if (key === 'l') {
    if (presetCount === 0) {
      presetCount = 1;
    } else {
      presetCount = 0;
    }
  }

  if (key === 'p') {

    console.log(presetCount);

    if (presetCount === 0) {

      fmSynth1.triggerAttackRelease(40, 1200);
      fmSynth2.triggerAttackRelease(41, 1200);
      fmSynth3.triggerAttackRelease(42, 1200);
      fmSynth4.triggerAttackRelease(193, 1200);
      fmSynth5.triggerAttackRelease(194, 1200);
      fmSynth6.triggerAttackRelease(95, 1200);

    }

    if (presetCount === 1) {

      fmSynth1.frequency.value = 101;
      fmSynth2.frequency.value = 105;
      fmSynth3.frequency.value = 109;
      fmSynth4.frequency.value = 401;
      fmSynth5.frequency.value = 405;
      fmSynth6.frequency.value = 409;

    }
  }

  if (key === 'q') {
    if (button1.live === 0) {
      button1.live = 1;
    } else {
      button1.live = 0;
    }
  }
  if (key === 'w') {
    if (button2.live === 0) {
      button2.live = 1;
    } else {
      button2.live = 0;
    }
  }
  if (key === 'e') {
    if (button3.live === 0) {
      button3.live = 1;
    } else {
      button3.live = 0;
    }
  }
  if (key === 'r') {
    if (button4.live === 0) {
      button4.live = 1;
    } else {
      button4.live = 0;
    }
  }
  if (key === 't') {
    if (button5.live === 0) {
      button5.live = 1;
    } else {
      button5.live = 0;
    }
  }
  if (key === 'y') {
    if (button6.live === 0) {
      button6.live = 1;
    } else {
      button6.live = 0;
    }
  }
}

function mouseClicked() {

  if (mouseY > 0 && mouseY < 100) {
    if (mouseX < 100) {
      if (button1.live === 0) {
        button1.live = 1;
      } else {
        button1.live = 0;
      }
    }
    if (mouseX > 100 && mouseX < 200) {
      if (button2.live === 0) {
        button2.live = 1;
      } else {
        button2.live = 0;
      }
    }
    if (mouseX > 200 && mouseX < 300) {
      if (button3.live === 0) {
        button3.live = 1;
      } else {
        button3.live = 0;
      }
    }
    if (mouseX > 300 && mouseX < 400) {
      if (button4.live === 0) {
        button4.live = 1;
      } else {
        button4.live = 0;
      }
    }
    if (mouseX > 400 && mouseX < 500) {
      if (button5.live === 0) {
        button5.live = 1;
      } else {
        button5.live = 0;
      }
    }
    if (mouseX > 500 && mouseX < 600) {
      if (button6.live === 0) {
        button6.live = 1;
      } else {
        button6.live = 0;
      }
    }
  }
}

