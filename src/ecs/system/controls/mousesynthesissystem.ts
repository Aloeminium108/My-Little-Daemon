import { MouseComponent } from "../../component/controls/mousecomponent2.js";
import { MouseGrabbable } from "../../component/controls/mousegrabbable.js";
import { MouseInteractable } from "../../component/controls/mouseinteractable.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { Entity } from "../../entity/entity.js";
import { EntityGrabEvent } from "../eventsystem/events/mouseevents/entitygrabevent.js";
import { EntityHoldEvent } from "../eventsystem/events/mouseevents/entityholdevent.js";
import { EntityMouseOverEvent } from "../eventsystem/events/mouseevents/entitymouseover.js";
import { EntityReleaseEvent } from "../eventsystem/events/mouseevents/entityreleaseevent.js";
import { MouseGameEvent } from "../eventsystem/events/mouseevents/mousegameevent.js";
import { EventSynthesisSystem } from "../eventsystem/listeners/gameeventlistener.js";

class MouseSynthesisSystem extends EventSynthesisSystem {

    eventClasses = new Set([MouseGameEvent, EntityMouseOverEvent])

    private heldEntity: Entity | null = null
    private mouseInformation: MouseComponent = new MouseComponent()
    private wrenched: boolean = false

    constructor(private canvas: HTMLCanvasElement) {
        super()
    }

    update = (interval: number) => {
        let mouseGameEvents = this.getEventStack(MouseGameEvent)

        if (mouseGameEvents !== undefined) {
            while (mouseGameEvents.length > 0) {
                this.mouseInformation.update(mouseGameEvents.pop()!!)
            }
        }

        let handler = this.mouseInformation.pressed ? this.handleMousePressed : this.handleMouseReleased
        handler()

        this.wrenched = false
        console.log

        this.getEventStack(EntityMouseOverEvent).splice(0)
    }

    handleMousePressed = () => {
        if (this.heldEntity !== null) {
            if (
                this.wrenched
                || !this.heldEntity.getComponent(Hitbox).inside(this.mouseInformation.x, this.mouseInformation.y)
                && !this.heldEntity.hasComponent(MouseGrabbable)
            ) {
                this.releaseHeldEntity()
            } else {
               this.ecs?.pushEvent(new EntityHoldEvent(this.heldEntity, this.mouseInformation)) 
               this.canvas.style.cursor = this.heldEntity.getComponent(MouseInteractable).hold
            }
        } else {
            if (this.wrenched) return

            let mousedOverEntities = this.getEventStack(EntityMouseOverEvent)

            let topEntity = this.getTopEntity(mousedOverEntities)

            if (topEntity === undefined) return

            this.ecs?.pushEvent(new EntityGrabEvent(topEntity, this.mouseInformation))
            this.ecs?.pushEvent(new EntityHoldEvent(topEntity, this.mouseInformation))
            this.heldEntity = topEntity
        }
    }

    handleMouseReleased = () => {
        if (this.heldEntity !== null) {
            this.ecs?.pushEvent(new EntityReleaseEvent(this.heldEntity, this.mouseInformation))
            this.heldEntity = null
        } else {
            let mousedOverEntities = this.getEventStack(EntityMouseOverEvent)

            let topEntity = this.getTopEntity(mousedOverEntities)

            this.canvas.style.cursor = topEntity?.getComponent(MouseInteractable).hover ?? 'default'
        }
    }

    releaseHeldEntity = () => {
        if (this.heldEntity === null) return

        this.ecs?.pushEvent(new EntityReleaseEvent(this.heldEntity, this.mouseInformation))
        this.heldEntity = null
        return
    }

    getTopEntity = (mousedOverEntities: EntityMouseOverEvent[] | undefined) => {
        if (
            mousedOverEntities === undefined
            || mousedOverEntities.length === 0
        ) return

        mousedOverEntities.sort((a, b) => {
            return a.entity.getComponent(MouseInteractable).index - b.entity.getComponent(MouseInteractable).index
        })

        return mousedOverEntities[0].entity
    }

}

export {MouseSynthesisSystem}