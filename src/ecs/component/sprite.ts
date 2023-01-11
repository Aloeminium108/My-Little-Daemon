import { OrderingComponent } from "./component.js"

class Sprite extends OrderingComponent {
    constructor(index: number, public draw: (ctx: CanvasRenderingContext2D) => void) {
        super(index)
    }
}

export {Sprite}