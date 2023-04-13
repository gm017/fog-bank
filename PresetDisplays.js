class PresetDisplays {
    constructor(xPos, yPos, size, col, isActive, isSelected) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.col = col;
        this.isActive = isActive;
        this.isSelected = isSelected;
        this.moveRect = 0;
    }
    display() {
        if (this.moveRect < 105) {
            this.moveRect++;
        } else {
            this.moveRect = 0;
        }

        if (this.isSelected === presetCount) {
            this.isActive = true;
        } else {
            this.isActive = false;
        }
        if (!this.isActive) {
            fill(this.col);
        }
        if (this.isActive) {
            fill(255, 255, 0);
        }
        rect(this.xPos, this.yPos, this.size, this.size);
        if (this.isActive) {
            fill(255, 0, 255);
            rect(this.xPos, this.yPos + this.moveRect, this.size, this.size / 70);
            rect(this.xPos, this.yPos + 100 - this.moveRect, this.size, this.size / 70);
            rect(this.xPos + this.moveRect, this.yPos, this.size / 70, this.size);
            rect(this.xPos + 100 - this.moveRect, this.yPos, this.size / 70, this.size);
        }
    }
}