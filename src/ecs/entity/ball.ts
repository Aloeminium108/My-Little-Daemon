import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Sprite } from "../component/sprite.js";
import { Entity } from "./entity.js";

class Ball extends Entity {

    constructor(x: number, y: number) {
        super()
        let image = new Image()
        image.onload = () => {
            createImageBitmap(image).then((sprite) => {
                    this.addPhysicsBody(x, y, sprite)
                    this.addMouseGrab()
                }
            )
        }
        image.src = '../../assets/ball.png'
    }

}

export {Ball}