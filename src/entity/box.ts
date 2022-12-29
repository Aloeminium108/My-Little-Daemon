import { Entity } from "./entity.js";

class Box extends Entity {
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.body.x, this.body.y, this.body.width, this.body.height)
    }
    
}

export { Box }