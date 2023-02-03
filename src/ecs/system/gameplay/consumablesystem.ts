import { Consumable, Consumer } from "../../component/gameplay/consumable.js";
import { Entity } from "../../entity/entity.js";
import { CollisionEvent } from "../eventsystem/events/collisionevent.js";
import { EventClass } from "../eventsystem/events/gameevent.js";
import { EventComponentSystem } from "../eventsystem/listeners/gameeventlistener.js";
import { CollisionDetection } from "../physics/collisiondetection.js";
import { UnorderedSystem } from "../system.js";

class ConsumableSystem extends EventComponentSystem<CollisionEvent> {

    eventClasses = new Set([CollisionEvent])

    componentsRequired = new Set([Consumer])

    handleEvent(gameEvent: CollisionEvent): void {
        if (
            !this.entities.has(gameEvent.entity1)
            && !this.entities.has(gameEvent.entity2)
        ) return

        if (
            !gameEvent.entity1.hasComponent(Consumable)
            && !gameEvent.entity2.hasComponent(Consumable)
        ) return

        let consumer: Entity
        let consumable: Entity

        if (this.entities.has(gameEvent.entity1)) {
            consumer = gameEvent.entity1
            consumable = gameEvent.entity2
        } else {
            consumer = gameEvent.entity2
            consumable = gameEvent.entity1
        }

        consumer.getComponent(Consumer).consume(consumable.getComponent(Consumable))
        this.ecs?.removeEntity(consumable)

    }
    
}

export {ConsumableSystem}