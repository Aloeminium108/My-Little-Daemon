import { Game } from "../game.js";
import { Pet } from "../Pet/pet.js";
import { State } from "./state.js"

class Match3State implements State {
    game: Game;
    pet: Pet;

    constructor(game: Game) {
        this.game = game
        this.pet = game.pet
    }

    init = () => {}
    pause = () => {}
    resume = () =>  {}

    animate = (ctx: CanvasRenderingContext2D) =>  {}
    update = (interval: number) =>  {}

    mouseUp = (e: MouseEvent) =>  {}
    mouseDown = (e: MouseEvent) =>  {}
    mouseMove = (e: MouseEvent) =>  {}
    mouseLeave = (e: MouseEvent) =>  {}
    
}

export { Match3State }