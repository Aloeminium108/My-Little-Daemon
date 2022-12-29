class Body {
    private static vCap = 50
    private static friction = 0.99
    private static gravity = 2

    private width: number
    private height: number
    private x: number
    private y: number
    private dx: number = 0
    private dy: number = 0
    private held: boolean = false
    constructor(x: number, y: number, width: number, height: number) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }

    moveTo(newX: number, newY: number) {
        this.x = Math.floor(newX - this.width/2)
        this.y = Math.floor(newY - this.height/2)
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
        if(this.dx > Body.vCap) this.dx = Body.vCap
        if(this.dy > Body.vCap) this.dy = Body.vCap
        if(this.dx < -Body.vCap) this.dx = -Body.vCap
        if(this.dy < -Body.vCap) this.dy = -Body.vCap

        if (!this.held) {
            this.dy += Body.gravity
        }

        this.dx = Math.floor(Body.friction * this.dx)
        this.dy = Math.floor(Body.friction * this.dy)

        this.x += this.dx
        this.y += this.dy
    }

    inside(x: number, y: number) {
        if (x > this.x 
            && x < this.x + this.width 
            && y > this.y
            && y < this.y + this.height
        ) {
            return true
        } else {
            return false
        }
    }

    boundaryCollision = (xBound: number, yBound: number) => {
        if(this.x < 0) {
            this.x = 0
            this.dx *= -1
        } else if (this.x + this.width > xBound) {
            this.x = xBound - this.width
            this.dx *= -1
        }

        if(this.y < 0) {
            this.y = 0
            this.dy *= -1
        } else if (this.y + this.height > yBound) {
            this.y = yBound - this.height
            this.dy *= -1
        }
    }

}

export { Body }