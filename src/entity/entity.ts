import { Body } from "./body/body.js"

interface Entity {
    getBody(): Body

    draw(ctx: CanvasRenderingContext2D): void

    update?(interval: number): void

    getMouseOver?(): string
    getMouseHold?(): string
}

export { Entity }