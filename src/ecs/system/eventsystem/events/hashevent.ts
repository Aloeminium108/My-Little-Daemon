import { Entity } from "../../../entity/entity.js";
import { GameEvent } from "./gameevent.js";

class HashEvent extends GameEvent {
    constructor(public proximityMap: Map<string, Array<Entity>>) {
        super()
    }
}

export {HashEvent}