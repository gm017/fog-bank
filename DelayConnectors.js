class DelayConnectors {
    constructor(xPos, yPos, size) {
        this.xPos = xPos; //x Position
        this.yPos = yPos; //y Position
        this.size = size; // Size of spehre
        this.moveSphere = -350; //Variable used to animate the sphere
    }
    display() {
        //Logic for animation of the sphere
        if (this.moveSphere < 350) {
            this.moveSphere++;
        } else {
            this.moveSphere = -350;
        }

        //Draws sphere and animates sphere by translating using the above variable.
        push();
        noStroke();
        translate(this.xPos + this.moveSphere, this.yPos + 50, 0);
        translate(0, -50, 0);
        rotateY(frameCount * 0.1);
        rotateX(frameCount * 0.2);
        rotateZ(frameCount * 0.1);
        texture(cloud);
        sphere(this.size);
        pop();
        stroke(255);

        //Checks state of the button objects and draws a line between the two objects if buttonx.delayConnected is true.
        if (button1.delayConnected) {
            line(this.xPos + this.moveSphere, this.yPos, -250, -150);
        }
        if (button2.delayConnected) {
            line(this.xPos + this.moveSphere, this.yPos, -150, -150);
        }
        if (button3.delayConnected) {
            line(this.xPos + this.moveSphere, this.yPos, -50, -150);
        }
        if (button4.delayConnected) {
            line(this.xPos + this.moveSphere, this.yPos, 50, -150);
        }
        if (button5.delayConnected) {
            line(this.xPos + this.moveSphere, this.yPos, 150, -150);
        }
        if (button6.delayConnected) {
            line(this.xPos + this.moveSphere, this.yPos, 250, -150);
        }
    }

}