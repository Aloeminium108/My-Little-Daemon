import { Position } from "../../component/physics/position.js";
import { Velocity } from "../../component/physics/velocity.js";
import { UnorderedSystem } from "../system.js";

class VelocitySystem extends UnorderedSystem {

    public componentsRequired = new Set([Position, Velocity])

    public update(interval: number): void {
        this.entities.forEach(entity => {
            let position = entity.getComponent(Position)
            let velocity = entity.getComponent(Velocity)
            position.x += velocity.dx
            position.y += velocity.dy
        })
    }

}

export {VelocitySystem}