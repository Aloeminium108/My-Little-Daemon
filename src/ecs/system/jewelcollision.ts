import { Gravity } from "../component/gravity.js";
import { Hitbox } from "../component/hitbox.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Entity } from "../entity/entity.js";
import { CollisionDetection } from "./collisiondetection.js";
import { UnorderedSystem } from "./system.js";

class JewelCollision extends UnorderedSystem {
    public componentsRequired = new Set([JewelType, Position, Hitbox])
    
    constructor(private collisionDetection: CollisionDetection) {
        super()
    }

    public update(interval: number): void {
        this.entities.forEach(entity => {
            let collisions = this.collisionDetection.collisions.get(entity)
            collisions?.forEach(collision => {
                if (this.entities.has(collision)) {
                    this.clippingResponse(entity, collision)
                }
            })
        })
    }

    clippingResponse = (jewel1: Entity, jewel2: Entity) => {
        if (!jewel1.hasComponent(Gravity) && !jewel2.hasComponent(Gravity)) return
        let jewel1Pos = jewel1.getComponent(Position)
        let jewel2Pos = jewel2.getComponent(Position)
        let jewel1Box = jewel1.getComponent(Hitbox)
        let jewel2Box = jewel2.getComponent(Hitbox)
        if (!jewel1.hasComponent(Gravity)) {
            jewel2Pos.y = jewel1Pos.y - jewel2Box.height
        } else if (!jewel2.hasComponent(Gravity)) {
            jewel1Pos.y = jewel2Pos.y - jewel1Box.height
        } else if (jewel1Pos.y < jewel2Pos.y) {
            jewel1Pos.y = jewel2Pos.y - jewel1Box.height 
        } else {
            jewel2Pos.y = jewel1Pos.y - jewel2Box.height
        }

        
    }
    
}

export {JewelCollision}