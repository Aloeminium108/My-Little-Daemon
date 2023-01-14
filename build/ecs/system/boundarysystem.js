import { Bounds } from "../component/bounds.js";
import { Hitbox } from "../component/hitbox.js";
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
                velocity === null || velocity === void 0 ? void 0 : velocity.dxInvert();
            }
            else if (position.x + hitbox.width > bounds.xUpperBound) {
                position.x = bounds.xUpperBound - hitbox.width;
                velocity === null || velocity === void 0 ? void 0 : velocity.dxInvert();
            }
            if (position.y < bounds.yLowerBound) {
                position.y = bounds.yLowerBound;
                velocity === null || velocity === void 0 ? void 0 : velocity.dyInvert();
            }
            else if (position.y + hitbox.height > bounds.yUpperBound) {
                position.y = bounds.yUpperBound - hitbox.height;
                velocity === null || velocity === void 0 ? void 0 : velocity.dyInvert();
            }
        });
    }
}
export { BoundarySystem };
