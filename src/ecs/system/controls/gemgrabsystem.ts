import { Automaton, EntityState } from "../../component/fsm/automaton.js";
import { CollisionBody } from "../../component/physics/collisionbody.js";
import { Gravity } from "../../component/physics/gravity.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { JewelType } from "../../component/gameplay/jeweltype.js";
import { Position } from "../../component/physics/position.js";
import { Entity } from "../../entity/entity.js";
import { Jewel } from "../../entity/minigame/puzzle/jewel.js";
import { CollisionDetection } from "../physics/collisiondetection.js";
import { MouseSystem } from "./mousesystem.js";
import { UnorderedSystem } from "../system.js";

class GemGrabSystem extends UnorderedSystem {
    public componentsRequired = new Set([Automaton, JewelType, Hitbox])

    public swapped = new Array<Jewel>()

    public updateNeeded: boolean = false

    public moveMade: boolean = false

    constructor(private mouseSystem: MouseSystem, private collisionDetection: CollisionDetection) {
        super()
    }

    public update(interval: number): void {
        this.swapped.splice(0)
        let heldEntity = this.mouseSystem.heldEntity

        this.moveMade = false

        // Check to make sure that there is a held entity and that it is an unmatched gem
        if (heldEntity === null) return
        if (!this.entities.has(heldEntity)) return
        if (heldEntity.getComponent(Automaton).currentState !== EntityState.UNMATCHED) return

        let mouse = this.mouseSystem.mouse
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

        if (sensedEntities[0] !== undefined && sensedEntities[0].getComponent(Automaton).currentState === EntityState.UNMATCHED) {
            Position.swap(sensedEntities[0].getComponent(Position), heldEntity.getComponent(Position))
            this.swapped.push(sensedEntities[0])
            this.swapped.push(heldEntity)
            this.mouseSystem.heldEntity = null
            this.mouseSystem.wrenched = true
            this.moveMade = true
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