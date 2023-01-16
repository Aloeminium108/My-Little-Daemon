import { Consumer } from "../component/consumable.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { Sprite } from "../component/sprite.js";
import { Entity } from "./entity.js";
class PetEntity extends Entity {
    constructor(x, y, petStats) {
        super();
        this.addPhysicsBody(x, y, 0, PetEntity.spriteSource)
            .then(() => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)));
            this.addComponent(new Consumer(petStats));
        });
    }
}
PetEntity.spriteSource = '../../assets/bird.png';
export { PetEntity };
