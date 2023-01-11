import { Entity } from "./entity.js";
class Ball extends Entity {
    constructor(x, y) {
        super();
        let image = new Image();
        image.onload = () => {
            createImageBitmap(image).then((sprite) => {
                this.addPhysicsBody(x, y, 1, sprite);
                this.addMouseGrab();
            });
        };
        image.src = Ball.spriteSource;
    }
}
Ball.spriteSource = '../../assets/ball.png';
export { Ball };
