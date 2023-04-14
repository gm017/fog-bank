

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
let cloud;
let compass;
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
let delay;

let presetBeat = false;

// let drone01, drone02, drone03, drone04, drone05, drone06, drone07, drone08, drone09, drone10, drone11, drone12, drone13, drone14, drone15, drone16, drone17, drone18;
// let dronesArray = [];

let pitchArray = [];

function preload() {
  fire = loadImage('img/fire.jpeg');
  cloud = loadImage('img/cloud.jpeg');
  compass = loadImage('img/compass.jpeg');
  qImg = loadImage('img/q.png');
  wImg = loadImage('img/w.png');
  eImg = loadImage('img/e.png');
  rImg = loadImage('img/r.png');
  tImg = loadImage('img/t.png');
  yImg = loadImage('img/y.png');
}

function setup() { //BEGIN SETUP
  createCanvas(600, 400, WEBGL);
  background(255, 100, 100);

  dist = new Tone.Chebyshev(distCount);
  delay = new Tone.FeedbackDelay("4n", 0.2);

  // lfo = new Tone.LFO("5hz", 200, 400).start();

  fmSynth1 = new Tone.FMSynth();
  fmSynth2 = new Tone.FMSynth();
  fmSynth3 = new Tone.FMSynth();
  fmSynth4 = new Tone.FMSynth();
  fmSynth5 = new Tone.FMSynth();
  fmSynth6 = new Tone.FMSynth();

  fmSynth1.chain(dist, Tone.Master);
  fmSynth2.chain(dist, Tone.Master);
  fmSynth3.chain(dist, Tone.Master);
  fmSynth4.chain(dist, Tone.Master);
  fmSynth5.chain(dist, Tone.Master);
  fmSynth6.chain(dist, Tone.Master);

  button1 = new SynthButton(0, 0, 100, qImg, false, true);
  button2 = new SynthButton(100, 0, 100, wImg, false, true);
  button3 = new SynthButton(200, 0, 100, eImg, false, true);
  button4 = new SynthButton(300, 0, 100, rImg, false, true);
  button5 = new SynthButton(400, 0, 100, tImg, false, true);
  button6 = new SynthButton(500, 0, 100, yImg, false, true);

  presetDisplay1 = new PresetDisplays(0, 100, 100, 255, false, 0);
  presetDisplay2 = new PresetDisplays(100, 100, 100, 255, false, 1);
  presetDisplay3 = new PresetDisplays(200, 100, 100, 255, false, 2);
  presetDisplay4 = new PresetDisplays(300, 100, 100, 255, false, 3);
  presetDisplay5 = new PresetDisplays(400, 100, 100, 255, false, 4);
  presetDisplay6 = new PresetDisplays(500, 100, 100, 255, false, 5);

  presetValues1 = new PresetValues(40, 41, 42, 193, 194, 95);
  presetValues2 = new PresetValues(101, 105, 109, 401, 405, 1223);
  presetValues3 = new PresetValues(200, 202, 209, 601, 605, 1211);
  presetValues4 = new PresetValues(301, 305, 309, 801, 805, 1220);
  presetValues5 = new PresetValues(401, 405, 409, 1001, 1005, 1277);
  presetValues6 = new PresetValues(501, 505, 509, 1201, 1205, 1277);

  presetsArray = [presetValues1, presetValues2, presetValues3, presetValues4, presetValues5, presetValues6];

  delayConnector = new DelayConnectors(0, 50, 25);
  distConnector = new DistConnectors(0, 200, 25);

}

function draw() { //BEGIN DRAW
  background(255, 100, 100);
  voiceControlPitch();
  increaseDistortion();
  displayButtons();
  delayConnector.display();
  // distConnector.display();
  displayPresets();

  //NEED TO FIX THIS

  // pitchDisplay = map(pitch, 0, pitch, 0, 100);
  // push();
  // translate(-width / 2, 0, 0);
  // translate(pitchDisplay, 0, 0);
  // fill(0, 255, 0)
  // box(50)
  // pop();

  if (presetBeat) {
    if (presetCount < 5) {
      if (frameCount % 30 === 0) {
        presetCount++;
        switchPreset(presetsArray[presetCount]);
      }
    } else if (frameCount % 30 === 0 && presetCount === 5) {
      presetCount = 0;
    }
  }
}


