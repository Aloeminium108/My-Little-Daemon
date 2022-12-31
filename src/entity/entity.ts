import { Body } from "./body.js"

abstract class Entity {
    protected abstract body: Body

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

    detectCollision = (otherEntity: Entity) => {
        return this.body.detectCollision(otherEntity.body)
    }
}

export { Entity }