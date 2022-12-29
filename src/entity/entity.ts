import { Body } from "./body.js"

abstract class Entity {
    protected body: Body

    constructor(x: number, y: number, width: number, height: number) {
        this.body = new Body(x, y, width, height)
    }

    abstract draw(ctx: CanvasRenderingContext2D): void

    moveTo = (newX: number, newY: number) => {
        this.body.moveTo(newX, newY)
    }

    hold = () => {
        this.body.hold()
    }

    release = () => {
        this.body.release()
    }

    update = () => {
        this.body.update()
    }

    inside = (x: number, y: number) => {
        return this.body.inside(x, y)
    }

    boundaryCollision = (xBound: number, yBound: number) => {
        this.body.boundaryCollision(xBound, yBound)
    }
}

export { Entity }