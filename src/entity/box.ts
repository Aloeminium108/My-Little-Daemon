import { Body } from "./body.js";
import { Entity } from "./entity.js";

class Box extends Entity {

    private x: number
    private y: number
    private width: number
    private height: number

    constructor(x: number, y: number, width: number, height: number) {
        super(new Body(x, y, width, height))
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    
}

export { Box }