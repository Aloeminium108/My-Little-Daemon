import { ComponentType, Component } from "../component/component.js";
import { Friction } from "../component/friction.js";
import { Velocity } from "../component/velocity.js";
import { System } from "./system.js";

class FrictionSystem extends System {

    public componentsRequired = new Set([Friction, Velocity])

    update = () => {
        this.entities.forEach(entity => {
            let friction = entity.getComponent(Friction).friction
            let velocity = entity.getComponent(Velocity)
            velocity.dx *= friction
            velocity.dy *= friction
        })
    }

    animate = () => {}

}

export {FrictionSystem}