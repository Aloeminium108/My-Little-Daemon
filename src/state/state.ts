import { Game } from "../game.js"
import { Pet } from "../Pet/pet.js"

interface State {
    game: Game
    pet: Pet

    animate(ctx: CanvasRenderingContext2D, interval: number): void
    mouseUp(e: MouseEvent): void
    mouseDown(e: MouseEvent): void
    mouseMove(e: MouseEvent): void
    mouseLeave(e: MouseEvent): void

    init(): void
    pause(): void
    resume(): void

    foodButton?(): void
}

enum StateTransition {
    STATMENU, GAME
}

export { State, StateTransition }