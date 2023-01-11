import { OrderingComponent } from "./component.js";
class Sprite extends OrderingComponent {
    constructor(index, draw) {
        super(index);
        this.draw = draw;
    }
}
export { Sprite };
