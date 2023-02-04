import { MouseComponent } from "../../component/controls/mousecomponent2.js";
import { Position } from "../../component/physics/position.js";
import { MouseGameEvent } from "../eventsystem/events/mouseevents/mousegameevent.js";
import { EventComponentSystem } from "../eventsystem/listeners/gameeventlistener.js";
class MouseSystem extends EventComponentSystem {
    constructor() {
        super(...arguments);
        this.eventClasses = new Set([MouseGameEvent]);
        this.componentsRequired = new Set([MouseComponent, Position]);
        this.handleEvent = (gameEvent) => {
            this.entities.forEach(entity => {
                let mousecomponent = entity.getComponent(MouseComponent);
                mousecomponent.update(gameEvent);
                let position = entity.getComponent(Position);
                position.x = mousecomponent.x;
                position.y = mousecomponent.y;
            });
        };
    }
}
export { MouseSystem };
