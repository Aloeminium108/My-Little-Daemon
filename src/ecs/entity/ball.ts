import { Entity } from "./entity.js";

class Ball extends Entity {

    private static spriteSource = '../../assets/ball.png'

    constructor(x: number, y: number) {
        super()
        let image = new Image()
        image.onload = () => {
            createImageBitmap(image).then((sprite) => {
                    this.addPhysicsBody(x, y, 1, sprite)
                    this.addMouseGrab()
                }
            )
        }
        image.src = Ball.spriteSource
    }

}

export {Ball}