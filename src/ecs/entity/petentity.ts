import { PetStats } from "../../Pet/petstats.js";
import { Consumer } from "../component/consumable.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { Sprite } from "../component/sprite.js";
import { ECS } from "../ecs.js";
import { Entity } from "./entity.js";

class PetEntity extends Entity {

    private static spriteSource = './assets/bird.png'

    constructor(x: number, y: number, petStats: PetStats) {
        super()

        this.addPhysicsBody(x, y, 0, PetEntity.spriteSource)
        .then(() => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
            this.addComponent(new Consumer(petStats))
        })
        
    }

}


export { PetEntity }