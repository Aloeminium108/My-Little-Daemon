import { CollisionBody } from "../component/collisionbody.js";
import { Hitbox } from "../component/hitbox.js";
import { Velocity } from "../component/velocity.js";
import { Entity } from "./entity.js";

class Ball extends Entity {

    private static spriteSource = './assets/ball.png'

    constructor(x: number, y: number) {
        super()
        this.addPhysicsBody(x, y, 1, Ball.spriteSource)
        .then(() => {
            this.addMouseGrab()
            this.addComponent(new CollisionBody(this.getComponent(Hitbox), this.getComponent(Velocity)))
        })
        
    }

}

export {Ball}