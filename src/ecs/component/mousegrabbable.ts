import { OrderingComponent } from "./component.js";
import { Sprite } from "./sprite.js";

class MouseGrabbable extends OrderingComponent {
    constructor(sprite: Sprite) {
        super(-sprite.index)
    }
}

export {MouseGrabbable}