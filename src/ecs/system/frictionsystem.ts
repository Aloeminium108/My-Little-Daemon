import { Friction } from "../component/friction.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";

class FrictionSystem extends UnorderedSystem {

    public componentsRequired = new Set([Friction, Velocity])

    update = () => {
        this.entities.forEach(entity => {
            let friction = entity.getComponent(Friction).friction
            let velocity = entity.getComponent(Velocity)
            velocity.dx *= friction
            velocity.dy *= friction
        })
    }

}

export {FrictionSystem}