import { GemSlot } from "../component/gemslot.js";
import { Gravity } from "../component/gravity.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";
class GemSlotSystem extends UnorderedSystem {
    constructor(collisionDetection) {
        super();
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([GemSlot]);
    }
    update(interval) {
        this.entities.forEach(entity => {
            if (this.collisionDetection.collisions.has(entity)) {
                let collisions = this.collisionDetection.collisions.get(entity);
                collisions === null || collisions === void 0 ? void 0 : collisions.forEach(collision => {
                    if (collision.hasComponent(JewelType)) {
                        if (!collision.hasComponent(Gravity)) {
                            entity.getComponent(GemSlot).jewel = collision;
                        }
                        else if (entity.getComponent(GemSlot).open) {
                            collision.deleteComponent(Gravity);
                            collision.getComponent(Velocity).hold();
                            collision.getComponent(Position).x = entity.getComponent(GemSlot).x;
                            collision.getComponent(Position).y = entity.getComponent(GemSlot).y;
                            entity.getComponent(GemSlot).jewel = collision;
                            entity.getComponent(GemSlot).open = false;
                        }
                    }
                });
            }
        });
    }
}
export { GemSlotSystem };
