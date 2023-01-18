import { Gravity } from "../component/gravity.js";
import { Hitbox } from "../component/hitbox.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { UnorderedSystem } from "./system.js";
class GemGrabSystem extends UnorderedSystem {
    constructor(mouseSystem) {
        super();
        this.mouseSystem = mouseSystem;
        this.componentsRequired = new Set([JewelType, Hitbox]);
        this.swapped = new Set();
        this.updateNeeded = false;
    }
    update(interval) {
        this.updateNeeded = false;
        this.swapped.clear();
        let heldEntity = this.mouseSystem.heldEntity;
        // Check to make sure that there is a held entity and that it is a gem
        if (heldEntity === null)
            return;
        if (!heldEntity.hasComponent(JewelType))
            return;
        if (heldEntity.hasComponent(Gravity))
            return;
        let mouse = this.mouseSystem.mouse;
        for (let entity of this.entities) {
            // Do nothing if the entity being examined is the held entity itself
            if (entity === heldEntity)
                continue;
            // Do nothing if the entity is falling
            if (entity.hasComponent(Gravity))
                continue;
            // If gem is dragged over another gem, swap their positions
            if (entity.getComponent(Hitbox).inside(mouse.x, mouse.y)) {
                Position.swap(entity.getComponent(Position), heldEntity.getComponent(Position));
                this.swapped.add(entity);
                this.swapped.add(heldEntity);
                this.mouseSystem.heldEntity = null;
                this.mouseSystem.wrenched = true;
                this.updateNeeded = true;
                break;
            }
        }
    }
}
export { GemGrabSystem };
