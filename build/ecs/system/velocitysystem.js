import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { System } from "./system.js";
class VelocitySystem extends System {
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
    animate(ctx) { }
}
export { VelocitySystem };
