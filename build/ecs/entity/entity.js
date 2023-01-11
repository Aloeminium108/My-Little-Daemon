import { Friction } from "../component/friction.js";
import { Gravity } from "../component/gravity.js";
import { Hitbox } from "../component/hitbox.js";
import { Position } from "../component/position.js";
import { Sprite } from "../component/sprite.js";
import { Velocity } from "../component/velocity.js";
class Entity {
    constructor(ecs = null) {
        this.ecs = ecs;
        this.componentSet = new Map();
        this.addComponent = (component) => {
            var _a;
            this.componentSet.set(component.constructor, component);
            console.log("Component added:", component);
            (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.checkEntityForSystems(this);
        };
        this.getComponent = (componentClass) => {
            return this.componentSet.get(componentClass);
        };
        this.getPossibleComponent = (componentClass) => {
            return this.componentSet.get(componentClass);
        };
        this.deleteComponent = (componentClass) => {
            var _a;
            this.componentSet.delete(componentClass);
            (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.checkEntityForSystems(this);
        };
        this.hasAll = (componentClasses) => {
            // for (let neededComponent of componentClasses) {
            //     if (!this.componentSet.has(neededComponent)) {
            //         return false
            //     }
            // }
            // return true
            let missingComponent = Array.from(componentClasses).find(neededComponent => {
                return !this.componentSet.has(neededComponent);
            });
            return missingComponent === undefined;
        };
        this.addToECS = (ecs) => {
            this.ecs = ecs;
        };
        this.addPhysicsBody = (x, y, image) => {
            let position = new Position(x, y);
            let sprite = new Sprite(0, image);
            this.addComponent(position);
            this.addComponent(sprite);
            this.addComponent(new Hitbox(position, image.width, image.height));
            this.addComponent(new Gravity());
            this.addComponent(new Friction());
            this.addComponent(new Velocity(0, 0));
        };
    }
}
export { Entity };
