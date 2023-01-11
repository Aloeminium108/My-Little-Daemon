import { OrderingComponent } from "./component.js";
class MouseInteractable extends OrderingComponent {
    constructor(sprite) {
        super(-sprite.index);
        this.hover = 'grab';
        this.hold = 'grabbing';
    }
}
export { MouseInteractable };
