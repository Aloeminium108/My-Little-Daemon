import { Game } from "../game.js"
import { Pet } from "../Pet/pet.js"

abstract class State {
    game: Game
    pet: Pet
    constructor(game: Game) {
        this.game = game
        this.pet = game.pet
    }

    abstract animate(ctx: CanvasRenderingContext2D, interval: number) : void
    abstract mouseUp(e: MouseEvent): void
    abstract mouseDown(e: MouseEvent): void
    abstract mouseMove(e: MouseEvent): void
    abstract mouseLeave(e: MouseEvent): void

    abstract init(): void
    abstract pause(): void
    abstract resume(): void
}

enum StateTransition {
    MENU, GAME
}

export { State, StateTransition }