import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";

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

    public animate(ctx: CanvasRenderingContext2D): void {}
    
}

export {VelocitySystem}