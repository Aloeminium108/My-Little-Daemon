import { Hitbox } from "../component/hitbox.js";
import { UnorderedSystem } from "./system.js";
const EPSILON = 0.001;
class CollisionDetection extends UnorderedSystem {
    constructor(spatialHashing) {
        super();
        this.spatialHashing = spatialHashing;
        this.componentsRequired = new Set([Hitbox]);
        this.collisions = new Map();
        this.checkAllCollisions = (entity) => {
            let hitbox = entity.getComponent(Hitbox);
            let cells = this.spatialHashing.hashHitbox(hitbox);
            let collidedEntities = new Array();
            cells.forEach(cell => {
                let nearbyEntities = this.spatialHashing.proximityMap.get(cell);
                nearbyEntities === null || nearbyEntities === void 0 ? void 0 : nearbyEntities.forEach(nearbyEntity => {
                    if (nearbyEntity === entity)
                        return;
                    if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox)))
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
                    if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox)))
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
        this.senseWithHitbox = (hitbox) => {
            let hash = this.spatialHashing.hashHitbox(hitbox);
            let sensedEntities = new Array();
            hash.forEach(hashString => {
                var _a;
                (_a = this.spatialHashing.proximityMap.get(hashString)) === null || _a === void 0 ? void 0 : _a.forEach(nearbyEntity => {
                    if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox))) {
                        sensedEntities.push(nearbyEntity);
                    }
                });
            });
            return (sensedEntities);
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
                    if (checkCollision(entity1.getComponent(Hitbox), entity2.getComponent(Hitbox))) {
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
function checkCollision(hitbox1, hitbox2) {
    return (hitbox1.x + EPSILON < hitbox2.x + hitbox2.width &&
        hitbox1.x + hitbox1.width > hitbox2.x + EPSILON &&
        hitbox1.y + EPSILON < hitbox2.y + hitbox2.height &&
        hitbox1.height + hitbox1.y > hitbox2.y + EPSILON);
}
export { CollisionDetection };