function voiceControlPitch() {
  if (playing) {
    // Audio stuff
    if (typeof pitch === 'number' && pitch < 1000) {
      if (button1.live === 1) {
        fmSynth1.frequency.value = pitch + 1000;
        fmSynth1.harmonicity.value = 0.5;

      }
      if (button2.live === 1) {
        fmSynth2.frequency.value = pitch + 1000;
        fmSynth2.harmonicity.value = 2;
      }
      if (button3.live === 1) {
        fmSynth3.frequency.value = pitch + 1000;
        fmSynth3.harmonicity.value = 3;
      }
      if (button4.live === 1) {
        fmSynth4.frequency.value = pitch + 1000;
        fmSynth4.harmonicity.value = 4.2;

      }
      if (button5.live === 1) {
        fmSynth5.frequency.value = pitch + 1000;
        fmSynth5.harmonicity.value = 5.1;
      }
      if (button6.live === 1) {
        fmSynth6.frequency.value = pitch + 1000;
        fmSynth6.harmonicity.value = 6.6;
      }
    } else if (typeof pitch === 'number') {
      if (button1.live === 1) {
        fmSynth1.frequency.value = pitch - 500 + 40;
        fmSynth1.harmonicity.value = -0.5;

      }
      if (button2.live === 1) {
        fmSynth2.frequency.value = pitch * 2 - 500 + 59;
        fmSynth2.harmonicity.value = -2;
      }
      if (button3.live === 1) {
        fmSynth3.frequency.value = pitch * 1.2 - 500 + 60;
        fmSynth3.harmonicity.value = -3;
      }
      if (button4.live === 1) {
        fmSynth4.frequency.value = pitch - 500 + 70;
        fmSynth4.harmonicity.value = -4.2;
      }
      if (button5.live === 1) {
        fmSynth5.frequency.value = pitch - 500 + 80;
        fmSynth5.harmonicity.value = -5.1;
      }
      if (button6.live === 1) {
        fmSynth6.frequency.value = pitch - 500 + 90;
        fmSynth6.harmonicity.value = -6.6;
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


  if (key === 'p') {

    console.log(presetCount);

    fmSynth1.triggerAttackRelease(40, 1200);
    fmSynth2.triggerAttackRelease(41, 1200);
    fmSynth3.triggerAttackRelease(42, 1200);
    fmSynth4.triggerAttackRelease(193, 1200);
    fmSynth5.triggerAttackRelease(194, 1200);
    fmSynth6.triggerAttackRelease(95, 1200);


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


  if (key === 'a') {
    if (button1.delayConnected) {
      button1.delayConnected = false;
      button2.delayConnected = false;
      button3.delayConnected = false;
      button4.delayConnected = false;
      button5.delayConnected = false;
      button6.delayConnected = false;
      delay.disconnect(fmSynth1);
    } else if (!button1.delayConnected && button1.distConnected) {
      button1.delayConnected = true;
      button2.delayConnected = true;
      button3.delayConnected = true;
      button4.delayConnected = true;
      button5.delayConnected = true;
      button6.delayConnected = true;
      fmSynth1.chain(dist, delay, Tone.Master);
    } else {
      button1.delayConnected = true;
      fmSynth1.chain(delay, Tone.Master);
    }
  }
  // if (key === 's') {
  //   if (button2.delayConnected) {
  //     button2.delayConnected = false;
  //     delay.disconnect(fmSynth2);
  //     fmSynth2.chain(dist, Tone.Master);
  //   } else {
  //     button2.delayConnected = true;
  //     fmSynth2.chain(dist, delay, Tone.Master);
  //   }
  // }
  // if (key === 'd') {
  //   if (button3.delayConnected) {
  //     button3.delayConnected = false;
  //     delay.disconnect(fmSynth3);
  //   } else {
  //     button3.delayConnected = true;
  //     fmSynth3.chain(dist, delay, Tone.Master);
  //   }
  // }
  // if (key === 'f') {
  //   if (button4.delayConnected) {
  //     button4.delayConnected = false;
  //     delay.disconnect(fmSynth4);
  //   } else {
  //     button4.delayConnected = true;
  //     fmSynth4.chain(dist, delay, Tone.Master);
  //   }
  // }
  // if (key === 'g') {
  //   if (button5.delayConnected) {
  //     button5.delayConnected = false;
  //     delay.disconnect(fmSynth5);
  //   } else {
  //     button5.delayConnected = true;
  //     fmSynth5.chain(dist, delay, Tone.Master);
  //   }
  // }
  // if (key === 'h') {
  //   if (button6.delayConnected) {
  //     button6.delayConnected = false;
  //     delay.disconnect(fmSynth6);
  //   } else {
  //     button6.delayConnected = true;
  //     fmSynth6.chain(dist, delay, Tone.Master);
  //   }
  // }

  // if (key === 'z') {
  //   if (button1.distConnected && button1.delayConnected) {
  //     button1.distConnected = false;
  //     dist.disconnect(fmSynth1);
  //     fmSynth1.chain(delay, Tone.Master);
  //   } else if (button1.distConnected && !button1.delayConnected) {
  //     button1.distConnected = false;
  //     dist.disconnect(fmSynth1);
  //     fmSynth1.chain(Tone.Master);
  //   } else if (!button1.distConnected && button1.delayConnected) {
  //     button1.distConnected = true;
  //     fmSynth1.chain(dist, delay, Tone.Master);
  //   } else if (!button1.distConnected && !button1.delayConnected) {
  //     button1.distConnected = true;
  //     fmSynth1.chain(dist, Tone.Master);
  //   }
  // }

}

function mouseClicked() {


  if (mouseY > 300) {
    presetBeat = true;
  }

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

