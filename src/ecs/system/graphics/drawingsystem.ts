import { Drawable } from "../../component/graphics/drawable.js";
import { UnorderedSystem } from "../system.js";

class DrawingSystem extends UnorderedSystem {

    public componentsRequired = new Set([Drawable])

    constructor(private ctx: CanvasRenderingContext2D) {
        super()
    }

    update = (interval: number) => {
        this.entities.forEach(entity => {
            entity.getComponent(Drawable).draw(this.ctx)
        })
    }
    
}

export {DrawingSystem}