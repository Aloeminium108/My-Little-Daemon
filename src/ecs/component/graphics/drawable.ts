import { Component } from "../component.js";

class Drawable extends Component {
    constructor(public draw: (ctx: CanvasRenderingContext2D) => void) {
        super()
    }
}

export {Drawable}