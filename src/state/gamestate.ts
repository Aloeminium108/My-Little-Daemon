import { State } from "./state.js";
import { Ball } from "./ball.js"

class GameState extends State {
    ball: Ball = new Ball(50, 300, 300)
    width: number
    height: number
    canvas: HTMLCanvasElement
    mouse = {
        pressed: false,
        x: 0,
        y: 0
    }

    constructor(canvas: HTMLCanvasElement) {
        super()
        this.width = canvas.width
        this. height = canvas.height
        this.canvas = canvas

        var mouse = {
            x: 0,
            y: 0,
            pressed: false
        }
    }

    animate(ctx: CanvasRenderingContext2D): void {
        this.ball.update()
        if(this.ball.x - this.ball.radius < 0) {
            this.ball.x = this.ball.radius
            this.ball.dx *= -1
        } else if (this.ball.x + this.ball.radius > this.width) {
            this.ball.x = this.width - this.ball.radius
            this.ball.dx *= -1
        }

        if(this.ball.y - this.ball.radius < 0) {
            this.ball.y = this.ball.radius
            this.ball.dy *= -1
        } else if (this.ball.y + this.ball.radius > this.height) {
            this.ball.y = this.height - this.ball.radius
            this.ball.dy *= -1
        }

        this.ball.draw(ctx)
    }

    mouseDown(e: MouseEvent): void {
        this.mouse.pressed = true
        if (this.ball.inside(this.mouse.x, this.mouse.y)) {
            this.ball.hold()
        }
    }
    mouseUp(e: MouseEvent): void {
        this.mouse.pressed = false
        if (this.ball.held) {
            this.ball.moveTo(this.mouse.x, this.mouse.y)
        }
        this.ball.release()
    }
    mouseMove(e: MouseEvent): void {
        this.mouse.x = e.offsetX
        this.mouse.y = e.offsetY
        if (this.ball.held) {
            this.ball.moveTo(this.mouse.x, this.mouse.y)
        } else if (this.ball.inside(this.mouse.x, this.mouse.y)) {
            this.canvas.style.cursor = 'grab'
        } else {
            this.canvas.style.cursor = 'default'
        }
    }
    mouseLeave(e: MouseEvent): void {
        this.mouse.pressed = false
        this.ball.release()
    }
    
}

export { GameState }