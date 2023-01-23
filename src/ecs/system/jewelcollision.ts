import { Hitbox } from "../component/hitbox.js";
import { JewelType } from "../component/jeweltype.js";
import { Automaton, EntityState } from "../component/automaton.js";
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
            if (fsm.currentState !== EntityState.FALLING) return

            let hitbox = entity.getComponent(Hitbox)
            let velocity = entity.getComponent(Velocity)

            let stableCollisions = Array.from(collisions)
            .filter(collidedEntity => {
                return collidedEntity.getComponent(Automaton).currentState !== EntityState.FALLING
            })

            if (stableCollisions.length > 0) {
                hitbox.y = stableCollisions[0].getComponent(Hitbox).y - hitbox.height
                velocity.dy = 0
                fsm.changeState(EntityState.UNMATCHED)
            } else {
                collisions.forEach(collidedEntity => {
                    let collidedHitbox = collidedEntity.getComponent(Hitbox)
                    let collidedVelocity = collidedEntity.getComponent(Velocity)
                    let impulse = (hitbox.height - Math.abs(hitbox.y - collidedHitbox.y))/2
                    impulse *= hitbox.y > collidedHitbox.y ? 1 : -1
                    velocity.dy += impulse
                    collidedVelocity.dy -= impulse
                })
            }
        })
    }
    
}

export {JewelCollision}