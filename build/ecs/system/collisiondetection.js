import { Hitbox } from "../component/hitbox.js";
import { UnorderedSystem } from "./system.js";
const EPSILON = 0.001;
class CollisionDetection extends UnorderedSystem {
    constructor(spatialHashing) {
        super();
        this.spatialHashing = spatialHashing;
        this.componentsRequired = new Set([Hitbox]);
        this.collisions = new Map();
        this.checkCollision = (entity1, entity2) => {
            let rect1 = entity1.getComponent(Hitbox);
            let rect2 = entity2.getComponent(Hitbox);
            return (rect1.x + EPSILON < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x + EPSILON &&
                rect1.y + EPSILON < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y + EPSILON);
        };
        this.checkAllCollisions = (entity) => {
            let hitbox = entity.getComponent(Hitbox);
            let cells = this.spatialHashing.hashHitbox(hitbox);
            let collidedEntities = new Array();
            cells.forEach(cell => {
                let nearbyEntities = this.spatialHashing.proximityMap.get(cell);
                nearbyEntities === null || nearbyEntities === void 0 ? void 0 : nearbyEntities.forEach(nearbyEntity => {
                    if (nearbyEntity === entity)
                        return;
                    if (this.checkCollision(entity, nearbyEntity))
                        collidedEntities.push(nearbyEntity);
                });
            });
            return collidedEntities;
        };
        this.checkFirstCollision = (entity) => {
            let hitbox = entity.getComponent(Hitbox);
            let cells = this.spatialHashing.hashHitbox(hitbox);
            for (let cell of cells) {
                if (!this.spatialHashing.proximityMap.has(cell))
                    continue;
                for (let nearbyEntity of this.spatialHashing.proximityMap.get(cell)) {
                    if (nearbyEntity === entity)
                        return;
                    if (this.checkCollision(entity, nearbyEntity))
                        return nearbyEntity;
                }
            }
        };
        this.senseAtPoint = (x, y) => {
            var _a;
            let hash = this.spatialHashing.hashPoint(x, y);
            let sensedEntities = new Array();
            (_a = this.spatialHashing.proximityMap.get(hash)) === null || _a === void 0 ? void 0 : _a.forEach(entity => {
                if (entity.getComponent(Hitbox).inside(x, y)) {
                    sensedEntities.push(entity);
                }
            });
            return sensedEntities;
        };
    }
    update(interval) {
        this.collisions.clear();
        this.spatialHashing.proximityMap.forEach(cell => {
            cell.forEach(entity1 => {
                if (!this.collisions.has(entity1))
                    this.collisions.set(entity1, new Set());
                let collidedEntities = this.collisions.get(entity1);
                cell.forEach(entity2 => {
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
        });
    }
}
export { CollisionDetection };
