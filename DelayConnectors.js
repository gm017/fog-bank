class DelayConnectors {
    constructor(xPos, yPos, size) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.moveSphere = -350;
    }
    display() {
        if (this.moveSphere < 350) {
            this.moveSphere++;
        } else {
            this.moveSphere = -350;
        }

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