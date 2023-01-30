import { Consumable, Consumer } from "../../component/gameplay/consumable.js";
import { UnorderedSystem } from "../system.js";
class ConsumableSystem extends UnorderedSystem {
    constructor(collisionDetection) {
        super();
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([Consumer]);
    }
    update(interval) {
        this.entities.forEach(entity => {
            let collisionSet = this.collisionDetection.collisions.get(entity);
            collisionSet === null || collisionSet === void 0 ? void 0 : collisionSet.forEach(collidedObject => {
                var _a;
                if (collidedObject.hasComponent(Consumable)) {
                    entity.getComponent(Consumer).consume(collidedObject.getComponent(Consumable));
                    (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.removeEntity(collidedObject);
                }
            });
        });
    }
}
export { ConsumableSystem };
