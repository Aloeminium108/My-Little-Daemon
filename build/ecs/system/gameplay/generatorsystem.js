import { Generator } from "../../component/gameplay/generator.js";
import { UnorderedSystem } from "../system.js";
class GeneratorSystem extends UnorderedSystem {
    constructor() {
        super(...arguments);
        this.componentsRequired = new Set([Generator]);
        this.update = (interval) => {
            // this.entities.forEach(entity => {
            //     let collisions = this.collisionDetection.checkAllCollisions(entity)
            //     if (collisions.length === 0) {
            //         let position = entity.getComponent(Position)
            //         let bounds = entity.getComponent(Bounds)
            //         let newBounds = new Bounds(bounds.xLowerBound, bounds.xUpperBound, bounds.yLowerBound, bounds.yUpperBound)
            //         let replacementJewel = new Jewel(position.x, position.y, new JewelType())
            //         replacementJewel.addComponent(newBounds)
            //         this.ecs?.addEntity(replacementJewel)
            //     } else {
            //         collisions.forEach(entity => {
            //             entity.getComponent(JewelType).active = false
            //         })
            //     }
            // })
        };
    }
}
export { GeneratorSystem };
