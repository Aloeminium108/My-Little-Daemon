class Body {
    constructor(x, y, width, height) {
        this.held = false;
        this.draw = (callback) => {
            callback(Math.round(this.x), Math.round(this.y));
        };
        this.moveTo = (newX, newY) => {
            this.x = Math.floor(newX - this.width / 2);
            this.y = Math.floor(newY - this.height / 2);
        };
        this.inside = (x, y) => {
            if (x > this.x
                && x < this.x + this.width
                && y > this.y
                && y < this.y + this.height) {
                return true;
            }
            else {
                return false;
            }
        };
        this.release = () => {
            this.held = false;
        };
        this.detectCollision = (otherBody) => {
            if (this.x < otherBody.x + otherBody.width
                && this.x + this.width > otherBody.x
                && this.y < otherBody.y + otherBody.height
                && this.y + this.height > otherBody.y) {
                return true;
            }
            else {
                return false;
            }
        };
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
}
export { Body };
