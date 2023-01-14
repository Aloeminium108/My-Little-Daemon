import { Consumable } from "../component/consumable.js";
import { Entity } from "./entity.js";
class Apple extends Entity {
    constructor(x, y) {
        super();
        let image = new Image();
        image.onload = () => {
            createImageBitmap(image).then((sprite) => {
                this.addPhysicsBody(x, y, 1, sprite);
                this.addMouseGrab();
                this.addComponent(new Consumable(20));
            });
        };
        image.src = Apple.spriteSource;
    }
}
Apple.spriteSource = '../../assets/apple.png';
export { Apple };
