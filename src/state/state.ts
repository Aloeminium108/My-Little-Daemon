import { Game } from "../game.js"

abstract class State {
    game: Game
    constructor(game: Game) {
        this.game = game
    }

    abstract animate(ctx: CanvasRenderingContext2D) : void
    abstract mouseUp(e: MouseEvent): void
    abstract mouseDown(e: MouseEvent): void
    abstract mouseMove(e: MouseEvent): void
    abstract mouseLeave(e: MouseEvent): void

    abstract init(): void
    abstract pause(): void
    abstract resume(): void
}

export { State }