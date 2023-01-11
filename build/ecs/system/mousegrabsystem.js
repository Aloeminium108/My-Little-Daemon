import { Hitbox } from "../component/hitbox.js";
import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Velocity } from "../component/velocity.js";
import { UnorderedSystem } from "./system.js";
class MouseGrabSystem extends UnorderedSystem {
    constructor(mouseSystem) {
        super();
        this.mouseSystem = mouseSystem;
        this.componentsRequired = new Set([MouseGrabbable, Hitbox]);
        this.update = (interval) => {
            var _a, _b;
            if (this.mouseSystem.heldEntity !== null && this.entities.has(this.mouseSystem.heldEntity)) {
                (_b = (_a = this.mouseSystem.heldEntity) === null || _a === void 0 ? void 0 : _a.getComponent(Velocity)) === null || _b === void 0 ? void 0 : _b.hold();
                this.moveHeldEntity();
            }
            if (this.mouseSystem.releasedEntity !== null && this.entities.has(this.mouseSystem.releasedEntity)) {
                this.throwReleasedEntity();
            }
        };
        this.moveHeldEntity = () => {
            var _a;
            let heldEntity = (_a = this.mouseSystem.heldEntity) === null || _a === void 0 ? void 0 : _a.getComponent(Hitbox);
            let mouse = this.mouseSystem.mouse;
            heldEntity === null || heldEntity === void 0 ? void 0 : heldEntity.moveCenterTo(mouse.x, mouse.y);
        };
        this.throwReleasedEntity = () => {
            var _a;
            let releasedEntity = (_a = this.mouseSystem.releasedEntity) === null || _a === void 0 ? void 0 : _a.getPossibleComponent(Velocity);
            let mouse = this.mouseSystem.mouse;
            releasedEntity === null || releasedEntity === void 0 ? void 0 : releasedEntity.setDX(mouse.dx);
            releasedEntity === null || releasedEntity === void 0 ? void 0 : releasedEntity.setDY(mouse.dy);
        };
    }
}
export { MouseGrabSystem };
