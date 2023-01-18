import { Mouse } from "../../gamestate/mouse.js";
import { Hitbox } from "../component/hitbox.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { Velocity } from "../component/velocity.js";
import { Entity } from "../entity/entity.js";
import { OrderedSystem } from "./system.js";

class MouseSystem extends OrderedSystem<MouseInteractable> {

    public heldEntity: Entity | null = null
    public releasedEntity: Entity | null = null

    // If for some reason the heldEntity is taken away while the mouse button is still
    // being held down, this is mean to keep track of that so whatever is under the mouse
    // doesn't get held immediately after.
    public wrenched: boolean = false

    public componentsRequired = new Set([MouseInteractable, Hitbox])

    public orderingComponent = MouseInteractable

    constructor(public mouse: Mouse, private canvas: HTMLCanvasElement) {
        super()
    }

    update = (interval: number) => {
        if (this.mouse.pressed) {
            this.holdEntity()
            this.releasedEntity = null
            this.canvas.style.cursor = this.heldEntity?.getComponent(MouseInteractable).hold ?? 'default'

        } else {
            this.canvas.style.cursor = this.checkMouseCollision()?.getComponent(MouseInteractable).hover ?? 'default'
            this.releasedEntity = this.heldEntity
            this.heldEntity = null
            this.wrenched = false
        }
    }

    holdEntity = () => {
        if (this.wrenched) return
        if (this.heldEntity !== null) return
        this.heldEntity = this.checkMouseCollision()
    }

    checkMouseCollision = () => {
        return this.entities.find((entity => {
            return entity.getComponent(Hitbox).insideLastFrame(this.mouse.x, this.mouse.y)
        })) ?? null
    }

}

export {MouseSystem}