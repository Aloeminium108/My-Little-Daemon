import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Sprite } from "../component/sprite.js";
import { Entity } from "./entity.js";
class Ball extends Entity {
    constructor(x, y) {
        super();
        let image = new Image();
        image.onload = () => {
            createImageBitmap(image).then((sprite) => {
                this.addPhysicsBody(x, y, sprite);
                this.addComponent(new MouseGrabbable(this.getComponent(Sprite)));
            });
        };
        image.src = '../../assets/ball.png';
    }
}
export { Ball };
