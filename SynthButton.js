class SynthButton {
    constructor(xPos, yPos, size, boxTexture, delayConnected, distConnected) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.live = 0;
        this.boxTexture = boxTexture;
        this.delayConnected = delayConnected;
        this.distConnected = distConnected;
    }
    display() {
        if (this.live === 0) {
            fill(255, 0, 130);
        } else {
            fill(0, 255, 0);
        }

        rect(this.xPos, this.yPos, this.size, this.size);

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
