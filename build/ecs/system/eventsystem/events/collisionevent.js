import { GameEvent } from "./gameevent.js";
class CollisionEvent extends GameEvent {
    constructor(entity1, entity2) {
        super();
        this.entity1 = entity1;
        this.entity2 = entity2;
    }
}
export { CollisionEvent };
