import { ECS } from "../ecs/ecs.js"
import { Game } from "../game.js"
import { Pet } from "../Pet/pet.js"

interface State {
    game: Game
    pet: Pet
    ecs?: ECS
    
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

type StateTransition<T extends State> = new (...args: any[]) => T

export { State, StateTransition }