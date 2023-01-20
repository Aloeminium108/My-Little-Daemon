import { Bounds } from "../component/bounds.js";
import { Generator } from "../component/generator.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Automaton, State } from "../component/state.js";
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

            let position: Position
            let bounds = entity.getComponent(Bounds)
            let newBounds = new Bounds(bounds.xLowerBound, bounds.xUpperBound, bounds.yLowerBound, bounds.yUpperBound)
            let replacementJewel: Jewel

            switch (collisions.length) {
                case 0:
                    position = entity.getComponent(Position)
                    replacementJewel = new Jewel(position.x, position.y, new JewelType())
                    replacementJewel.addComponent(newBounds)
                    this.ecs?.addEntity(replacementJewel)
                    break
                case 1:
                    if (collisions[0].getComponent(Automaton).currentState !== State.FALLING) break
                    position = collisions[0].getComponent(Position)
                    position.y -= Jewel.width
                    replacementJewel = new Jewel(position.x, position.y, new JewelType())
                    replacementJewel.addComponent(newBounds)
                    this.ecs?.addEntity(replacementJewel)
                    break
            }

        })
    }

}

export {GeneratorSystem}