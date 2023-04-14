class DistConnectors {
    constructor(xPos, yPos, size) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.moveSphere = -350;
    }
    display() {
        if (this.moveSphere > -350) {
            this.moveSphere -= 2.3;
        } else {
            this.moveSphere = 350;
        }

        noStroke();
        fill(30, 50, 70);
        rect(-300, 100, 600, 100);

        push();
        noStroke();
        translate(this.xPos + this.moveSphere, this.yPos, 0);
        translate(0, 0, 0);
        translate(0, -50, 0);
        rotateY(frameCount * 0.1);
        rotateX(frameCount * 0.2);
        // rotateZ(frameCount * 0.1);
        texture(compass);
        sphere(this.size);
        pop();

        stroke(255);

        if (button1.distConnected) {
            line(this.xPos + this.moveSphere, this.yPos - 50, -250, -150);
        }
        if (button2.distConnected) {
            line(this.xPos + this.moveSphere, this.yPos - 50, -150, -150);
        }
        if (button3.distConnected) {
            line(this.xPos + this.moveSphere, this.yPos - 50, -50, -150);
        }
        if (button4.distConnected) {
            line(this.xPos + this.moveSphere, this.yPos - 50, 50, -150);
        }
        if (button5.distConnected) {
            line(this.xPos + this.moveSphere, this.yPos - 50, 150, -150);
        }
        if (button6.distConnected) {
            line(this.xPos + this.moveSphere, this.yPos - 50, 250, -150);
        }


    }
}