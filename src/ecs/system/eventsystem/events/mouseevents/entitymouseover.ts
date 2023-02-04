import { Entity } from "../../../../entity/entity.js";
import { GameEvent } from "../gameevent.js";

class EntityMouseOverEvent extends GameEvent {
    constructor(public entity: Entity) {
        super()
    }
}

export {EntityMouseOverEvent}