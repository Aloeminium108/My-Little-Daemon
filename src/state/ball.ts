class Ball {
    static vCap = 50
    static friction = 0.99
    static gravity = 2

    radius: number
    x: number
    y: number
    dx: number
    dy: number
    held: boolean

    constructor(radius: number, x: number, y: number) {
        this.radius = radius
        this.x = x
        this.y = y
        this.dx = 0
        this.dy = 0
        this.held = false
    }

    draw(ctx: CanvasRenderingContext2D) {
        const {x, y, radius} = this
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.stroke()
    }

    moveTo(newX: number, newY: number) {
        this.x = newX
        this.y = newY
    }

    hold() {
        this.held = true
        this.dx = 0
        this.dy = 0
    }

    release() {
        this.held = false
    }

    update() {
        if(this.dx > Ball.vCap) this.dx = Ball.vCap
        if(this.dy > Ball.vCap) this.dy = Ball.vCap
        if(this.dx < -Ball.vCap) this.dx = -Ball.vCap
        if(this.dy < -Ball.vCap) this.dy = -Ball.vCap

        if (!this.held) {
            this.dy += Ball.gravity
        }

        this.dx = Math.floor(Ball.friction * this.dx)
        this.dy = Math.floor(Ball.friction * this.dy)

        this.x += this.dx
        this.y += this.dy
    }

    inside(x: number, y: number) {
        const xDistance = this.x - x
        const yDistance = this.y - y
        const distance = Math.sqrt((xDistance ** 2) + (yDistance ** 2))
        if (distance < this.radius) {
            return true
        } else {
            return false
        }
    }
}


export { Ball }