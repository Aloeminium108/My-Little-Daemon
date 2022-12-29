import { Body } from "./body.js";
import { Entity } from "./entity.js";

class Box extends Entity {

    constructor(x: number, y: number, width: number, height: number) {
        super(new Body(x, y, width, height))
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.body.x, this.body.y, this.body.width, this.body.height)
    }
    
}

export { Box }