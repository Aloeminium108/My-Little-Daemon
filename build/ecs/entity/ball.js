import { Entity } from "./entity.js";
class Ball extends Entity {
    constructor(x, y) {
        super();
        this.addPhysicsBody(x, y, 1, Ball.spriteSource)
            .then(() => {
            this.addMouseGrab();
        });
    }
}
Ball.spriteSource = './assets/ball.png';
export { Ball };
