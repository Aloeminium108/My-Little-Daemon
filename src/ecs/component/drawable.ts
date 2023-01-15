import { Component } from "./component.js";

class Drawable extends Component {
    constructor(public draw: (x: number, y: number, ctx: CanvasRenderingContext2D) => void) {
        super()
    }
}

export {Drawable}