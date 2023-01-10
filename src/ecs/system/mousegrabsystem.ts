import { Mouse } from "../../state/mouse.js";
import { Hitbox } from "../component/hitbox.js";
import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Velocity } from "../component/velocity.js";
import { Entity } from "../entity.js";
import { System } from "./system.js";

class MouseGrabSystem extends System {

    private heldEntity: Entity | null = null

    public componentsRequired = new Set([MouseGrabbable, Hitbox])

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
            this.heldEntity = null
        }

        this.heldEntity?.getComponent(Velocity)?.hold()
    }

    animate = (ctx: CanvasRenderingContext2D) => {}

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