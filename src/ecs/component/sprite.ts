import { OrderingComponent } from "./component.js"

class Sprite extends OrderingComponent {
    constructor(index: number, public sprite: ImageBitmap) {
        super(index)
    }
}

export {Sprite}