import { Entity } from "./entity.js"
import { PhysicsBody } from "./body/physicsbody.js"
import { Body } from "./body/body.js"

class Food implements Entity {
    protected body: PhysicsBody
    mouseOver = 'grab'
    mouseHold = 'grabbing'

    private nourishmentValue: number

    constructor(x: number, y: number, nourishmentValue: number) {
        this.body = new PhysicsBody(x, y, 50, 50)
        this.nourishmentValue = nourishmentValue
    }

    getBody(): Body {
        return this.body
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.body.getX(), this.body.getY(), 50, 50)
    }

    getMouseOver(): string {
        return this.mouseOver
    }

    getMouseHold(): string {
        return this.mouseHold
    }

    getNourishmentValue = () => {
        return this.nourishmentValue
    }
}

export { Food }