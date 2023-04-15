class PresetDisplays {
    constructor(xPos, yPos, size, col, isActive, isSelected) {
        this.xPos = xPos; //x Position
        this.yPos = yPos; //y Position
        this.size = size; //Size of the square
        this.col = col; //Colour of the square
        this.isActive = isActive; //Takes a boolean value to toggle the active choice
        this.isSelected = isSelected; //Checks if the selected display matches the preset count value and changes isActive state depending on the outcome
        this.moveRect = 0; //Used to control the animation of the moving lines
    }
    display() {

        //Moves the lines within the square by increasing the variable and resetting if it reaches 105
        if (this.moveRect < 105) {
            this.moveRect++;
        } else {
            this.moveRect = 0;
        }

        //Logic for toggling active state
        if (this.isSelected === presetCount) {
            this.isActive = true;
        } else {
            this.isActive = false;
        }
        //Changes colour based on state
        if (!this.isActive) {
            fill(this.col);
        }
        if (this.isActive) {
            fill(255, 255, 0);
        }
        rect(this.xPos, this.yPos, this.size, this.size);
        //Changes colour of active display and draws the animated lines
        if (this.isActive) {
            fill(255, 0, 255);
            rect(this.xPos, this.yPos + this.moveRect, this.size, this.size / 70);
            rect(this.xPos, this.yPos + 100 - this.moveRect, this.size, this.size / 70);
            rect(this.xPos + this.moveRect, this.yPos, this.size / 70, this.size);
            rect(this.xPos + 100 - this.moveRect, this.yPos, this.size / 70, this.size);
        }
    }
}