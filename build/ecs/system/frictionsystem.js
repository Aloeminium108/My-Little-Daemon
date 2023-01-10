import { Friction } from "../component/friction.js";
import { Velocity } from "../component/velocity.js";
import { System } from "./system.js";
class FrictionSystem extends System {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Friction, Velocity]);
        this.update = () => {
            this.entities.forEach(entity => {
                let friction = entity.getComponent(Friction).friction;
                let velocity = entity.getComponent(Velocity);
                velocity.dx *= friction;
                velocity.dy *= friction;
            });
        };
        this.animate = () => { };
    }
}
export { FrictionSystem };
