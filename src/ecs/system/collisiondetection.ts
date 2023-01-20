import { Hitbox } from "../component/hitbox.js";
import { Entity } from "../entity/entity.js";
import { SpatialHashing } from "./spatialhashing.js";
import { UnorderedSystem } from "./system.js";

class CollisionDetection extends UnorderedSystem {
    public componentsRequired = new Set([Hitbox])

    public collisions: Map<Entity, Array<Entity>> = new Map()

    constructor(private spatialHashing: SpatialHashing) {
        super()
    }

    public update(interval: number): void {

        this.collisions.clear()

        this.spatialHashing.proximityMap.forEach(cell => {
            cell.forEach(entity1 => {
                if (!this.collisions.has(entity1)) this.collisions.set(entity1, [])
                let collidedEntities = this.collisions.get(entity1)!!

                cell.forEach(entity2 => {

                    if (entity1 === entity2) return
                    if (collidedEntities.includes(entity2) ?? false) return
                    
                    if (this.checkCollision(entity1, entity2)) {
                        collidedEntities.push(entity2)

                        if (this.collisions.has(entity2)) {
                            this.collisions.get(entity2)!!.push(entity1)
                        } else {
                            this.collisions.set(entity2, [entity1])
                        }
                    }

                })

                if (collidedEntities.length === 0) {
                    this.collisions.delete(entity1)
                }
            })
        })

    }

    checkCollision = (entity1: Entity, entity2: Entity) => {
        let rect1 = entity1.getComponent(Hitbox) 
        let rect2 = entity2.getComponent(Hitbox)
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y
        )
    }

    checkAllCollisions = (entity: Entity) => {
        let hitbox = entity.getComponent(Hitbox)
        let cells = this.spatialHashing.hashHitbox(hitbox)
        let collidedEntities = new Array<Entity>()

        cells.forEach(cell => {

            let nearbyEntities = this.spatialHashing.proximityMap.get(cell)
            nearbyEntities?.forEach(nearbyEntity => {
                if (nearbyEntity === entity) return
                if (this.checkCollision(entity, nearbyEntity)) collidedEntities.push(nearbyEntity)

            })

        })
        return collidedEntities
    }

    checkFirstCollision = (entity: Entity) => {
        let hitbox = entity.getComponent(Hitbox)
        let cells = this.spatialHashing.hashHitbox(hitbox)

        for (let cell of cells) {
            if (!this.spatialHashing.proximityMap.has(cell)) continue
            for (let nearbyEntity of this.spatialHashing.proximityMap.get(cell)!!) {
                if (nearbyEntity === entity) return
                if (this.checkCollision(entity, nearbyEntity)) return nearbyEntity
            }
        }
    }

    senseAtPoint = (x: number, y: number) => {
        let hash = this.spatialHashing.hashPoint(x, y)
        let sensedEntities = new Array<Entity>()
        this.spatialHashing.proximityMap.get(hash)?.forEach(entity => {
            if (entity.getComponent(Hitbox).inside(x, y)) {
                sensedEntities.push(entity)
            }
        })
        
        return sensedEntities
        
    }
    
}


export {CollisionDetection}