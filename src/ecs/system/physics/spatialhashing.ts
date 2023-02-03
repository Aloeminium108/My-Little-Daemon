import { ComponentType, Component } from "../../component/component.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { Entity } from "../../entity/entity.js";
import { HashEvent } from "../eventsystem/events/hashevent.js";
import { UnorderedSystem } from "../system.js";

class SpatialHashing extends UnorderedSystem {
    
    public componentsRequired = new Set<ComponentType<Component>>([Hitbox])

    constructor(private cellSize: number,
        filter: Set<ComponentType<Component>> | null = null) {
        super()
        filter?.forEach(requiredComponent => {
            this.componentsRequired.add(requiredComponent)
        })
    }

    public update(interval: number): void {
        let proximityMap = new Map<string, Array<Entity>>()

        this.entities.forEach(entity => {
            let hitbox = entity.getComponent(Hitbox)
            // TODO: replace this with a call to hashHitbox
            let minX = Math.floor(hitbox.x/this.cellSize)
            let minY = Math.floor(hitbox.y/this.cellSize)
            let maxX = Math.floor((hitbox.x + hitbox.width)/this.cellSize)
            let maxY = Math.floor((hitbox.y + hitbox.height)/this.cellSize)

            for (let i = minX; i <= maxX; i++) {
                for (let j = minY; j <= maxY; j++) {
                    let hash = i.toString() + ',' + j.toString()

                    if (proximityMap.has(hash)) {
                        proximityMap.get(hash)?.push(entity)
                    } else {
                        proximityMap.set(hash, [entity])
                    }

                }
            }
        })

        this.ecs?.pushEvent(new HashEvent(proximityMap))

    }

    hashPoint = (x: number, y: number) => {
        let cellX = Math.floor(x/this.cellSize)
        let cellY = Math.floor(y/this.cellSize)
        return cellX.toString() + ',' + cellY.toString()
    }

    hashHitbox = (hitbox: Hitbox) => {
        let minX = Math.floor(hitbox.x/this.cellSize)
        let minY = Math.floor(hitbox.y/this.cellSize)
        let maxX = Math.floor((hitbox.x + hitbox.width)/this.cellSize)
        let maxY = Math.floor((hitbox.y + hitbox.height)/this.cellSize)

        let cells = new Set<string>
        for (let i = minX; i <= maxX; i++) {
            for (let j = minY; j <= maxY; j++) {
                let hash = i.toString() + ',' + j.toString()
                cells.add(hash)
            }
        }

        return cells
    }

}

export{SpatialHashing}