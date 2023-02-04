import { GameEvent } from "../gameevent.js";
class EntityMouseOverEvent extends GameEvent {
    constructor(entity) {
        super();
        this.entity = entity;
    }
}
export { EntityMouseOverEvent };
