import { OrderingComponent } from "../component.js";
import { Sprite } from "../graphics/sprite.js";

class MouseInteractable extends OrderingComponent {

    public hover: string = 'grab'
    public hold: string = 'grabbing'

    constructor(sprite: Sprite) {
        super(-sprite.index)
    }
}

export {MouseInteractable}