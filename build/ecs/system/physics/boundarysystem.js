import { Bounds } from "../../component/physics/bounds.js";
import { CollisionBody } from "../../component/physics/collisionbody.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { Position } from "../../component/physics/position.js";
import { Velocity } from "../../component/physics/velocity.js";
import { UnorderedSystem } from "../system.js";
class BoundarySystem extends UnorderedSystem {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Bounds, CollisionBody]);
    }
    update(interval) {
        this.entities.forEach(entity => {
            let body = entity.getComponent(CollisionBody);
            let position = entity.getComponent(Position);
            let hitbox = entity.getComponent(Hitbox);
            let bounds = entity.getComponent(Bounds);
            let velocity = entity.getPossibleComponent(Velocity);
            body.onGround = false;
            bounds.onGround = false;
            if (position.x < bounds.xLowerBound) {
                position.x = bounds.xLowerBound;
                velocity === null || velocity === void 0 ? void 0 : velocity.dxInvert(body.elasticity);
            }
            else if (position.x + hitbox.width > bounds.xUpperBound) {
                position.x = bounds.xUpperBound - hitbox.width;
                velocity === null || velocity === void 0 ? void 0 : velocity.dxInvert(body.elasticity);
            }
            if (position.y < bounds.yLowerBound) {
                position.y = bounds.yLowerBound;
                velocity === null || velocity === void 0 ? void 0 : velocity.dyInvert(body.elasticity);
            }
            else if (position.y + hitbox.height > bounds.yUpperBound) {
                position.y = bounds.yUpperBound - hitbox.height;
                velocity === null || velocity === void 0 ? void 0 : velocity.dyInvert(body.elasticity);
            }
            body.onGround = (hitbox.y + hitbox.height === bounds.yUpperBound);
            bounds.onGround = body.onGround;
        });
    }
}
export { BoundarySystem };
