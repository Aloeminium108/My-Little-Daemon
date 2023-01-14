import { Consumable, Consumer } from "../component/consumable.js";
import { CollisionDetection } from "./collisiondetection.js";
import { UnorderedSystem } from "./system.js";

class ConsumableSystem extends UnorderedSystem {

    public componentsRequired = new Set([Consumer])

    constructor(private collisionDetection: CollisionDetection) {
        super()
    }

    public update(interval: number): void {
        this.entities.forEach(entity => {

            let collisionSet = this.collisionDetection.collisions.get(entity)
            collisionSet?.forEach(collidedObject => {
                if (collidedObject.hasComponent(Consumable)) {
                    entity.getComponent(Consumer).consume(collidedObject.getComponent(Consumable))
                    this.ecs?.removeEntity(collidedObject)
                }
            })

        })
    }
    
}

export {ConsumableSystem}