import { Body } from "./body.js";
import { Entity } from "./entity.js";

class Box extends Entity {

    private width: number
    private height: number

    constructor(x: number, y: number, width: number, height: number) {
        super(new Body(x, y, width, height))
        this.width = width
        this.height = height
    }

    drawBody = (ctx: CanvasRenderingContext2D) => {
        return (x: number, y: number) => {
            ctx.fillRect(x, y, this.width, this.height)
        }
    }
    
    update = () => {
        this.body.update()
    }

}

export { Box }