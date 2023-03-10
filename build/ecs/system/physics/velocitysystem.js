import { Position } from "../../component/physics/position.js";
import { Velocity } from "../../component/physics/velocity.js";
import { UnorderedSystem } from "../system.js";
class VelocitySystem extends UnorderedSystem {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Position, Velocity]);
    }
    update(interval) {
        this.entities.forEach(entity => {
            let position = entity.getComponent(Position);
            let velocity = entity.getComponent(Velocity);
            position.x += velocity.dx;
            position.y += velocity.dy;
        });
    }
}
export { VelocitySystem };
