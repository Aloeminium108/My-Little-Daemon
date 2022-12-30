class Body {
    constructor(x, y, width, height) {
        this.held = false;
        this.draw = (callback) => {
            callback(this.x, this.y);
        };
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    moveTo(newX, newY) {
        this.x = Math.floor(newX - this.width / 2);
        this.y = Math.floor(newY - this.height / 2);
    }
    inside(x, y) {
        if (x > this.x
            && x < this.x + this.width
            && y > this.y
            && y < this.y + this.height) {
            return true;
        }
        else {
            return false;
        }
    }
    release() {
        this.held = false;
    }
}
export { Body };
