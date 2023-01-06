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
    abstract release(dx: number, dy: number): void

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

    getX = () => {
        return this.x
    }

    getY = () => {
        return this.y
    }

    static detectCollision = (body1: Body, body2: Body) => {
        if (body1.x < body2.x + body2.width
            && body1.x + body1.width > body2.x 
            && body1.y < body2.y + body2.height
            && body1.y + body1.height > body2.y
        ) {
            return true
        } else {
            return false
        }
    }

}


export { Body }