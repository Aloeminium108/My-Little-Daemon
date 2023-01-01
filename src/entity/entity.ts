import { Body } from "./body/body.js"

abstract class Entity {
    protected abstract body: Body
    protected abstract mouseOver: string
    protected abstract mouseGrab: string

    abstract drawBody(ctx: CanvasRenderingContext2D): (x: number, y: number) => void
    abstract updateSelf(): void
    abstract release(dx: number, dy: number): void

    update = () => {
        this.updateSelf()
        this.updateBody()
    }

    updateBody = () => {
        this.body.update()
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        this.body.draw(this.drawBody(ctx))
    }

    moveTo = (newX: number, newY: number) => {
        this.body.moveTo(newX, newY)
    }

    hold = () => {
        this.body.hold()
    }

    inside = (x: number, y: number) => {
        return this.body.inside(x, y)
    }

    boundaryCollision = (xBound: number, yBound: number) => {
        this.body.boundaryCollision(xBound, yBound)
    }

    getMouseOver = () => {
        return this.mouseOver
    }

    getMouseHold = () => {
        return this.mouseGrab
    }

    static detectCollision = (entity1: Entity, entity2: Entity) => {
        return Body.detectCollision(entity1.body, entity2.body)
    }
}

export { Entity }