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
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
}
Body.detectCollision = (body1, body2) => {
    if (body1.x < body2.x + body2.width
        && body1.x + body1.width > body2.x
        && body1.y < body2.y + body2.height
        && body1.y + body1.height > body2.y) {
        return true;
    }
    else {
        return false;
    }
};
export { Body };
