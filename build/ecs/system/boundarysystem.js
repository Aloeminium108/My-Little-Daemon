import { Bounds } from "../component/bounds.js";
import { Hitbox } from "../component/hitbox.js";
import { OffScreen } from "../component/offscreen.js";
import { OnGround } from "../component/onground.js";
import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";
class BoundarySystem extends UnorderedSystem {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Bounds, Position, Hitbox]);
    }
    update(interval) {
        this.entities.forEach(entity => {
            let position = entity.getComponent(Position);
            let hitbox = entity.getComponent(Hitbox);
            let bounds = entity.getComponent(Bounds);
            let velocity = entity.getPossibleComponent(Velocity);
            if (position.x < bounds.xLowerBound) {
                position.x = bounds.xLowerBound;
                if (bounds.bouncy)
                    velocity === null || velocity === void 0 ? void 0 : velocity.dxInvert();
            }
            else if (position.x + hitbox.width > bounds.xUpperBound) {
                position.x = bounds.xUpperBound - hitbox.width;
                if (bounds.bouncy)
                    velocity === null || velocity === void 0 ? void 0 : velocity.dxInvert();
            }
            if (position.y < bounds.yLowerBound) {
                if (bounds.ceiling) {
                    position.y = bounds.yLowerBound;
                    if (bounds.bouncy)
                        velocity === null || velocity === void 0 ? void 0 : velocity.dyInvert();
                }
                else {
                    entity.addComponent(new OffScreen());
                }
            }
            else {
                entity.deleteComponent(OffScreen);
                if (position.y + hitbox.height > bounds.yUpperBound) {
                    position.y = bounds.yUpperBound - hitbox.height;
                    if (bounds.bouncy) {
                        velocity === null || velocity === void 0 ? void 0 : velocity.dyInvert();
                    }
                    else {
                        entity.addComponent(new OnGround());
                    }
                }
            }
        });
    }
}
export { BoundarySystem };
