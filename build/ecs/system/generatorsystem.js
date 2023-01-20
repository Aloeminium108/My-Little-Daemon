import { Bounds } from "../component/bounds.js";
import { Generator } from "../component/generator.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Automaton, State } from "../component/state.js";
import { Jewel } from "../entity/puzzle/jewel.js";
import { UnorderedSystem } from "./system.js";
class GeneratorSystem extends UnorderedSystem {
    constructor(collisionDetection) {
        super();
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([Generator]);
        this.update = (interval) => {
            this.entities.forEach(entity => {
                var _a, _b;
                let collisions = this.collisionDetection.checkAllCollisions(entity);
                let position;
                let bounds = entity.getComponent(Bounds);
                let newBounds = new Bounds(bounds.xLowerBound, bounds.xUpperBound, bounds.yLowerBound, bounds.yUpperBound);
                let replacementJewel;
                switch (collisions.length) {
                    case 0:
                        position = entity.getComponent(Position);
                        replacementJewel = new Jewel(position.x, position.y, new JewelType());
                        replacementJewel.addComponent(newBounds);
                        (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.addEntity(replacementJewel);
                        break;
                    case 1:
                        if (collisions[0].getComponent(Automaton).currentState !== State.FALLING)
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
