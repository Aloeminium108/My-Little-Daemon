import { Automaton, EntityState } from "../../component/fsm/automaton.js";
import { Hitbox } from "../../component/physics/hitbox.js";
import { JewelType } from "../../component/gameplay/jeweltype.js";
import { Position } from "../../component/physics/position.js";
import { UnorderedSystem } from "../system.js";
class GemGrabSystem extends UnorderedSystem {
    constructor(mouseSystem, collisionDetection) {
        super();
        this.mouseSystem = mouseSystem;
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([Automaton, JewelType, Hitbox]);
        this.swapped = new Array();
        this.updateNeeded = false;
        this.moveMade = false;
    }
    update(interval) {
        this.swapped.splice(0);
        let heldEntity = this.mouseSystem.heldEntity;
        this.moveMade = false;
        // Check to make sure that there is a held entity and that it is an unmatched gem
        if (heldEntity === null)
            return;
        if (!this.entities.has(heldEntity))
            return;
        if (heldEntity.getComponent(Automaton).currentState !== EntityState.UNMATCHED)
            return;
        let mouse = this.mouseSystem.mouse;
        let hitbox = heldEntity.getComponent(Hitbox);
        let sensedEntities = [];
        // if (mouse.x > hitbox.x + hitbox.width) {
        //     sensedEntities = this.senseRight(hitbox)
        // } else if (mouse.x < hitbox.x) {
        //     sensedEntities = this.senseLeft(hitbox)
        // } else if (mouse.y > hitbox.y + hitbox.height) {
        //     sensedEntities = this.senseDown(hitbox)
        // } else if (mouse.y < hitbox.y) {
        //     sensedEntities = this.senseUp(hitbox)
        // }
        if (sensedEntities[0] !== undefined) {
            Position.swap(sensedEntities[0].getComponent(Position), heldEntity.getComponent(Position));
            this.swapped.push(sensedEntities[0]);
            this.swapped.push(heldEntity);
            this.mouseSystem.heldEntity = null;
            this.mouseSystem.wrenched = true;
            this.moveMade = true;
        }
    }
}
export { GemGrabSystem };
