import { Hitbox } from "../component/hitbox.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { OrderedSystem } from "./system.js";
class MouseSystem extends OrderedSystem {
    constructor(mouse, canvas) {
        super();
        this.mouse = mouse;
        this.canvas = canvas;
        this.heldEntity = null;
        this.releasedEntity = null;
        this.componentsRequired = new Set([MouseInteractable, Hitbox]);
        this.orderingComponent = MouseInteractable;
        this.update = (interval) => {
            var _a, _b, _c, _d;
            if (this.mouse.pressed) {
                this.holdEntity();
                this.releasedEntity = null;
                this.canvas.style.cursor = (_b = (_a = this.heldEntity) === null || _a === void 0 ? void 0 : _a.getComponent(MouseInteractable).hold) !== null && _b !== void 0 ? _b : 'default';
            }
            else {
                this.canvas.style.cursor = (_d = (_c = this.checkMouseCollision()) === null || _c === void 0 ? void 0 : _c.getComponent(MouseInteractable).hover) !== null && _d !== void 0 ? _d : 'default';
                this.releasedEntity = this.heldEntity;
                this.heldEntity = null;
            }
        };
        this.holdEntity = () => {
            if (this.heldEntity !== null)
                return;
            this.heldEntity = this.checkMouseCollision();
        };
        this.checkMouseCollision = () => {
            var _a;
            return (_a = this.entities.find((entity => {
                return entity.getComponent(Hitbox).insideLastFrame(this.mouse.x, this.mouse.y);
            }))) !== null && _a !== void 0 ? _a : null;
        };
    }
}
export { MouseSystem };
