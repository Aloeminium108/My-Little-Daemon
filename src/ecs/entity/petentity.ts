import { PetStats } from "../../Pet/petstats.js";
import { Consumer } from "../component/consumable.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { PetLink } from "../component/pet.js";
import { Sprite } from "../component/sprite.js";
import { Automaton, State } from "../component/state.js";
import { Entity } from "./entity.js";

class PetEntity extends Entity {

    private static spriteSource = './assets/pet-neutral.png'

    constructor(x: number, y: number, petStats: PetStats) {
        super()

        this.addComponent(new PetLink())
        this.addPhysicsBody(x, y, 0, PetEntity.spriteSource)
        .then(() => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
            this.addComponent(new Consumer(petStats))
            return Sprite.loadSprite('./assets/pet-happy.png')
        })
        .then(happySprite => {
            let stateSpriteMap = new Map([
                [State.NEUTRAL, this.getComponent(Sprite).sprite!!],
                [State.HAPPY, happySprite]
            ])
            this.addComponent(
                new Automaton(
                    State.NEUTRAL,
                    this.getComponent(Sprite),
                    stateSpriteMap
                )
            )
        })
        
    }

}


export { PetEntity }