import { Hitbox } from "../component/hitbox.js";
import { MouseGrabbable } from "../component/mousegrabbable.js";
import { Velocity } from "../component/velocity.js";
import { OrderedSystem } from "./system.js";
class MouseGrabSystem extends OrderedSystem {
    constructor(mouse, canvas) {
        super();
        this.mouse = mouse;
        this.canvas = canvas;
        this.heldEntity = null;
        this.componentsRequired = new Set([MouseGrabbable, Hitbox]);
        this.orderingComponent = MouseGrabbable;
        this.update = (interval) => {
            var _a, _b, _c, _d, _e, _f;
            if (this.mouse.pressed) {
                this.holdEntity();
                this.moveHeldEntity();
                if (this.heldEntity === null)
                    this.canvas.style.cursor = 'default';
                else
                    this.canvas.style.cursor = 'grabbing';
            }
            else {
                if (this.checkMouseCollision() === null)
                    this.canvas.style.cursor = 'default';
                else
                    this.canvas.style.cursor = 'grab';
                (_b = (_a = this.heldEntity) === null || _a === void 0 ? void 0 : _a.getPossibleComponent(Velocity)) === null || _b === void 0 ? void 0 : _b.setDX(this.mouse.dx);
                (_d = (_c = this.heldEntity) === null || _c === void 0 ? void 0 : _c.getPossibleComponent(Velocity)) === null || _d === void 0 ? void 0 : _d.setDY(this.mouse.dy);
                this.heldEntity = null;
            }
            (_f = (_e = this.heldEntity) === null || _e === void 0 ? void 0 : _e.getComponent(Velocity)) === null || _f === void 0 ? void 0 : _f.hold();
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
                if (entity.getComponent(Hitbox).insideLastFrame(this.mouse.x, this.mouse.y)) {
                    return entity;
                }
            }
            return null;
        };
    }
}
export { MouseGrabSystem };
