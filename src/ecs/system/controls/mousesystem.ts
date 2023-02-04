import { MouseComponent } from "../../component/controls/mousecomponent2.js";
import { Position } from "../../component/physics/position.js";
import { MouseGameEvent } from "../eventsystem/events/mouseevents/mousegameevent.js";
import { EventComponentSystem } from "../eventsystem/listeners/gameeventlistener.js";

class MouseSystem extends EventComponentSystem<MouseGameEvent> {

    eventClasses = new Set([MouseGameEvent])

    componentsRequired = new Set([MouseComponent, Position])

    handleEvent = (gameEvent: MouseGameEvent) => {
        this.entities.forEach(entity => {
            let mousecomponent = entity.getComponent(MouseComponent)
            mousecomponent.update(gameEvent)

            let position = entity.getComponent(Position)
            position.x = mousecomponent.x
            position.y = mousecomponent.y
        })
    }

}

export {MouseSystem}