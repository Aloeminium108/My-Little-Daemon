import { PetStats } from "../../Pet/petstats.js";
import { Consumer } from "../component/consumable.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { PetLink } from "../component/petlink.js";
import { Sprite } from "../component/sprite.js";
import { Automaton, EntityState } from "../component/automaton.js";
import { Entity } from "./entity.js";
import { CollisionBody } from "../component/collisionbody.js";
import { Hitbox } from "../component/hitbox.js";
import { Velocity } from "../component/velocity.js";

class PetEntity extends Entity {

    private static spriteSource = './assets/pet-neutral.png'

    constructor(x: number, y: number, petStats: PetStats) {
        super()

        this.addComponent(new PetLink())
        this.addPhysicsBody(x, y, 0, PetEntity.spriteSource)
        .then(() => {
            this.addComponent(new CollisionBody(this.getComponent(Hitbox), this.getComponent(Velocity), 1, 1, true, false))
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
            this.addComponent(new Consumer(petStats))
            return Sprite.loadSprite('./assets/pet-happy.png')
        })
        .then(happySprite => {
            let stateSpriteMap = new Map([
                [EntityState.NEUTRAL, this.getComponent(Sprite).sprite!!],
                [EntityState.HAPPY, happySprite]
            ])
            this.addComponent(
                new Automaton(
                    EntityState.NEUTRAL,
                    this.getComponent(Sprite),
                    stateSpriteMap
                )
            )
        })
        
    }

}


export { PetEntity }