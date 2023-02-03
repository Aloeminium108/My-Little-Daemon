import { Entity } from "../../../entity/entity";
import { GameEvent } from "./gameevent.js";

class CollisionEvent extends GameEvent {
    constructor(public entity1: Entity, public entity2: Entity) {
        super()
    }
}

export {CollisionEvent}