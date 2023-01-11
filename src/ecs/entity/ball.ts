import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Sprite } from "../component/sprite.js";
import { Entity } from "./entity.js";

class Ball extends Entity {

    sprite: ImageBitmap | null = null

    constructor(x: number, y: number) {
        super()
        let image = new Image()
        image.onload = () => {
            Promise.all([createImageBitmap(image)]).then((sprites) => {
                    this.sprite = sprites[0]
                    this.addPhysicsBody(x, y, this.sprite)
                    this.addComponent(new MouseGrabbable(this.getComponent(Sprite)))
                }
            )
        }
        image.src = '../../assets/ball.png'
    }

    static make(x: number, y: number) {

    }
}

export {Ball}