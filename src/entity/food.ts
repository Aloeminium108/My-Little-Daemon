import { Entity } from "./entity.js"
import { PhysicsBody } from "./body/physicsbody.js"

class Food extends Entity {
    protected body: PhysicsBody
    mouseOver = 'grab'
    mouseGrab = 'grabbing'

    private nourishmentValue: number

    constructor(x: number, y: number, nourishmentValue: number) {
        super()
        this.body = new PhysicsBody(x, y, 50, 50)
        this.nourishmentValue = nourishmentValue
    }

    drawBody = (ctx: CanvasRenderingContext2D) => {
        return (x: number, y: number) => {
            ctx.fillStyle = 'red'
            ctx.fillRect(x, y, 50, 50)
            ctx.fillStyle = 'black'
        }
    }

    updateSelf = (interval: number) => {
    }

    release = (dx: number, dy: number) => {
        this.body.toss(dx, dy)
    }

    getNourishmentValue = () => {
        return this.nourishmentValue
    }
}

export { Food }