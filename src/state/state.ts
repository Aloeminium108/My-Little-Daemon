import { Game } from "../game.js"
import { Pet } from "../Pet/pet.js"

interface State {
    game: Game
    pet: Pet

    
    init(): void
    pause(): void
    resume(): void

    animate?(ctx: CanvasRenderingContext2D): void
    update?(interval: number): void

    mouseUp?(e: MouseEvent): void
    mouseDown?(e: MouseEvent): void
    mouseMove?(e: MouseEvent): void
    mouseLeave?(e: MouseEvent): void

    foodButton?(): void
}

enum StateTransition {
    STATMENU, GAME, MATCH3
}

export { State, StateTransition }