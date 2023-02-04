import { MouseInteractable } from "../../component/controls/mouseinteractable.js";
import { CollisionEvent } from "../eventsystem/events/collisionevent.js";
import { MouseComponent } from "../../component/controls/mousecomponent2.js";
import { EntityMouseOverEvent } from "../eventsystem/events/mouseevents/entitymouseover.js"
import { EventHandler } from "../eventsystem/listeners/gameeventlistener.js";

class MouseOverSystem extends EventHandler<CollisionEvent> {

    eventClasses = new Set([CollisionEvent])

    handleEvent(gameEvent: CollisionEvent): void {

        let entity1IsMouse = gameEvent.entity1.hasComponent(MouseComponent)
        let entity2IsMouse = gameEvent.entity2.hasComponent(MouseComponent)

        //This ternary is just a logical XNOR
        if (
            entity1IsMouse
            ? entity2IsMouse
            : !entity2IsMouse
        ) return

        let entity = entity1IsMouse 
        ? gameEvent.entity2 
        : gameEvent.entity1

        if (entity.hasComponent(MouseInteractable)) {
            this.ecs?.pushEvent(new EntityMouseOverEvent(entity))
        }

    }

}

export {MouseOverSystem}