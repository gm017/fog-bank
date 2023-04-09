
let pitchArray = [];

setInterval(() => {
    if (typeof pitch === 'number') {
        pitchArray.push(Math.round(pitch));
    }
}, 500);

