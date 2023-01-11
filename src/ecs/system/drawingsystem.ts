import { Sprite } from "../component/sprite.js";
import { Position } from "../component/position.js";
import { OrderedSystem } from "./system.js";
import { ComponentType } from "../component/component.js";

class DrawingSystem extends OrderedSystem<Sprite> {

    public componentsRequired = new Set([Sprite, Position])

    public orderingComponent = Sprite

    constructor(private ctx: CanvasRenderingContext2D) {
        super()
    }

    update = (interval: number) => {
        this.entities.forEach(entity => {
            entity.getComponent(Sprite).draw(this.ctx)
        })
    }
    
}

export {DrawingSystem}