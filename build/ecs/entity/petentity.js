import { Consumer } from "../component/consumable.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { Sprite } from "../component/sprite.js";
import { Entity } from "./entity.js";
class PetEntity extends Entity {
    constructor(x, y, petStats) {
        super();
        let image = new Image();
        image.onload = () => {
            createImageBitmap(image).then((sprite) => {
                this.addPhysicsBody(x, y, 0, sprite);
                this.addComponent(new MouseInteractable(this.getComponent(Sprite)));
                this.addComponent(new Consumer(petStats));
            });
        };
        image.src = PetEntity.spriteSource;
    }
}
PetEntity.spriteSource = '../../assets/bird.png';
export { PetEntity };
