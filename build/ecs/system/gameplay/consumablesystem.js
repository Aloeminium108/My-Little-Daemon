import { Consumable, Consumer } from "../../component/gameplay/consumable.js";
import { CollisionEvent } from "../eventsystem/events/collisionevent.js";
import { EventComponentSystem } from "../eventsystem/listeners/gameeventlistener.js";
class ConsumableSystem extends EventComponentSystem {
    constructor() {
        super(...arguments);
        this.eventClasses = new Set([CollisionEvent]);
        this.componentsRequired = new Set([Consumer]);
    }
    handleEvent(gameEvent) {
        var _a;
        if (!this.entities.has(gameEvent.entity1)
            && !this.entities.has(gameEvent.entity2))
            return;
        if (!gameEvent.entity1.hasComponent(Consumable)
            && !gameEvent.entity2.hasComponent(Consumable))
            return;
        let consumer;
        let consumable;
        if (this.entities.has(gameEvent.entity1)) {
            consumer = gameEvent.entity1;
            consumable = gameEvent.entity2;
        }
        else {
            consumer = gameEvent.entity2;
            consumable = gameEvent.entity1;
        }
        consumer.getComponent(Consumer).consume(consumable.getComponent(Consumable));
        (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.removeEntity(consumable);
    }
}
export { ConsumableSystem };
