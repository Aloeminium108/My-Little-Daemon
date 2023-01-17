import { Gravity } from "../component/gravity.js";
import { Hitbox } from "../component/hitbox.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { UnorderedSystem } from "./system.js";
class JewelCollision extends UnorderedSystem {
    constructor(collisionDetection) {
        super();
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([JewelType, Position, Hitbox]);
        this.clippingResponse = (jewel1, jewel2) => {
            if (!jewel1.hasComponent(Gravity) && !jewel2.hasComponent(Gravity))
                return;
            let jewel1Pos = jewel1.getComponent(Position);
            let jewel2Pos = jewel2.getComponent(Position);
            let jewel1Box = jewel1.getComponent(Hitbox);
            let jewel2Box = jewel2.getComponent(Hitbox);
            if (!jewel1.hasComponent(Gravity)) {
                jewel2Pos.y = jewel1Pos.y - jewel2Box.height;
            }
            else if (!jewel2.hasComponent(Gravity)) {
                jewel1Pos.y = jewel2Pos.y - jewel1Box.height;
            }
            else if (jewel1Pos.y < jewel2Pos.y) {
                jewel1Pos.y = jewel2Pos.y - jewel1Box.height;
            }
            else {
                jewel2Pos.y = jewel1Pos.y - jewel2Box.height;
            }
        };
    }
    update(interval) {
        this.entities.forEach(entity => {
            let collisions = this.collisionDetection.collisions.get(entity);
            collisions === null || collisions === void 0 ? void 0 : collisions.forEach(collision => {
                if (this.entities.has(collision)) {
                    this.clippingResponse(entity, collision);
                }
            });
        });
    }
}
export { JewelCollision };
