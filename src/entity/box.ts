import { Entity } from "./entity.js";

class Box extends Entity {
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    
}

export { Box }