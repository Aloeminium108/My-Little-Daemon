import { Bounds } from "../component/bounds.js";
import { Hitbox } from "../component/hitbox.js";
import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { System } from "./system.js";

class BoundarySystem extends System {
    public componentsRequired = new Set([Bounds, Position, Hitbox])

    public update(interval: number): void {
        this.entities.forEach(entity => {
            let position = entity.getComponent(Position)
            let hitbox = entity.getComponent(Hitbox)
            let bounds = entity.getComponent(Bounds)
            let velocity = entity.getPossibleComponent(Velocity)

            if (position.x < bounds.xLowerBound) {
                position.x = bounds.xLowerBound
                velocity?.dxInvert()
            } else if (position.x + hitbox.width > bounds.xUpperBound) {
                position.x = bounds.xUpperBound - hitbox.width
                velocity?.dyInvert()
            }

            if (position.y < bounds.yLowerBound) {
                position.y = bounds.yLowerBound
                velocity?.dyInvert()
            } else if (position.y + hitbox.width > bounds.yUpperBound) {
                position.y = bounds.yUpperBound - hitbox.width
                velocity?.dyInvert()
            }
        })
    }

    animate = (ctx: CanvasRenderingContext2D) => {}

}

export {BoundarySystem}