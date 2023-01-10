import { Drawable } from "../component/drawable.js";
import { Position } from "../component/position.js";
import { System } from "./system.js";

class DrawingSystem extends System {

    public componentsRequired = new Set([Drawable, Position])

    update = (interval: number) => {}

    animate = (ctx: CanvasRenderingContext2D) => {
        this.entities.forEach(entity => {
            entity.getComponent(Drawable).draw(ctx)
        })
    }
    
}

export {DrawingSystem}