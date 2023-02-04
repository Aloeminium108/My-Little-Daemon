import { GameEvent } from "../gameevent.js";
class EntityGrabEvent extends GameEvent {
    constructor(entity, mouse) {
        super();
        this.entity = entity;
        this.mouse = mouse;
    }
}
export { EntityGrabEvent };
