import { CollisionBody } from "../../component/physics/collisionbody.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { Velocity } from "../../component/physics/velocity.js";
import { EventComponentSystem } from "../eventsystem/listeners/gameeventlistener.js";
import { CollisionEvent } from "../eventsystem/events/collisionevent.js";
const EPSILON = 0.001;
class CollisionResponse extends EventComponentSystem {
    constructor() {
        super(...arguments);
        this.eventClasses = new Set([CollisionEvent]);
        this.componentsRequired = new Set([CollisionBody, Hitbox, Velocity]);
    }
    handleEvent(gameEvent) {
        if (!this.entities.has(gameEvent.entity1)
            || !this.entities.has(gameEvent.entity2))
            return;
        let body1 = gameEvent.entity1.getComponent(CollisionBody);
        let body2 = gameEvent.entity2.getComponent(CollisionBody);
        if (!body1.corporeal
            || !body1.corporeal)
            return;
        collisionImpulse(body1, body2);
    }
}
function collisionImpulse(body1, body2) {
    if (body1.immovable && body2.immovable)
        return;
    let xOverlap = Math.abs(body1.width - Math.abs(body1.x - body2.x));
    let yOverlap = Math.abs(body1.height - Math.abs(body1.y - body2.y));
    let xAxis = xOverlap < yOverlap;
    let overlap = xAxis ? xOverlap : yOverlap;
    let order;
    if (xAxis) {
        order = body1.center.x > body2.center.x ? 1 : -1;
    }
    else {
        order = body1.center.y > body2.center.y ? 1 : -1;
    }
    let elasticity = (body1.elasticity + body2.elasticity) / 2;
    let body1Velocity = xAxis ? body1.dx : body1.dy;
    let body2Velocity = xAxis ? body2.dx : body2.dy;
    let impulse1 = ((((body1.mass - body2.mass) / (body1.mass + body2.mass)) * body1Velocity)
        + (((2 * body2.mass) / (body1.mass + body2.mass)) * body2Velocity))
        * elasticity;
    let impulse2 = ((((2 * body1.mass) / (body1.mass + body2.mass)) * body1Velocity)
        + (((body2.mass - body1.mass) / (body1.mass + body2.mass)) * body2Velocity))
        * elasticity;
    if (xAxis) {
        if (body1.immovable) {
            body2.x += -order * overlap;
            body2.dx = -impulse1;
        }
        else if (body2.immovable) {
            body1.x += order * overlap;
            body1.dx = -impulse2;
        }
        else {
            body1.x += order * overlap / 2;
            body2.x += -order * overlap / 2;
            body1.dx = impulse1;
            body2.dx = impulse2;
        }
    }
    else {
        if (body1.immovable
            || (body1.onGround && order > 0)) {
            body2.y += -order * overlap;
            body2.dy = -impulse1;
        }
        else if (body2.immovable
            || (body2.onGround && order < 0)) {
            body1.y += order * overlap;
            body1.dy = -impulse2;
        }
        else {
            body1.y += order * overlap / 2;
            body2.y += -order * overlap / 2;
            body1.dy = impulse1;
            body2.dy = impulse2;
        }
        if (Math.abs(body1.y - (body2.y - body1.height)) < EPSILON) {
            body1.onGround = true;
        }
        if (Math.abs(body2.y - (body1.y - body2.height)) < EPSILON) {
            body2.onGround = true;
        }
    }
}
export { CollisionResponse };
