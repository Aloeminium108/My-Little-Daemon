import { Bounds } from "../component/bounds.js";
import { Hitbox } from "../component/hitbox.js";
import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";

class BoundarySystem extends UnorderedSystem {
    public componentsRequired = new Set([Bounds, Position, Hitbox])

    public update(interval: number): void {
        this.entities.forEach(entity => {
            let position = entity.getComponent(Position)
            let hitbox = entity.getComponent(Hitbox)
            let bounds = entity.getComponent(Bounds)
            let velocity = entity.getPossibleComponent(Velocity)

            if (position.x < bounds.xLowerBound) {
                position.x = bounds.xLowerBound
                if (bounds.bouncy) {
                    velocity?.dxInvert()
                } else {
                    velocity?.holdX()
                }
            } else if (position.x + hitbox.width > bounds.xUpperBound) {
                position.x = bounds.xUpperBound - hitbox.width
                if (bounds.bouncy) {
                    velocity?.dxInvert()
                } else {
                    velocity?.holdX()
                }
            }

            if (position.y < bounds.yLowerBound) {
                if (bounds.ceiling) {
                    position.y = bounds.yLowerBound
                    if (bounds.bouncy) {
                        velocity?.dyInvert()
                    } else {
                        velocity?.holdY()
                    }
                } else {
                    bounds.offScreen = true
                }
                
            } else {
                bounds.offScreen = false
                if (position.y + hitbox.height > bounds.yUpperBound) {
                    position.y = bounds.yUpperBound - hitbox.height
                    if (bounds.bouncy) {
                        velocity?.dyInvert()
                    } else {
                        velocity?.holdY()
                        bounds.onGround = true
                    }
                }
            }
        })
    }

}

export {BoundarySystem}