/* -FOG BANK (XMAS VERSION)-

-Gabriel Manzi-

loud voice-controlled instrument for improvised performances

INSTRUCTIONS:

Start it up by pressing 'p'. The drones will play on for a while. If they stop you can press 'p' again.

Click the 'GET MICROPHNONE' button to give the broser access to the mic.

QWERTY keys toggle "live mode" for each tone. When these are active you can control the pitch of the tone with your voice (through a microphone). 
Once set, the frequency is locked in if you make it unlive until you change to a different preset (explained below).
You can see that it's in "live mode" if the texture on the cube changes from the letter to fire.
(Try whistling, hissing and sucking in air with gritted teeth for high frequencies. Outcomes probably differ from mouth to mouth.)

Left and right arrow keys change presets. This will affect all tones not currently in "live mode".

's' key toggles the delay effect on all the sounds. You can see this is active if the white lines are connecting the cloud globe at the bottom to the tone cubes at the top.


ACKNOWLEDGMENTS:

Pitch detection stuff is all taken from https://github.com/cwilso/PitchDetect. This is in js/pitchdetect.js and some of the index.html. 

*/

// let pitchDisplay;

//Toggles on when key 'p' is pressed so we know we're on
let playing = false;

//Decalare varibales for objects.
let button1;
let button2;
let button3;
let button4;
let button5;
let button6;

let dist;
let delay;
let synth;
let limiter;

let fmSynth1;
let fmSynth2;
let fmSynth3;
let fmSynth4;
let fmSynth5;
let fmSynth6;

let presetDisplay1;
let presetDisplay2;
let presetDisplay3;
let presetDisplay4;
let presetDisplay5;
let presetDisplay6

//Declare varirables for texture images.
let fire;
let cloud;
let compass;
let shield;
let qImg;
let wImg;
let eImg;
let rImg;
let tImg;
let yImg;

//Decalre variables 
let screenRotateCount = 0;
let makeRotation = false;
let makeRotation2 = false;

//Controls the intensity of the distortion. 
let distCount = 3;

//Declare varibales related to preset settings.
let presetCount = 0;
let presetsArray = [];
let presetBeat = false;

function preload() {
  fire = loadImage('img/fire.jpeg');
  cloud = loadImage('img/cloud.jpeg');
  compass = loadImage('img/compass.jpeg');
  shield = loadImage('img/shield.jpeg');
  qImg = loadImage('img/q.png');
  wImg = loadImage('img/w.png');
  eImg = loadImage('img/e.png');
  rImg = loadImage('img/r.png');
  tImg = loadImage('img/t.png');
  yImg = loadImage('img/y.png');
}

function setup() {
  createCanvas(600, 400, WEBGL);
  background(255, 100, 100);

  //Tone.js stuff. Creates synths and effects and sends them to the master.
  dist = new Tone.Chebyshev(distCount);
  delay = new Tone.FeedbackDelay("4n", 0.2);

  limiter = new Tone.Limiter(-20).toMaster();

  fmSynth1 = new Tone.FMSynth();
  fmSynth2 = new Tone.FMSynth();
  fmSynth3 = new Tone.FMSynth();
  fmSynth4 = new Tone.FMSynth();
  fmSynth5 = new Tone.FMSynth();
  fmSynth6 = new Tone.FMSynth();

  fmSynth1.chain(dist, limiter, Tone.Master);
  fmSynth2.chain(dist, limiter, Tone.Master);
  fmSynth3.chain(dist, limiter, Tone.Master);
  fmSynth4.chain(dist, limiter, Tone.Master);
  fmSynth5.chain(dist, limiter, Tone.Master);
  fmSynth6.chain(dist, limiter, Tone.Master);

  //Create buttons at the top with the floating cubes from the SynthButton class. These represent the six tones playing.
  button1 = new SynthButton(0, 0, 100, qImg, false, true);
  button2 = new SynthButton(100, 0, 100, wImg, false, true);
  button3 = new SynthButton(200, 0, 100, eImg, false, true);
  button4 = new SynthButton(300, 0, 100, rImg, false, true);
  button5 = new SynthButton(400, 0, 100, tImg, false, true);
  button6 = new SynthButton(500, 0, 100, yImg, false, true);

  //Create displays from the PresetDisplays class showing which preset is currently selected.
  presetDisplay1 = new PresetDisplays(0, 100, 100, 255, false, 0);
  presetDisplay2 = new PresetDisplays(100, 100, 100, 255, false, 1);
  presetDisplay3 = new PresetDisplays(200, 100, 100, 255, false, 2);
  presetDisplay4 = new PresetDisplays(300, 100, 100, 255, false, 3);
  presetDisplay5 = new PresetDisplays(400, 100, 100, 255, false, 4);
  presetDisplay6 = new PresetDisplays(500, 100, 100, 255, false, 5);

  //PresetValues class is used to create objects which contain the values for the six preset settings.
  presetValues1 = new PresetValues(40, 41, 42, 193, 194, 95);
  presetValues2 = new PresetValues(101, 105, 109, 401, 405, 1223);
  presetValues3 = new PresetValues(200, 202, 209, 601, 605, 1211);
  presetValues4 = new PresetValues(301, 305, 309, 801, 805, 1220);
  presetValues5 = new PresetValues(401, 405, 409, 1001, 1005, 1277);
  presetValues6 = new PresetValues(501, 505, 509, 1201, 1205, 1277);

  //Array contains the objects created previously.
  presetsArray = [presetValues1, presetValues2, presetValues3, presetValues4, presetValues5, presetValues6];

  //Object from the DelayConnectors class which shows whether the delay effect is connected to the synths with the floating cloud globe.
  delayConnector = new DelayConnectors(0, 50, 25);

  //Object from teh DistConnectors class which shows whether the distortion effect is connected to the synths with the floating compass globe.
  distConnector = new DistConnectors(0, 200, 25, 0);
}

