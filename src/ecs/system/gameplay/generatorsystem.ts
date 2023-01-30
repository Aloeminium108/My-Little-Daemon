import { Bounds } from "../../component/physics/bounds.js";
import { Generator } from "../../component/gameplay/generator.js";
import { JewelType } from "../../component/gameplay/jeweltype.js";
import { Position } from "../../component/physics/position.js";
import { Automaton, EntityState } from "../../component/fsm/automaton.js";
import { Jewel } from "../../entity/minigame/puzzle/jewel.js";
import { CollisionDetection } from "../physics/collisiondetection.js";
import { UnorderedSystem } from "../system.js"

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