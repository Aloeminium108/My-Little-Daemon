import { Automaton, EntityState } from "../component/automaton.js";
import { CollisionBody } from "../component/collisionbody.js";
import { Gravity } from "../component/gravity.js";
import { Hitbox } from "../component/hitbox.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Entity } from "../entity/entity.js";
import { Jewel } from "../entity/puzzle/jewel.js";
import { CollisionDetection } from "./collisiondetection.js";
import { MouseSystem } from "./mousesystem.js";
import { UnorderedSystem } from "./system.js";

class GemGrabSystem extends UnorderedSystem {
    public componentsRequired = new Set([Automaton, JewelType, Hitbox])

    public swapped = new Set<Jewel>()

    public updateNeeded: boolean = false

    constructor(private mouseSystem: MouseSystem, private collisionDetection: CollisionDetection) {
        super()
    }

    public update(interval: number): void {
        this.swapped.clear()
        let heldEntity = this.mouseSystem.heldEntity

        // Check to make sure that there is a held entity and that it is an unmatched gem
        if (heldEntity === null) return
        if (!this.entities.has(heldEntity)) return
        if (heldEntity.getComponent(Automaton).currentState !== EntityState.UNMATCHED) return

        let mouse = this.mouseSystem.mouse

        // for (let entity of this.entities) {
        //     // Do nothing if the entity being examined is the held entity itself
        //     if (entity === heldEntity) continue
        //     // Do nothing if the entity is falling
        //     if (entity.getComponent(Automaton).currentState !== EntityState.UNMATCHED) continue

        //     // If gem is dragged over another gem, swap their positions
        //     if (entity.getComponent(Hitbox).inside(mouse.x, mouse.y)) {
        //         Position.swap(entity.getComponent(Position), heldEntity.getComponent(Position))
        //         this.swapped.add(entity)
        //         this.swapped.add(heldEntity)
        //         this.mouseSystem.heldEntity = null
        //         this.mouseSystem.wrenched = true
        //         this.updateNeeded = true
        //         break
        //     }
        // }
        let hitbox = heldEntity.getComponent(Hitbox)

        let sensedEntities: Array<Entity> = []

        if (mouse.x > hitbox.x + hitbox.width) {
            sensedEntities = this.senseRight(hitbox)
        } else if (mouse.x < hitbox.x) {
            sensedEntities = this.senseLeft(hitbox)
        } else if (mouse.y > hitbox.y + hitbox.height) {
            sensedEntities = this.senseDown(hitbox)
        } else if (mouse.y < hitbox.y) {
            sensedEntities = this.senseUp(hitbox)
        }

        if (sensedEntities[0] !== undefined) {
            Position.swap(sensedEntities[0].getComponent(Position), heldEntity.getComponent(Position))
            this.swapped.add(sensedEntities[0])
            this.swapped.add(heldEntity)
            this.mouseSystem.heldEntity = null
            this.mouseSystem.wrenched = true
        }

    }

    private senseUp = (hitbox: Hitbox) => {
        let center = hitbox.center

        let rayDown = {
            x: center.x, 
            y: center.y - hitbox.height
        }

        return this.collisionDetection.senseAtPoint(
            rayDown.x, rayDown.y
        )
    }

    private senseDown = (hitbox: Hitbox) => {
        let center = hitbox.center

        let rayDown = {
            x: center.x, 
            y: center.y + (hitbox.height)
        }

        return this.collisionDetection.senseAtPoint(
            rayDown.x, rayDown.y
        )
    }

    private senseRight = (hitbox: Hitbox) => {
        let center = hitbox.center

        let rayRight = {
            x: center.x + (hitbox.width), 
            y: center.y
        }

        return this.collisionDetection.senseAtPoint(
            rayRight.x, rayRight.y
        )
    }

    private senseLeft = (hitbox: Hitbox) => {
        let center = hitbox.center

        let rayRight = {
            x: center.x - (hitbox.width), 
            y: center.y
        }

        return this.collisionDetection.senseAtPoint(
            rayRight.x, rayRight.y
        )
    }
    
}

export {GemGrabSystem}