function draw() { //BEGIN DRAW
  background(255, 100, 100);


  //Functions to occur during the draw loop.
  rotateScreenRight();
  rotateScreenLeft();
  voiceControlPitch();
  displayButtons();
  delayConnector.display();
  displayPresets();
  distConnector.display();
  distConnector.distortionShapes();

  //NEED TO FIX THIS

  // pitchDisplay = map(pitch, 300, 2000, 0, 300);
  // push();
  // translate(-width / 2, 0, 0);
  // translate(pitchDisplay, 0, 0);
  // fill(0, 255, 0)
  // box(50)
  // pop();

  // if (presetBeat) {
  //   if (presetCount < 5) {
  //     if (frameCount % 30 === 0) {
  //       presetCount++;
  //       switchPreset(presetsArray[presetCount]);
  //     }
  //   } else if (frameCount % 30 === 0 && presetCount === 5) {
  //     presetCount = 0;
  //   }
  // }
}

//Takes the pitch from the users microphone and uses it to alter the frequencies of the synths. 
//The functionality of the pitch detection is from https://github.com/cwilso/PitchDetect and can be found in 'js/pitchdetect.js'
function voiceControlPitch() {
  if (playing) {
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

//Displays the floating cubes which represent each of the six tones playing. (Row 1)
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

//Displays the preset selection indicator. The selected preset is represented by the yellow square with moving red lines. (Row 2)
//They can be cycled through with the left and right arrow keys.
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

// NEED TO FIX
function increaseDistortion() {
  if (distCount < 100) {
    distCount += 0.3;
  } else {
    distCount = 3;
  }
}

//When the user changes to a new preset, this assigns new frequency values to the synths from presetsArray, which contains the objects with the values.
function switchPreset(vals) {
  fmSynth1.frequency.value = vals.synth1Freq;
  fmSynth2.frequency.value = vals.synth2Freq;
  fmSynth3.frequency.value = vals.synth3Freq;
  fmSynth4.frequency.value = vals.synth4Freq;
  fmSynth5.frequency.value = vals.synth5Freq;
  fmSynth6.frequency.value = vals.synth6Freq;
}

//Rotates the display 360 degrees anti-clockwise when the preset selection loops round from the right side to the left side.
function rotateScreenRight() {
  if (makeRotation === true) {
    screenRotateCount += 6;
    if (screenRotateCount < 720) {
      screenRotateCount += 2;
      rotateY(radians(screenRotateCount));
    }
    if (screenRotateCount === 360) {
      screenRotateCount = 0;
      makeRotation = false;
    }
  }
}

//Rotates the display 360 degrees clockwise when the preset selection loops round from the left side to the right side.
function rotateScreenLeft() {
  if (makeRotation2 === true) {
    screenRotateCount -= 6;
    if (screenRotateCount > -360) {
      screenRotateCount -= 2;
      rotateY(radians(screenRotateCount));
    }
    if (screenRotateCount === -360) {
      screenRotateCount = 0;
      makeRotation2 = false;
    }
  }
}

function keyPressed() {
  //Cycles through the presets with the right and left arrow keys. This also controls the screen rotation if the user loops from one edge to the other.
  if (keyCode === RIGHT_ARROW && presetCount < 5) {
    presetCount++
    switchPreset(presetsArray[presetCount]);
  } else if (keyCode === RIGHT_ARROW && presetCount === 5) {
    presetCount = 0;
    if (screenRotateCount === 0) {
      makeRotation = true;
    }
    switchPreset(presetsArray[presetCount]);
  }
  if (keyCode === LEFT_ARROW && presetCount > 0) {
    presetCount--
    switchPreset(presetsArray[presetCount]);
  } else if (keyCode === LEFT_ARROW && presetCount === 0) {
    presetCount = 5;
    if (screenRotateCount === 0) {
      makeRotation2 = true;
    }
    switchPreset(presetsArray[presetCount]);
  }

  if (!playing) {
    playing = true;
  }

  //Pressing 'p' begins the sound with initial settings.
  if (key === 'p') {
    fmSynth1.triggerAttackRelease(40, 1200);
    fmSynth2.triggerAttackRelease(41, 1200);
    fmSynth3.triggerAttackRelease(42, 1200);
    fmSynth4.triggerAttackRelease(193, 1200);
    fmSynth5.triggerAttackRelease(194, 1200);
    fmSynth6.triggerAttackRelease(95, 1200);
  }


  //QWERTY keys toggle wether each synth is in 'live mode'. When this is active, the frequency of the tone is controlled by the users voice. 
  //This changes a value in the button objects and also changes their appearance to indicate that the synth is in 'live mode'.
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

  //Pressing the 'a' key toggles the synths being connected to the delay effect. 
  //This changes a value in the button objects, which tells the delayConnector object to draw a line between the two showing that it is active.
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
      fmSynth1.chain(dist, delay, limiter, Tone.Master);
    } else {
      button1.delayConnected = true;
      fmSynth1.chain(delay, limiter, Tone.Master);
    }
  }

  if (key === 'd' && distConnector.moveSphere > -350 && distConnector.moveSphere < 350) {
    distConnector.changeLevel();
  }
}

function mouseClicked() {

  //Mouse clicks can be used to toggle 'live mode' on the synths as an alternative to using the QWERTY keys.
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

