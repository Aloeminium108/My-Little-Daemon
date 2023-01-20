import { Component } from "./component.js";
class Hitbox extends Component {
    constructor(position, width, height) {
        super();
        this.position = position;
        this.width = width;
        this.height = height;
        this.inside = (x, y) => {
            if (x > this.position.x
                && x < this.position.x + this.width
                && y > this.position.y
                && y < this.position.y + this.height) {
                return true;
            }
            else {
                return false;
            }
        };
        this.insideLastFrame = (x, y) => {
            if (x > this.position.lastX
                && x < this.position.lastX + this.width
                && y > this.position.lastY
                && y < this.position.lastY + this.height) {
                return true;
            }
            else {
                return false;
            }
        };
        this.moveCenterTo = (x, y) => {
            this.position.x = Math.floor(x - this.width / 2);
            this.position.y = Math.floor(y - this.height / 2);
        };
    }
    get x() {
        return this.position.x;
    }
    get y() {
        return this.position.y;
    }
    set x(x) {
        this.position.x = x;
    }
    set y(y) {
        this.position.y = y;
    }
    get center() {
        return {
            x: Math.floor(this.position.x + this.width / 2),
            y: Math.floor(this.position.y + this.height / 2)
        };
    }
}
export { Hitbox };
