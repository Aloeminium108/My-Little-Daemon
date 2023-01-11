import { Mouse } from "../../state/mouse.js";
import { ComponentType } from "../component/component.js";
import { Hitbox } from "../component/hitbox.js";
import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Velocity } from "../component/velocity.js";
import { Entity } from "../entity/entity.js";
import { OrderedSystem } from "./system.js";

class MouseGrabSystem extends OrderedSystem<MouseGrabbable> {

    private heldEntity: Entity | null = null

    public componentsRequired = new Set([MouseGrabbable, Hitbox])

    public orderingComponent = MouseGrabbable

    constructor(private mouse: Mouse, private canvas: HTMLCanvasElement) {
        super()
    }

    update = (interval: number) => {
        if (this.mouse.pressed) {
            this.holdEntity()
            this.moveHeldEntity()
            if (this.heldEntity === null) this.canvas.style.cursor = 'default'
            else this.canvas.style.cursor = 'grabbing'
        } else {
            if (this.checkMouseCollision() === null) this.canvas.style.cursor = 'default'
            else this.canvas.style.cursor = 'grab'
            this.heldEntity?.getPossibleComponent(Velocity)?.setDX(this.mouse.dx)
            this.heldEntity?.getPossibleComponent(Velocity)?.setDY(this.mouse.dy)
            this.heldEntity = null
        }

        this.heldEntity?.getComponent(Velocity)?.hold()
    }

    holdEntity = () => {
        if (this.heldEntity !== null) return
        this.heldEntity = this.checkMouseCollision()
    }

    moveHeldEntity = () => {
        this.heldEntity?.getComponent(Hitbox).moveCenterTo(this.mouse.x, this.mouse.y)
    }

    checkMouseCollision = () => {
        for (let entity of this.entities) {
            if (entity.getComponent(Hitbox).insideLastFrame(this.mouse.x, this.mouse.y)) {
                return entity
            }
        }
        return null
    }

}

export {MouseGrabSystem}