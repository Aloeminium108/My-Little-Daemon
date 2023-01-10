import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { System } from "./system.js";

class VelocitySystem extends System {

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