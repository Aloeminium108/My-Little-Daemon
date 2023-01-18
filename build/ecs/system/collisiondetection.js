import { Hitbox } from "../component/hitbox.js";
import { UnorderedSystem } from "./system.js";
class CollisionDetection extends UnorderedSystem {
    constructor(spatialHashing) {
        super();
        this.spatialHashing = spatialHashing;
        this.componentsRequired = new Set([Hitbox]);
        this.collisions = new Map();
        this.checkCollision = (entity1, entity2) => {
            let rect1 = entity1.getComponent(Hitbox);
            let rect2 = entity2.getComponent(Hitbox);
            return (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y);
        };
    }
    update(interval) {
        this.collisions.clear();
        this.spatialHashing.proximityMap.forEach(cell => {
            cell.forEach(entity1 => {
            });
        });
        this.entities.forEach(entity1 => {
            if (!this.collisions.has(entity1))
                this.collisions.set(entity1, new Set());
            let collidedEntities = this.collisions.get(entity1);
            this.entities.forEach(entity2 => {
                var _a;
                if (entity1 === entity2)
                    return;
                if ((_a = collidedEntities.has(entity2)) !== null && _a !== void 0 ? _a : false)
                    return;
                if (this.checkCollision(entity1, entity2)) {
                    collidedEntities.add(entity2);
                    if (this.collisions.has(entity2)) {
                        this.collisions.get(entity2).add(entity1);
                    }
                    else {
                        this.collisions.set(entity2, new Set([entity1]));
                    }
                }
            });
            if (collidedEntities.size === 0) {
                this.collisions.delete(entity1);
            }
        });
    }
}
export { CollisionDetection };
