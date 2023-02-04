import { MouseInteractable } from "../../component/controls/mouseinteractable.js";
import { CollisionEvent } from "../eventsystem/events/collisionevent.js";
import { MouseComponent2 } from "../../component/controls/mousecomponent2.js";
import { EntityMouseOverEvent } from "../eventsystem/events/mousieevents/entitymouseover.js";
import { EventHandler } from "../eventsystem/listeners/gameeventlistener.js";
class MouseOverSystem2 extends EventHandler {
    constructor() {
        super(...arguments);
        this.eventClasses = new Set([CollisionEvent]);
        // update = (interval: number) => {
        //     if (this.mouse.pressed) {
        //         this.holdEntity()
        //         this.releasedEntity = null
        //         this.canvas.style.cursor = this.heldEntity?.getComponent(MouseInteractable).hold ?? 'default'
        //     } else {
        //         this.canvas.style.cursor = this.checkMouseCollision()?.getComponent(MouseInteractable).hover ?? 'default'
        //         this.releasedEntity = this.heldEntity
        //         this.heldEntity = null
        //         this.wrenched = false
        //     }
        // }
        // holdEntity = () => {
        //     if (this.wrenched) return
        //     if (this.heldEntity !== null) return
        //     this.heldEntity = this.checkMouseCollision()
        // }
        // checkMouseCollision = () => {
        //     return this.entities.find((entity => {
        //         return entity.getComponent(Hitbox).insideLastFrame(this.mouse.x, this.mouse.y)
        //     })) ?? null
        // }
    }
    handleEvent(gameEvent) {
        var _a;
        let entity1IsMouse = gameEvent.entity1.hasComponent(MouseComponent2);
        let entity2IsMouse = gameEvent.entity2.hasComponent(MouseComponent2);
        //This ternary is just a logical XNOR
        if (entity1IsMouse
            ? entity2IsMouse
            : !entity2IsMouse)
            return;
        let entity = entity1IsMouse
            ? gameEvent.entity2
            : gameEvent.entity1;
        if (entity.hasComponent(MouseInteractable)) {
            (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.pushEvent(new EntityMouseOverEvent(entity));
        }
    }
}
export { MouseOverSystem2 as MouseOverSystem2 };
