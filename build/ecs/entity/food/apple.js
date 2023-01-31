import { Consumable } from "../../component/gameplay/consumable.js";
import { Entity } from "../entity.js";
class Apple extends Entity {
    constructor(x, y) {
        super();
        this.addPhysicsBody(x, y, 1, Apple.spriteSource)
            .then(() => {
            this.addMouseGrab();
            this.addComponent(new Consumable(200));
        });
    }
}
Apple.spriteSource = './assets/apple.png';
export { Apple };
