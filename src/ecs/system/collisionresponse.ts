import { CollisionBody } from "../component/collisionbody.js";
import { Hitbox } from "../component/hitbox.js";
import { Velocity } from "../component/velocity.js";
import { CollisionDetection } from "./collisiondetection.js";
import { UnorderedSystem } from "./system.js";

class CollisionResponse extends UnorderedSystem {

    public componentsRequired = new Set([CollisionBody, Hitbox, Velocity])

    constructor(private collisionDetection: CollisionDetection) {
        super()
    }

    public update(interval: number): void {
        this.entities.forEach(entity => {

            let body = entity.getComponent(CollisionBody)
            if (!body.corporeal) return

            this.collisionDetection.collisions.get(entity)?.forEach(collidedEntity => {
                if (!this.entities.has(collidedEntity)) return

                let collidedBody = collidedEntity.getComponent(CollisionBody)

                if (!collidedBody.corporeal) return

                collisionImpulse(body, collidedBody)

                this.collisionDetection.collisions.get(collidedEntity)?.delete(entity)

            })
        })
    }

}

function collisionImpulse(body1: CollisionBody, body2: CollisionBody) {

    if (body1.immovable && body2.immovable) return

    let xOverlap = Math.abs(body1.width - Math.abs(body1.x - body2.x))
    let yOverlap = Math.abs(body1.height - Math.abs(body1.y - body2.y))

    let xAxis = xOverlap < yOverlap
    let overlap = xAxis ? xOverlap : yOverlap
    let order

    if (xAxis) {
        order = body1.center.x > body2.center.x ? 1 : -1
    } else {
        order = body1.center.y > body2.center.y ? 1 : -1
    }

    let elasticity = (body1.elasticity + body2.elasticity) / 2

    let body1Velocity = xAxis ? body1.dx : body1.dy
    let body2Velocity = xAxis ? body2.dx : body2.dy

    let impulse1 = 
        ((((body1.mass - body2.mass) / (body1.mass + body2.mass)) * body1Velocity)
        + (((2 * body2.mass) / (body1.mass + body2.mass)) * body2Velocity))
        * elasticity
    let impulse2 = 
        ((((2 * body1.mass) / (body1.mass + body2.mass)) * body1Velocity)
        + (((body2.mass - body1.mass) / (body1.mass + body2.mass)) * body2Velocity))
        * elasticity

    // if (body1.immovable) {
    //     if (xAxis) {
    //         body2.x += -order * overlap
    //         body2.dx = -impulse1
    //     } else {
    //         body2.y += -order * overlap
    //         body2.dy = -impulse1
    //     }
    // } else if (body2.immovable) {
    //     if (xAxis) {
    //         body1.x += order * overlap
    //         body1.dx = -impulse2
    //     } else {
    //         body1.y += order * overlap
    //         body1.dy = -impulse2
    //     }
    // } else {
    //     if (xAxis) {
    //         body1.x += order * overlap / 2
    //         body2.x += -order * overlap / 2
    //         body1.dx = impulse1
    //         body2.dx = impulse2
    //     } else {
    //         body1.y += order * overlap / 2
    //         body2.y += -order * overlap / 2
    //         body1.dy = impulse1
    //         body2.dy = impulse2
    //     }
    // }   

    if (xAxis) {
        if (body1.immovable) {
            body2.x += -order * overlap
            body2.dx = -impulse1
        } else if (body2.immovable) {
            body1.x += order * overlap
            body1.dx = -impulse2
        } else {
            body1.x += order * overlap / 2
            body2.x += -order * overlap / 2
            body1.dx = impulse1
            body2.dx = impulse2
        }
    } else {
        if (body1.immovable 
            || (body1.onGround && order > 0)) {
            body2.y += -order * overlap
            body2.dy = -impulse1
        } else if (body2.immovable
            || (body2.onGround && order < 0)) {
            body1.y += order * overlap
            body1.dy = -impulse2
        } else {
            body1.y += order * overlap / 2
            body2.y += -order * overlap / 2
            body1.dy = impulse1
            body2.dy = impulse2
        }

        if (body1.y === body2.y + body1.height) body1.onGround = true
        if (body2.y === body1.y + body2.height) body2.onGround = true
    }
}

export {CollisionResponse}