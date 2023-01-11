import { OrderingComponent } from "./component.js";
class MouseGrabbable extends OrderingComponent {
    constructor(sprite) {
        super(-sprite.index);
    }
}
export { MouseGrabbable };
