import { CollisionBody } from "../component/collisionbody.js";
import { Friction } from "../component/friction.js";
import { Gravity } from "../component/gravity.js";
import { Hitbox } from "../component/hitbox.js";
import { MouseGrabbable } from "../component/mousegrabbable.js";
import { MouseInteractable } from "../component/mouseinteractable.js";
import { Position } from "../component/position.js";
import { Sprite } from "../component/sprite.js";
import { Velocity } from "../component/velocity.js";
class Entity {
    constructor(ecs = null) {
        this.ecs = ecs;
        this.componentSet = new Map();
        this.childEntities = new Set;
        this.addComponent = (component) => {
            var _a;
            this.componentSet.set(component.constructor, component);
            (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.checkEntityForSystems(this);
        };
        this.hasComponent = (componentClass) => {
            return this.componentSet.has(componentClass);
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
            let missingComponent = Array.from(componentClasses).find(neededComponent => {
                return !this.componentSet.has(neededComponent);
            });
            return missingComponent === undefined;
        };
        this.addToECS = (ecs) => {
            this.ecs = ecs;
            this.childEntities.forEach(childEntity => {
                childEntity.ecs = ecs;
            });
        };
        this.addPhysicsBody = (x, y, z, spriteSrc) => {
            let position = new Position(x, y);
            this.addComponent(new Gravity());
            this.addComponent(new Friction());
            this.addComponent(new Velocity(0, 0));
            let sprite = new Sprite(z, spriteSrc);
            this.addComponent(sprite);
            return sprite.loadingPromise.then(() => {
                this.addComponent(position);
                this.addComponent(new Hitbox(position, sprite.sprite.width, sprite.sprite.height));
            });
        };
        this.addZeroGPhysicsBody = (x, y, z, spriteSrc) => {
            let position = new Position(x, y);
            this.addComponent(new Friction(0.8));
            let velocity = new Velocity(0, 0);
            this.addComponent(velocity);
            let sprite = new Sprite(z, spriteSrc);
            this.addComponent(sprite);
            return sprite.loadingPromise.then(() => {
                this.addComponent(position);
                let hitbox = new Hitbox(position, sprite.sprite.width, sprite.sprite.height);
                this.addComponent(hitbox);
                this.addComponent(new CollisionBody(hitbox, velocity, 1, 0));
            });
        };
        this.addMouseGrab = () => {
            this.addComponent(new MouseInteractable(this.getComponent(Sprite)));
            this.addComponent(new MouseGrabbable());
        };
    }
}
export { Entity };
