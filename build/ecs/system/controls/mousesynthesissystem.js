import { MouseComponent } from "../../component/controls/mousecomponent2.js";
import { MouseGrabbable } from "../../component/controls/mousegrabbable.js";
import { MouseInteractable } from "../../component/controls/mouseinteractable.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { EntityGrabEvent } from "../eventsystem/events/mouseevents/entitygrabevent.js";
import { EntityHoldEvent } from "../eventsystem/events/mouseevents/entityholdevent.js";
import { EntityMouseOverEvent } from "../eventsystem/events/mouseevents/entitymouseover.js";
import { EntityReleaseEvent } from "../eventsystem/events/mouseevents/entityreleaseevent.js";
import { MouseGameEvent } from "../eventsystem/events/mouseevents/mousegameevent.js";
import { EventSynthesisSystem } from "../eventsystem/listeners/gameeventlistener.js";
class MouseSynthesisSystem extends EventSynthesisSystem {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.eventClasses = new Set([MouseGameEvent, EntityMouseOverEvent]);
        this.heldEntity = null;
        this.mouseInformation = new MouseComponent();
        this.wrenched = false;
        this.update = (interval) => {
            let mouseGameEvents = this.getEventStack(MouseGameEvent);
            if (mouseGameEvents !== undefined) {
                while (mouseGameEvents.length > 0) {
                    this.mouseInformation.update(mouseGameEvents.pop());
                }
            }
            let handler = this.mouseInformation.pressed ? this.handleMousePressed : this.handleMouseReleased;
            handler();
            this.wrenched = false;
            console.log;
            this.getEventStack(EntityMouseOverEvent).splice(0);
        };
        this.handleMousePressed = () => {
            var _a, _b, _c;
            if (this.heldEntity !== null) {
                if (this.wrenched
                    || !this.heldEntity.getComponent(Hitbox).inside(this.mouseInformation.x, this.mouseInformation.y)
                        && !this.heldEntity.hasComponent(MouseGrabbable)) {
                    this.releaseHeldEntity();
                }
                else {
                    (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.pushEvent(new EntityHoldEvent(this.heldEntity, this.mouseInformation));
                    this.canvas.style.cursor = this.heldEntity.getComponent(MouseInteractable).hold;
                }
            }
            else {
                if (this.wrenched)
                    return;
                let mousedOverEntities = this.getEventStack(EntityMouseOverEvent);
                let topEntity = this.getTopEntity(mousedOverEntities);
                if (topEntity === undefined)
                    return;
                (_b = this.ecs) === null || _b === void 0 ? void 0 : _b.pushEvent(new EntityGrabEvent(topEntity, this.mouseInformation));
                (_c = this.ecs) === null || _c === void 0 ? void 0 : _c.pushEvent(new EntityHoldEvent(topEntity, this.mouseInformation));
                this.heldEntity = topEntity;
            }
        };
        this.handleMouseReleased = () => {
            var _a, _b;
            if (this.heldEntity !== null) {
                (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.pushEvent(new EntityReleaseEvent(this.heldEntity, this.mouseInformation));
                this.heldEntity = null;
            }
            else {
                let mousedOverEntities = this.getEventStack(EntityMouseOverEvent);
                let topEntity = this.getTopEntity(mousedOverEntities);
                this.canvas.style.cursor = (_b = topEntity === null || topEntity === void 0 ? void 0 : topEntity.getComponent(MouseInteractable).hover) !== null && _b !== void 0 ? _b : 'default';
            }
        };
        this.releaseHeldEntity = () => {
            var _a;
            if (this.heldEntity === null)
                return;
            (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.pushEvent(new EntityReleaseEvent(this.heldEntity, this.mouseInformation));
            this.heldEntity = null;
            return;
        };
        this.getTopEntity = (mousedOverEntities) => {
            if (mousedOverEntities === undefined
                || mousedOverEntities.length === 0)
                return;
            mousedOverEntities.sort((a, b) => {
                return a.entity.getComponent(MouseInteractable).index - b.entity.getComponent(MouseInteractable).index;
            });
            return mousedOverEntities[0].entity;
        };
    }
}
export { MouseSynthesisSystem };
