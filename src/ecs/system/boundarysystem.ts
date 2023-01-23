import { Bounds } from "../component/bounds.js";
import { CollisionBody } from "../component/collisionbody.js";
import { Hitbox } from "../component/hitbox.js";
import { Position } from "../component/position.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";

class BoundarySystem extends UnorderedSystem {
    public componentsRequired = new Set([Bounds, CollisionBody])

    public update(interval: number): void {
        this.entities.forEach(entity => {
            let body = entity.getComponent(CollisionBody)
            let position = entity.getComponent(Position)
            let hitbox = entity.getComponent(Hitbox)
            let bounds = entity.getComponent(Bounds)
            let velocity = entity.getPossibleComponent(Velocity)

            if (position.x < bounds.xLowerBound) {
                position.x = bounds.xLowerBound
                velocity?.dxInvert(body.elasticity)
            } else if (position.x + hitbox.width > bounds.xUpperBound) {
                position.x = bounds.xUpperBound - hitbox.width
                velocity?.dxInvert(body.elasticity)
            }

            if (position.y < bounds.yLowerBound) {
                position.y = bounds.yLowerBound
                velocity?.dyInvert(body.elasticity)
                
            } else if (position.y + hitbox.height > bounds.yUpperBound) {
                position.y = bounds.yUpperBound - hitbox.height
                velocity?.dyInvert(body.elasticity)
            }

            body.onGround = (hitbox.y + hitbox.height === bounds.yUpperBound)
        })
    }

}

export {BoundarySystem}