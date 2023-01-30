import { Bounds } from "../../component/physics/bounds.js";
import { Generator } from "../../component/gameplay/generator.js";
import { JewelType } from "../../component/gameplay/jeweltype.js";
import { Position } from "../../component/physics/position.js";
import { Jewel } from "../../entity/minigame/puzzle/jewel.js";
import { UnorderedSystem } from "../system.js";
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
                else {
                    collisions.forEach(entity => {
                        entity.getComponent(JewelType).active = false;
                    });
                }
            });
        };
    }
}
export { GeneratorSystem };
