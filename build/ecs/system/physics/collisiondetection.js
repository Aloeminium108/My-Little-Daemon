import { Hitbox } from "../../component/physics/hitbox.js";
import { CollisionEvent } from "../eventsystem/events/collisionevent.js";
import { HashEvent } from "../eventsystem/events/hashevent.js";
import { EventComponentSystem } from "../eventsystem/listeners/gameeventlistener.js";
const EPSILON = 0.001;
class CollisionDetection extends EventComponentSystem {
    constructor() {
        super(...arguments);
        this.eventClasses = new Set([HashEvent]);
        this.componentsRequired = new Set([Hitbox]);
        // checkAllCollisions = (entity: Entity) => {
        //     let hitbox = entity.getComponent(Hitbox)
        //     let cells = this.spatialHashing.hashHitbox(hitbox)
        //     let collidedEntities = new Array<Entity>()
        //     cells.forEach(cell => {
        //         let nearbyEntities = this.spatialHashing.proximityMap.get(cell)
        //         nearbyEntities?.forEach(nearbyEntity => {
        //             if (nearbyEntity === entity) return
        //             if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox))) collidedEntities.push(nearbyEntity)
        //         })
        //     })
        //     return collidedEntities
        // }
        // checkFirstCollision = (entity: Entity) => {
        //     let hitbox = entity.getComponent(Hitbox)
        //     let cells = this.spatialHashing.hashHitbox(hitbox)
        //     for (let cell of cells) {
        //         if (!this.spatialHashing.proximityMap.has(cell)) continue
        //         for (let nearbyEntity of this.spatialHashing.proximityMap.get(cell)!!) {
        //             if (nearbyEntity === entity) return
        //             if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox))) return nearbyEntity
        //         }
        //     }
        // }
        // senseAtPoint = (x: number, y: number) => {
        //     let hash = this.spatialHashing.hashPoint(x, y)
        //     let sensedEntities = new Array<Entity>()
        //     this.spatialHashing.proximityMap.get(hash)?.forEach(entity => {
        //         if (entity.getComponent(Hitbox).inside(x, y)) {
        //             sensedEntities.push(entity)
        //         }
        //     })
        //     return sensedEntities
        // }
        // senseWithHitbox = (hitbox: Hitbox) => {
        //     let hash = this.spatialHashing.hashHitbox(hitbox)
        //     let sensedEntities = new Array<Entity>()
        //     hash.forEach(hashString => {
        //         this.spatialHashing.proximityMap.get(hashString)?.forEach(nearbyEntity => {
        //             if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox))) {
        //                 sensedEntities.push(nearbyEntity)
        //             }
        //         })
        //     })
        //     return(sensedEntities)
        // }
    }
    handleEvent(gameEvent) {
        gameEvent.proximityMap.forEach(cell => {
            var _a;
            for (let i = 0; i < cell.length; i++) {
                for (let j = i + 1; j < cell.length; j++) {
                    if (checkCollision(cell[i].getComponent(Hitbox), cell[j].getComponent(Hitbox))) {
                        (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.pushEvent(new CollisionEvent(cell[i], cell[j]));
                    }
                }
            }
            // cell.forEach(entity1 => {
            //     cell.forEach(entity2 => {
            //         if (entity1 === entity2) return
            //         if (checkCollision(entity1.getComponent(Hitbox), entity2.getComponent(Hitbox))) {
            //             this.ecs?.pushEvent(new CollisionEvent(entity1, entity2))
            //         }
            //     })
            // })
            // cell.forEach(entity1 => {
            //     if (collisions.has(entity1)) collisions.set(entity1, new Set())
            //     let collidedEntities = collisions.get(entity1)!!
            //     cell.forEach(entity2 => {
            //         if (entity1 === entity2) return
            //         if (collidedEntities.has(entity2) ?? false) return
            //         if (checkCollision(entity1.getComponent(Hitbox), entity2.getComponent(Hitbox))) {
            //             collidedEntities.add(entity2)
            //             if (collisions.has(entity2)) {
            //                 collisions.get(entity2)!!.add(entity1)
            //             } else {
            //                 collisions.set(entity2, new Set([entity1]))
            //             }
            //         }
            //     })
            //     if (collidedEntities.size === 0) {
            //         collisions.delete(entity1)
            //     }
            // })
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
