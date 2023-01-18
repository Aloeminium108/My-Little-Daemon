import { ECS } from "../ecs/ecs.js"
import { Game } from "../game.js"
import { Pet } from "../Pet/pet.js"

interface GameState {
    game: Game
    pet: Pet
    ecs?: ECS
    
    init(): void
    pause(): void
    resume(): void

    update?(interval: number): void

    foodButton?(): void
}

type GameStateTransition<T extends GameState> = new (...args: any[]) => T

export { GameState, GameStateTransition }