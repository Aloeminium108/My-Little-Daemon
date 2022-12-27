import { Game } from "../game.js"
import { State } from "./state.js"

class IntroState extends State {
    changeState() {}

    constructor(game: Game) {
        super(game)
    }

    init() {}

    addStateChange(fun: () => void) {
        this.changeState = fun
    }

    animate(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(80, 80, 500, 500)
    }
    mouseUp(e: MouseEvent): void {
    }
    mouseDown(e: MouseEvent): void {
        this.changeState()
    }
    mouseMove(e: MouseEvent): void {
    }
    mouseLeave(e: MouseEvent): void {
    }

}

export { IntroState } 