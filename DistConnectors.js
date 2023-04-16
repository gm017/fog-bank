class DistConnectors {
    constructor(xPos, yPos, size, distLvl) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.moveSphere = -350;
        this.distLvl = distLvl;
        this.isHome = true;
        this.justParried = false;
    }
    display() {

        let awayColour = color(0, 255, 0);
        let homeColour = color(255, 100, 255);

        if (!this.justParried) {
            if (this.moveSphere > -350) {
                this.moveSphere -= 2.3;
            } else {
                this.moveSphere = 350;
            }
        }
        if (this.justParried) {
            if (this.moveSphere < 350) {
                this.moveSphere += 2.3;
            }
        }
        if (this.justParried && this.moveSphere >= 275) {
            this.justParried = false;
        }

        noStroke();
        fill(30, 50, 70);
        rect(-300, 100, 600, 100);
        if (this.isHome) {
            fill(homeColour);

        } else {
            fill(awayColour);
        }

        rect(-300, 100, 100, 100);

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

        this.distLvl = Math.round(map(this.xPos + this.moveSphere, -352, 350, 3, 85));

    }
    changeLevel() {
        console.log(this.distLvl);

        if (this.moveSphere < -220) {
            dist.set('order', 3);
            if (!this.isHome) {
                this.isHome = true;
                this.justParried = true;
            }
        } else {
            dist.set('order', this.distLvl);
            this.isHome = false;
        }
    }
    distortionShapes() {
        if (this.isHome) {
            push();
            noStroke();
            translate(-250, 150, 0);
            rotateX(frameCount * 0.1);
            texture(shield)
            sphere(20);
            pop();
        }

        push();
        noStroke();
        translate(0, 190, 10);
        rotateX(frameCount * 0.1);
        texture(shield)
        box(600, 35, 10);
        pop();

    }
}




// if ((this.xPos + this.moveSphere) < -250) {
//     dist.set('order', 3);
// }
// if ((this.xPos + this.moveSphere) >= -250 && (this.xPos + this.moveSphere) < -150) {
//     dist.set('order', 16);
// }
// if ((this.xPos + this.moveSphere) >= 150 && (this.xPos + this.moveSphere) < 250) {
//     dist.set('order', 26);
// }
// if ((this.xPos + this.moveSphere) >= 250 && (this.xPos + this.moveSphere) < 350) {
//     dist.set('order', 5);
// }
// if ((this.xPos + this.moveSphere) >= 350 && (this.xPos + this.moveSphere) < 450) {
//     dist.set('order', 15);
// }
// if ((this.xPos + this.moveSphere) >= 450 && (this.xPos + this.moveSphere) < 550) {
//     dist.set('order', 15);
// }