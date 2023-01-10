import { Hitbox } from "../component/hitbox.js";
import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Velocity } from "../component/velocity.js";
import { System } from "./system.js";
class MouseGrabSystem extends System {
    constructor(mouse, canvas) {
        super();
        this.mouse = mouse;
        this.canvas = canvas;
        this.heldEntity = null;
        this.componentsRequired = new Set([MouseGrabbable, Hitbox]);
        this.update = (interval) => {
            var _a, _b;
            if (this.mouse.pressed) {
                this.holdEntity();
                this.moveHeldEntity();
                this.canvas.style.cursor = 'grabbing';
            }
            else {
                if (this.checkMouseCollision() === null)
                    this.canvas.style.cursor = 'default';
                else
                    this.canvas.style.cursor = 'grab';
                this.heldEntity = null;
            }
            (_b = (_a = this.heldEntity) === null || _a === void 0 ? void 0 : _a.getComponent(Velocity)) === null || _b === void 0 ? void 0 : _b.hold();
        };
        this.animate = (ctx) => { };
        this.holdEntity = () => {
            if (this.heldEntity !== null)
                return;
            this.heldEntity = this.checkMouseCollision();
        };
        this.moveHeldEntity = () => {
            var _a;
            (_a = this.heldEntity) === null || _a === void 0 ? void 0 : _a.getComponent(Hitbox).moveCenterTo(this.mouse.x, this.mouse.y);
        };
        this.checkMouseCollision = () => {
            for (let entity of this.entities) {
                if (entity.getComponent(Hitbox).inside(this.mouse.x, this.mouse.y)) {
                    return entity;
                }
            }
            return null;
        };
    }
}
export { MouseGrabSystem };
