import { MouseComponent } from "../../../../component/controls/mousecomponent2.js";
import { Entity } from "../../../../entity/entity.js";
import { GameEvent } from "../gameevent.js";

class EntityHoldEvent extends GameEvent {
    constructor(public entity: Entity, public mouse: MouseComponent) {
        super()
    }
}

export {EntityHoldEvent}