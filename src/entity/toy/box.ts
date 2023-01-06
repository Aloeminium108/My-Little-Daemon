import { Body } from "../body/body.js";
import { PhysicsBody } from "../body/physicsbody.js";
import { Entity } from "../entity.js";

class Box implements Entity {
    protected body: PhysicsBody
    private width: number
    private height: number
    mouseOver = 'grab'
    mouseHold = 'grabbing'

    constructor(x: number, y: number, width: number, height: number) {
        this.body = new PhysicsBody(x, y, width, height)
        this.width = width
        this.height = height
    }

    getBody(): Body {
        return this.body
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.body.getX(), this.body.getY(), this.width, this.height)
    }

    getMouseOver(): string {
        return this.mouseOver
    }

    getMouseHold(): string {
        return this.mouseHold
    }

}

export { Box }