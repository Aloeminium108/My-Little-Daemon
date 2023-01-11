import { ECS } from "../ecs.js";
import { Entity } from "./entity.js";

class PetEntity extends Entity {

    image: ImageBitmap | null = null

    constructor(ecs: ECS | null = null) {
        super(ecs)

        let image = new Image()
        image.onload = () => {
            createImageBitmap(image)
            .then((sprite) => {
                this.image = sprite
            })
        }
        image.src = '../../assets/bird.png'

    }
}


export { PetEntity }