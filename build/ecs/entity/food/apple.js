import { Consumable } from "../../component/gameplay/consumable.js";
import { CollisionBody } from "../../component/physics/collisionbody.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { Velocity } from "../../component/physics/velocity.js";
import { Entity } from "../entity.js";
class Apple extends Entity {
    constructor(x, y) {
        super();
        this.addPhysicsBody(x, y, 1, Apple.spriteSource)
            .then(() => {
            this.addMouseGrab();
            this.addComponent(new Consumable(200));
            this.addComponent(new CollisionBody(this.getComponent(Hitbox), this.getComponent(Velocity)));
        });
    }
}
Apple.spriteSource = './assets/apple.png';
export { Apple };
