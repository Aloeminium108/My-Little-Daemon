import { Game } from "../game";
import { Pet } from "../Pet/pet";
import { GameState } from "./gamestate";

class LoadingState implements GameState {
    pet: Pet;

    constructor(public game: Game, public ctx: CanvasRenderingContext2D) {
        this.game = game
        this.pet = game.pet
    }

    update = (interval: number) => {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(0, 0, this.game.mainCanvas.width, this.game.mainCanvas.height)
    }

    init(): void {}

    pause(): void {}

    resume(): void {}

    
}

export {LoadingState}