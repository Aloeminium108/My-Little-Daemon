abstract class Entity {
    static vCap = 50
    static friction = 0.99
    static gravity = 2

    radius: number
    protected x: number
    protected y: number
    protected dx: number
    protected dy: number
    protected held: boolean

    constructor(radius: number, x: number, y: number) {
        this.radius = radius
        this.x = x
        this.y = y
        this.dx = 0
        this.dy = 0
        this.held = false
    }

    abstract draw(ctx: CanvasRenderingContext2D): void

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
        if(this.dx > Entity.vCap) this.dx = Entity.vCap
        if(this.dy > Entity.vCap) this.dy = Entity.vCap
        if(this.dx < -Entity.vCap) this.dx = -Entity.vCap
        if(this.dy < -Entity.vCap) this.dy = -Entity.vCap

        if (!this.held) {
            this.dy += Entity.gravity
        }

        this.dx = Math.floor(Entity.friction * this.dx)
        this.dy = Math.floor(Entity.friction * this.dy)

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

    boundaryCollision = (xBound: number, yBound: number) => {
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
}

export { Entity }