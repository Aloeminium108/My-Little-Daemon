import { ECS } from "../ecs/ecs";
import { Game } from "../game";
import { Pet } from "../Pet/pet";
import { State } from "./state";

class LoadingState implements State {
    game: Game;
    pet: Pet;
    ctx: CanvasRenderingContext2D

    constructor(game: Game) {
        this.game = game
        this.pet = game.pet
        this.ctx = game.ctx
    }

    update = (interval: number) => {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    }

    init(): void {}

    pause(): void {}

    resume(): void {}

    
}

export {LoadingState}