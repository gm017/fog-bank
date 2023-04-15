//This is the class from which the 'buttons' at the top of the screen are created. 
class SynthButton {
    constructor(xPos, yPos, size, boxTexture, delayConnected, distConnected) {
        this.xPos = xPos; //x Position
        this.yPos = yPos; // y Position
        this.size = size; //Size of the cube
        this.live = 0; // Live state
        this.boxTexture = boxTexture; //Cube texture
        this.delayConnected = delayConnected; //Takes a boolean value which controls the state of connection to the delay effect
        this.distConnected = distConnected; //Takes a bollean value which controls the state of connection to the distortion effect
    }

    //Changes the colour of the background square if the object is 'live'.
    display() {
        if (this.live === 0) {
            fill(255, 0, 130);
        } else {
            fill(0, 255, 0);
        }

        rect(this.xPos, this.yPos, this.size, this.size);

        //Changes the texture and rotation of the cube dependong on live state.
        push();
        fill(0);
        translate(50, 0, 0);
        translate(this.xPos, 50, 0);
        if (this.live === 1) {
            rotateX(frameCount / 100);
            rotateY(frameCount / 100);
            texture(fire);
        }
        if (this.live === 0) {
            texture(this.boxTexture);
            rotateX(frameCount / 200);
            rotateZ(frameCount / 200);
        }
        box(25);
        pop();
    }
}
