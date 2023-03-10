import { Consumer } from "../../component/gameplay/consumable.js";
import { MouseInteractable } from "../../component/controls/mouseinteractable.js";
import { PetLink } from "../../component/gameplay/petlink.js";
import { Sprite } from "../../component/graphics/sprite.js";
import { Automaton, EntityState } from "../../component/fsm/automaton.js";
import { Entity } from "../entity.js";
import { CollisionBody } from "../../component/physics/collisionbody.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { Velocity } from "../../component/physics/velocity.js";
import { Position } from "../../component/physics/position.js";
import { Pet } from "../../../Pet/pet.js";

class PetEntity extends Entity {

    private static spriteSource = './assets/pet-neutral.png'

    public static width = 400
    public static height = 300

    constructor(x: number, y: number, pet: Pet) {
        super()

        let petLink = new PetLink(pet)
        this.addComponent(petLink)
        let position = new Position(x, y)
        this.addComponent(position)

        let sprite = new Sprite(0, PetEntity.spriteSource)
        this.addComponent(sprite)
        sprite.loadingPromise = sprite.loadingPromise
        .then(() => {
            this.addComponent(new Hitbox(position, sprite.sprite!!.width, sprite.sprite!!.height))
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)))
            this.addComponent(new Consumer(petLink))
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