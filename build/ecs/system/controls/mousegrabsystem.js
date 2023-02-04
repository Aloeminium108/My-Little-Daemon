import { Hitbox } from "../../component/physics/hitbox.js";
import { Velocity } from "../../component/physics/velocity.js";
import { EventHandler } from "../eventsystem/listeners/gameeventlistener.js";
import { EntityHoldEvent } from "../eventsystem/events/mouseevents/entityholdevent.js";
import { MouseGrabbable } from "../../component/controls/mousegrabbable.js";
class MouseGrabSystem extends EventHandler {
    constructor() {
        super(...arguments);
        this.eventClasses = new Set([EntityHoldEvent]);
    }
    handleEvent(gameEvent) {
        if (gameEvent.entity.hasComponent(MouseGrabbable))
            moveHeldEntity(gameEvent);
    }
}
function moveHeldEntity(gameEvent) {
    let hitbox = gameEvent.entity.getComponent(Hitbox);
    let velocity = gameEvent.entity.getPossibleComponent(Velocity);
    let mouse = gameEvent.mouse;
    if (velocity === undefined) {
        hitbox.moveCenterTo(mouse.x, mouse.y);
    }
    else {
        let dx = mouse.x - hitbox.center.x;
        let dy = mouse.y - hitbox.center.y;
        velocity.setDX(dx);
        velocity.setDY(dy);
    }
}
export { MouseGrabSystem };
