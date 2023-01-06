import { Entity } from "../entity/entity"

class Mouse {
    pressed: boolean = false
    x: number = 0
    y: number = 0
    dx: number = 0
    dy: number = 0

    private canvas: HTMLCanvasElement

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    move = (e: MouseEvent) => {
        let newX = e.offsetX
        let newY = e.offsetY

        this.dx = newX - this.x
        this.dy = newY - this.y

        this.x = newX
        this.y = newY
    }

    mouseOverEntity = (entity: Entity | null) => {
        this.canvas.style.cursor = entity?.getMouseOver?.() ?? 'default'
    }

    mouseHoldEntity = (entity: Entity) => {
        this.canvas.style.cursor = entity.getMouseHold?.() ?? 'default'
    }

}

export { Mouse }