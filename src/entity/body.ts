abstract class Body {
    protected width: number
    protected height: number
    protected x: number
    protected y: number
    protected held: boolean = false

    constructor(x: number, y: number, width: number, height: number) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }

    abstract update(): void
    abstract boundaryCollision(xBound: number, yBound: number): void
    abstract hold(): void

    draw = (callback: (x: number, y: number) => void) => {
        callback(Math.round(this.x), Math.round(this.y))
    }

    moveTo = (newX: number, newY: number) => {
        this.x = Math.floor(newX - this.width/2)
        this.y = Math.floor(newY - this.height/2)
    }
    
    inside = (x: number, y: number) => {
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

    release = () => {
        this.held = false
    }

    detectCollision = (otherBody: Body) => {
        if (this.x < otherBody.x + otherBody.width
            && this.x + this.width > otherBody.x 
            && this.y < otherBody.y + otherBody.height
            && this.y + this.height > otherBody.y
        ) {
            return true
        } else {
            return false
        }
    }

}

export { Body }