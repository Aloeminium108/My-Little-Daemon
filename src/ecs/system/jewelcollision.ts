import { Hitbox } from "../component/hitbox.js";
import { JewelType } from "../component/jeweltype.js";
import { Automaton, State } from "../component/state.js";
import { Velocity } from "../component/velocity.js";
import { CollisionDetection } from "./collisiondetection.js";
import { UnorderedSystem } from "./system.js";


class JewelCollision extends UnorderedSystem {
    public componentsRequired = new Set([Hitbox, JewelType, Automaton])

    constructor(private collisionDetection: CollisionDetection) {
        super()
    }

    public update(interval: number): void {
        this.collisionDetection.collisions.forEach((collisions, entity) => {
            let fsm = entity.getComponent(Automaton)
            if (fsm.currentState !== State.FALLING) return

            let hitbox = entity.getComponent(Hitbox)

            let stableCollisions = collisions
            .filter(collidedEntity => {
                return collidedEntity.getComponent(Automaton).currentState !== State.FALLING
            })

            if (stableCollisions.length > 0) {
                hitbox.y = stableCollisions[0].getComponent(Hitbox).y - hitbox.height
                entity.getComponent(Velocity).dy = 0
                fsm.changeState(State.UNMATCHED)
            } 
        })
    }
    
}

export {JewelCollision}