import { Bounds } from "../component/bounds.js";
import { Generator } from "../component/generator.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Jewel } from "../entity/puzzle/jewel.js";
import { UnorderedSystem } from "./system.js";
class GeneratorSystem extends UnorderedSystem {
    constructor(collisionDetection) {
        super();
        this.collisionDetection = collisionDetection;
        this.componentsRequired = new Set([Generator]);
        this.update = (interval) => {
            this.entities.forEach(entity => {
                var _a;
                let collisions = this.collisionDetection.checkAllCollisions(entity);
                if (collisions.length === 0) {
                    let position = entity.getComponent(Position);
                    let bounds = entity.getComponent(Bounds);
                    let newBounds = new Bounds(bounds.xLowerBound, bounds.xUpperBound, bounds.yLowerBound, bounds.yUpperBound);
                    let replacementJewel = new Jewel(position.x, position.y, new JewelType());
                    replacementJewel.addComponent(newBounds);
                    (_a = this.ecs) === null || _a === void 0 ? void 0 : _a.addEntity(replacementJewel);
                }
            });
        };
    }
}
export { GeneratorSystem };
