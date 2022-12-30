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
    abstract draw(callback: (x: number, y: number) => void): void
    abstract moveTo(x: number, y: number): void
    abstract boundaryCollision(xBound: number, yBound: number): void
    abstract hold(): void
    abstract release(): void
    abstract inside(x: number, y: number): boolean



}

export { Body }