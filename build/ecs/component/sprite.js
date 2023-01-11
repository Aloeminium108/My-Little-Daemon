import { OrderingComponent } from "./component.js";
class Sprite extends OrderingComponent {
    constructor(index, sprite) {
        super(index);
        this.sprite = sprite;
    }
}
export { Sprite };
