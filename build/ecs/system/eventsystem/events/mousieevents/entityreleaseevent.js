import { GameEvent } from "../gameevent.js";
class EntityReleaseEvent extends GameEvent {
    constructor(entity, mouse) {
        super();
        this.entity = entity;
        this.mouse = mouse;
    }
}
export { EntityReleaseEvent };
