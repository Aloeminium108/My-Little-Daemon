import { ECS } from "../ecs/ecs.js";
import { PuzzleGrid } from "../ecs/entity/puzzle/puzzlegrid.js";
import { Game } from "../game.js";
import { Pet } from "../Pet/pet.js";
import { Mouse } from "./mouse.js";
import { State } from "./state.js"

class Match3State implements State {
    game: Game;
    pet: Pet;

    ecs = new ECS()

    mouse: Mouse
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement

    constructor(game: Game) {
        this.game = game
        this.pet = game.pet
        this.mouse = game.mouse
        this.ctx = game.ctx
        this.canvas = game.canvas

        this.init()
    }

    init = () => {}
    pause = () => {}
    resume = () =>  {}

    update = (interval: number) =>  {
        this.ecs.update(interval)
    }

    mouseUp = (e: MouseEvent) =>  {}
    mouseDown = (e: MouseEvent) =>  {}
    mouseMove = (e: MouseEvent) =>  {}
    mouseLeave = (e: MouseEvent) =>  {}
    
}

export { Match3State }