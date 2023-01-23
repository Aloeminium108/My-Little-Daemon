import { CollisionBody } from "../component/collisionbody.js";
import { Hitbox } from "../component/hitbox.js";
import { Velocity } from "../component/velocity.js";
import { Entity } from "./entity.js";
class Ball extends Entity {
    constructor(x, y) {
        super();
        this.addPhysicsBody(x, y, 1, Ball.spriteSource)
            .then(() => {
            this.addMouseGrab();
            this.addComponent(new CollisionBody(this.getComponent(Hitbox), this.getComponent(Velocity)));
        });
    }
}
Ball.spriteSource = './assets/ball.png';
export { Ball };
