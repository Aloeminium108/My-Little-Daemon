import { Bounds } from "../component/bounds.js";
import { Generator } from "../component/generator.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Automaton, EntityState } from "../component/automaton.js";
import { Jewel } from "../entity/puzzle/jewel.js";
import { UnorderedSystem } from "./system.js";
import { Hitbox } from "../component/hitbox.js";
class GeneratorSystem extends UnorderedSystem {
    constructor(collisionDetection) {
        super();
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([Generator, Hitbox]);
        this.update = (interval) => {
            this.entities.forEach(entity => {
                var _a, _b;
                let collisions = this.collisionDetection.checkAllCollisions(entity);
                collisions.forEach(entity => {
                    entity.getComponent(JewelType).active = false;
                });
                let position;
                let bounds = entity.getComponent(Bounds);
                let newBounds = new Bounds(bounds.xLowerBound, bounds.xUpperBound, bounds.yLowerBound, bounds.yUpperBound, 0);
                let replacementJewel;
                switch (collisions.length) {
                    case 0:
                        position = entity.getComponent(Position);
                        replacementJewel = new Jewel(position.x, position.y, new JewelType());
                        replacementJewel.addComponent(newBounds);
                        (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.addEntity(replacementJewel);
                        break;
                    case 1:
                        if (collisions[0].getComponent(Automaton).currentState !== EntityState.FALLING)
                            break;
                        position = collisions[0].getComponent(Position);
                        position.y -= Jewel.width;
                        replacementJewel = new Jewel(position.x, position.y, new JewelType());
                        replacementJewel.addComponent(newBounds);
                        (_b = this.ecs) === null || _b === void 0 ? void 0 : _b.addEntity(replacementJewel);
                        break;
                }
            });
        };
    }
}
export { GeneratorSystem };
