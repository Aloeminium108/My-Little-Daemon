import { Mouse } from "../../state/mouse.js";
import { Hitbox } from "../component/hitbox.js";
import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Velocity } from "../component/velocity.js";
import { Entity } from "../entity/entity.js";
import { MouseSystem } from "./moussystem.js";
import { UnorderedSystem } from "./system.js";

class MouseGrabSystem extends UnorderedSystem {

    public componentsRequired = new Set([MouseGrabbable, Hitbox])

    constructor(private mouseSystem: MouseSystem) {
        super()
    }

    update = (interval: number) => {
        if (this.mouseSystem.heldEntity !== null && this.entities.has(this.mouseSystem.heldEntity)) {
            this.mouseSystem.heldEntity?.getComponent(Velocity)?.hold()
            this.moveHeldEntity()
        }
        if (this.mouseSystem.releasedEntity !== null && this.entities.has(this.mouseSystem.releasedEntity)) {
            this.throwReleasedEntity()
        }
    }

    moveHeldEntity = () => {
        let heldEntity = this.mouseSystem.heldEntity?.getComponent(Hitbox)
        let mouse = this.mouseSystem.mouse
        heldEntity?.moveCenterTo(mouse.x, mouse.y)
    }

    throwReleasedEntity = () => {
        let releasedEntity = this.mouseSystem.releasedEntity?.getPossibleComponent(Velocity)
        let mouse = this.mouseSystem.mouse
        releasedEntity?.setDX(mouse.dx)
        releasedEntity?.setDY(mouse.dy)
    }

}

export {MouseGrabSystem}