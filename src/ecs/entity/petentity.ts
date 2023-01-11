import { MouseInteractable } from "../component/mouseinteractable.js";
import { Sprite } from "../component/sprite.js";
import { ECS } from "../ecs.js";
import { Entity } from "./entity.js";

class PetEntity extends Entity {

    private static spriteSource = '../../assets/bird.png'

    constructor(x: number, y: number) {
        super()
        let image = new Image()
        image.onload = () => {
            createImageBitmap(image).then((sprite) => {
                    this.addPhysicsBody(x, y, 0, sprite)
                    this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
                }
            )
        }
        image.src = PetEntity.spriteSource
    }

}


export { PetEntity }