import { Entity } from "../entity/entity.js"

class Ball extends Entity {

    constructor(radius: number, x: number, y: number) {
        super(radius, x, y)
    }

    draw(ctx: CanvasRenderingContext2D) {
        const {x, y, radius} = this
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.stroke()
    }

}


export { Ball }