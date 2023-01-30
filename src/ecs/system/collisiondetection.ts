import { Hitbox } from "../component/hitbox.js";
import { Entity } from "../entity/entity.js";
import { SpatialHashing } from "./spatialhashing.js";
import { UnorderedSystem } from "./system.js";

const EPSILON = 0.001

class CollisionDetection extends UnorderedSystem {
    public componentsRequired = new Set([Hitbox])

    public collisions: Map<Entity, Set<Entity>> = new Map()

    constructor(private spatialHashing: SpatialHashing) {
        super()
    }

    public update(interval: number): void {

        this.collisions.clear()

        this.spatialHashing.proximityMap.forEach(cell => {
            cell.forEach(entity1 => {
                if (!this.collisions.has(entity1)) this.collisions.set(entity1, new Set())
                let collidedEntities = this.collisions.get(entity1)!!

                cell.forEach(entity2 => {

                    if (entity1 === entity2) return
                    if (collidedEntities.has(entity2) ?? false) return
                    
                    if (checkCollision(entity1.getComponent(Hitbox), entity2.getComponent(Hitbox))) {
                        collidedEntities.add(entity2)

                        if (this.collisions.has(entity2)) {
                            this.collisions.get(entity2)!!.add(entity1)
                        } else {
                            this.collisions.set(entity2, new Set([entity1]))
                        }
                    }

                })

                if (collidedEntities.size === 0) {
                    this.collisions.delete(entity1)
                }
            })
        })

    }

    checkAllCollisions = (entity: Entity) => {
        let hitbox = entity.getComponent(Hitbox)
        let cells = this.spatialHashing.hashHitbox(hitbox)
        let collidedEntities = new Array<Entity>()

        cells.forEach(cell => {

            let nearbyEntities = this.spatialHashing.proximityMap.get(cell)
            nearbyEntities?.forEach(nearbyEntity => {
                if (nearbyEntity === entity) return
                if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox))) collidedEntities.push(nearbyEntity)

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
                if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox))) return nearbyEntity
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

    senseWithHitbox = (hitbox: Hitbox) => {
        let hash = this.spatialHashing.hashHitbox(hitbox)
        let sensedEntities = new Array<Entity>()

        hash.forEach(hashString => {
            this.spatialHashing.proximityMap.get(hashString)?.forEach(nearbyEntity => {
                if (checkCollision(hitbox, nearbyEntity.getComponent(Hitbox))) {
                    sensedEntities.push(nearbyEntity)
                }
            })
        })

        return(sensedEntities)
        
    }
    
}

function checkCollision(hitbox1: Hitbox, hitbox2: Hitbox): boolean {
    return (
        hitbox1.x + EPSILON < hitbox2.x + hitbox2.width &&
        hitbox1.x + hitbox1.width > hitbox2.x + EPSILON &&
        hitbox1.y + EPSILON < hitbox2.y + hitbox2.height &&
        hitbox1.height + hitbox1.y > hitbox2.y + EPSILON
    )
}


export {CollisionDetection}