import { Component } from "../component.js";
class Position extends Component {
    constructor(x, y) {
        super();
        this.moveTo = (x, y) => {
            this.x = x;
            this.y = y;
        };
        this._x = x;
        this._y = y;
        this._lastX = x;
        this._lastY = y;
    }
    set x(value) {
        this._lastX = this._x;
        this._x = value;
    }
    set y(value) {
        this._lastY = this._y;
        this._y = value;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get lastX() {
        return this._lastX;
    }
    get lastY() {
        return this._lastY;
    }
    static swap(position1, position2) {
        let tempX = position1.x;
        let tempY = position1.y;
        position1.x = position2.x;
        position1.y = position2.y;
        position2.x = tempX;
        position2.y = tempY;
    }
}
export { Position };
