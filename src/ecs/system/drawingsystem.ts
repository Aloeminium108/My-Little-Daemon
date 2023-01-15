import { ComponentType, Component } from "../component/component";
import { Drawable } from "../component/drawable";
import { Position } from "../component/position";
import { UnorderedSystem } from "./system";

class DrawingSystem extends UnorderedSystem {

    public componentsRequired = new Set([Drawable, Position])

    constructor(private ctx: CanvasRenderingContext2D) {
        super()
    }

    update = (interval: number) => {
        this.entities.forEach(entity => {
            let position = entity.getComponent(Position)
            entity.getComponent(Drawable).draw(position.x, position.y, this.ctx)
        })
    }
    
}

export {DrawingSystem}