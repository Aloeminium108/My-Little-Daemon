import { Bounds } from "../component/bounds.js";
import { Generator } from "../component/generator.js";
import { JewelType } from "../component/jeweltype.js";
import { Position } from "../component/position.js";
import { Automaton, EntityState } from "../component/automaton.js";
import { Jewel } from "../entity/puzzle/jewel.js";
import { CollisionDetection } from "./collisiondetection.js";
import { UnorderedSystem } from "./system.js"
import { Hitbox } from "../component/hitbox.js";

class GeneratorSystem extends UnorderedSystem {
    public componentsRequired = new Set([Generator, Hitbox])

    constructor(private collisionDetection: CollisionDetection) {
        super()
    }

    public update = (interval: number) => {
        this.entities.forEach(entity => {
            let collisions = this.collisionDetection.checkAllCollisions(entity)

            collisions.forEach(entity => {
                entity.getComponent(JewelType).active = false
            })

            let position: Position
            let bounds = entity.getComponent(Bounds)
            let newBounds = new Bounds(bounds.xLowerBound, bounds.xUpperBound, bounds.yLowerBound, bounds.yUpperBound, 0, false)
            let replacementJewel: Jewel

            switch (collisions.length) {
                case 0:
                    position = entity.getComponent(Position)
                    replacementJewel = new Jewel(position.x, position.y, new JewelType())
                    replacementJewel.addComponent(newBounds)
                    this.ecs?.addEntity(replacementJewel)
                    break
                case 1:
                    if (collisions[0].getComponent(Automaton).currentState !== EntityState.FALLING) break
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