import { Bounds } from "../component/bounds.js";
import { Generator } from "../component/generator.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Automaton, EntityState } from "../component/automaton.js";
import { Jewel } from "../entity/puzzle/jewel.js";
import { CollisionDetection } from "./collisiondetection.js";
import { UnorderedSystem } from "./system.js"

class GeneratorSystem extends UnorderedSystem {
    public componentsRequired = new Set([Generator])

    constructor(private collisionDetection: CollisionDetection) {
        super()
    }

    public update = (interval: number) => {
        this.entities.forEach(entity => {
            let collisions = this.collisionDetection.checkAllCollisions(entity)

            if (collisions.length === 0) {
                let position = entity.getComponent(Position)
                let bounds = entity.getComponent(Bounds)
                let newBounds = new Bounds(bounds.xLowerBound, bounds.xUpperBound, bounds.yLowerBound, bounds.yUpperBound)
                let replacementJewel = new Jewel(position.x, position.y, new JewelType())
                replacementJewel.addComponent(newBounds)
                this.ecs?.addEntity(replacementJewel)
            } else {
                collisions.forEach(entity => {
                    entity.getComponent(JewelType).active = false
                })
            }

        })
    }

}

export {GeneratorSystem}