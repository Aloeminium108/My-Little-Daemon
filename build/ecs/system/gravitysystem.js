import { Gravity } from "../component/gravity.js";
import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { System } from "./system.js";
class GravitySystem extends System {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Position, Gravity, Velocity]);
        this.update = (interval) => {
            this.entities.forEach(entity => {
                entity.getComponent(Velocity).dy += 1;
            });
        };
        this.animate = (ctx) => { };
    }
}
export { GravitySystem };
