import { Hitbox } from "../component/hitbox.js";
import { JewelType } from "../component/jeweltype.js";
import { Automaton, EntityState } from "../component/automaton.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";
class JewelCollision extends UnorderedSystem {
    constructor(collisionDetection) {
        super();
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([Hitbox, JewelType, Automaton]);
    }
    update(interval) {
        this.collisionDetection.collisions.forEach((collisions, entity) => {
            let fsm = entity.getComponent(Automaton);
            if (fsm.currentState !== EntityState.FALLING)
                return;
            let hitbox = entity.getComponent(Hitbox);
            let stableCollisions = collisions
                .filter(collidedEntity => {
                return collidedEntity.getComponent(Automaton).currentState !== EntityState.FALLING;
            });
            if (stableCollisions.length > 0) {
                hitbox.y = stableCollisions[0].getComponent(Hitbox).y - hitbox.height;
                entity.getComponent(Velocity).dy = 0;
                fsm.changeState(EntityState.UNMATCHED);
            }
        });
    }
}
export { JewelCollision };
