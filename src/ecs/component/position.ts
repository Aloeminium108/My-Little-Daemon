import { Component } from "./component.js";

class Position extends Component {

    private _x: number
    private _y: number
    private _lastX: number
    private _lastY:number

    constructor(x: number, y: number) {
        super()
        this._x = x
        this._y = y
        this._lastX = x
        this._lastY = y
    }

    moveTo = (x: number, y: number) => {
        this.x = x
        this.y = y
    }

    public set x(value: number) {
        this._lastX = this._x
        this._x = value
    }

    public set y(value: number) {
        this._lastY = this._y
        this._y = value
    }

    public get x() {
        return this._x
    }

    public get y() {
        return this._y
    }

    public get lastX() {
        return this._lastX
    }

    public get lastY() {
        return this._lastY
    }

}

export {Position}