import { Gravity } from "../../component/physics/gravity.js";
import { Position } from "../../component/physics/position.js";
import { Velocity } from "../../component/physics/velocity.js";
import { UnorderedSystem } from "../system.js";
class GravitySystem extends UnorderedSystem {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Position, Gravity, Velocity]);
        this.update = (interval) => {
            this.entities.forEach(entity => {
                entity.getComponent(Velocity).dy += entity.getComponent(Gravity).gravity;
            });
        };
    }
}
export { GravitySystem };
