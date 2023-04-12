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

let distCount = 3;

let dist;

let drone01, drone02, drone03, drone04, drone05, drone06, drone07, drone08, drone09, drone10, drone11, drone12, drone13, drone14, drone15, drone16, drone17, drone18;

let pitchArray = [];

let dronesArray = [];

function preload() {

}

function setup() {
  createCanvas(600, 100, WEBGL);
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


  if (distCount < 100) {
    distCount += 0.1;
  } else {
    distCount = 3;
  }

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

function keyPressed() {

  if (key === 'p') {

    if (!ready) {
      ready = true;
    }

    fmSynth1.triggerAttackRelease(30, 1200)
    fmSynth2.triggerAttackRelease(40, 1200)
    fmSynth3.triggerAttackRelease(50, 1200)
    fmSynth4.triggerAttackRelease(60, 1200)
    fmSynth5.triggerAttackRelease(70, 1200)
    fmSynth6.triggerAttackRelease(80, 1200)

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

  if (mouseY > 0) {
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