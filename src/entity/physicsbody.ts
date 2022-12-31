import { Body } from "./body.js"

class PhysicsBody extends Body {
    private static vCap = 50
    private static friction = 0.99
    private static gravity = 1
    private static boundaryElasticity = 0.8
    private static floorElasticity = 0.7

    private dx: number = 0
    private dy: number = 0

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height)
    }

    update() {
        if(this.dx > PhysicsBody.vCap) this.dx = PhysicsBody.vCap
        if(this.dy > PhysicsBody.vCap) this.dy = PhysicsBody.vCap
        if(this.dx < -PhysicsBody.vCap) this.dx = -PhysicsBody.vCap
        if(this.dy < -PhysicsBody.vCap) this.dy = -PhysicsBody.vCap

        if (!this.held) {
            this.dy += PhysicsBody.gravity
        }

        this.dx = PhysicsBody.friction * this.dx
        this.dy = PhysicsBody.friction * this.dy

        this.x += this.dx
        this.y += this.dy
    }

    boundaryCollision = (xBound: number, yBound: number) => {
        if(this.x < 0) {
            this.x = 0
            this.dx *= -PhysicsBody.boundaryElasticity
        } else if (this.x + this.width > xBound) {
            this.x = xBound - this.width
            this.dx *= -PhysicsBody.boundaryElasticity
        }

        if(this.y < 0) {
            this.y = 0
            this.dy *= -PhysicsBody.boundaryElasticity
        } else if (this.y + this.height > yBound) {
            this.y = yBound - this.height
            this.dy *= -PhysicsBody.floorElasticity
        }
    }

    hold = () => {
        this.held = true
        this.dx = 0
        this.dy = 0
    }

    toss = (dx: number, dy: number) => {
        this.held = false
        this.dx = dx
        this.dy = dy
    }

}

export { PhysicsBody }