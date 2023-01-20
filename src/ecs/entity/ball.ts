import { Hitbox } from "../component/hitbox.js";
import { Entity } from "./entity.js";

class Ball extends Entity {

    private static spriteSource = './assets/ball.png'

    constructor(x: number, y: number) {
        super()
        this.addPhysicsBody(x, y, 1, Ball.spriteSource)
        .then(() => {
            this.addMouseGrab()
        })
        
    }

}

export {Ball}