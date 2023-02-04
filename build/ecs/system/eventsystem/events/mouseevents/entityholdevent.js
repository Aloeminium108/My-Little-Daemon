import { GameEvent } from "../gameevent.js";
class EntityHoldEvent extends GameEvent {
    constructor(entity, mouse) {
        super();
        this.entity = entity;
        this.mouse = mouse;
    }
}
export { EntityHoldEvent };
