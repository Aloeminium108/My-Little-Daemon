import { Entity } from "./entity.js"

class Ball extends Entity {

    private radius: number

    constructor(x: number, y: number, radius: number) {
        super(x, y, radius*2, radius*2)
        this.radius = radius
    }

    draw(ctx: CanvasRenderingContext2D) {
        const {x, y, radius} = this
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.stroke()
    }

    override inside(x: number, y: number) {
        const xDistance = this.x - x
        const yDistance = this.y - y
        const distance = Math.sqrt((xDistance ** 2) + (yDistance ** 2))
        if (distance < this.radius) {
            return true
        } else {
            return false
        }
    }

    override boundaryCollision = (xBound: number, yBound: number) => {
        if(this.x - this.radius < 0) {
            this.x = this.radius
            this.dx *= -1
        } else if (this.x + this.radius > xBound) {
            this.x = xBound - this.radius
            this.dx *= -1
        }

        if(this.y - this.radius < 0) {
            this.y = this.radius
            this.dy *= -1
        } else if (this.y + this.radius > yBound) {
            this.y = yBound - this.radius
            this.dy *= -1
        }
    }

    override moveTo(newX: number, newY: number) {
        this.x = newX
        this.y = newY
    }

}


export { Ball }