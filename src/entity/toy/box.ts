import { PhysicsBody } from "../body/physicsbody.js";
import { Entity } from "../entity.js";

class Box extends Entity {
    protected body: PhysicsBody
    private width: number
    private height: number
    mouseOver = 'grab'
    mouseGrab = 'grabbing'

    constructor(x: number, y: number, width: number, height: number) {
        super()
        this.body = new PhysicsBody(x, y, width, height)
        this.width = width
        this.height = height
    }

    drawBody = (ctx: CanvasRenderingContext2D) => {
        return (x: number, y: number) => {
            ctx.fillRect(x, y, this.width, this.height)
        }
    }
    
    updateSelf = () => {
    }

    release(dx: number, dy: number) {
        this.body.toss(dx, dy)
    }

}

export { Box }