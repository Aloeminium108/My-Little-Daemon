import { ECS } from "../ecs/ecs.js";
import { Game } from "../game.js";
import { Pet } from "../Pet/pet.js";
import { GameState } from "./gamestate.js";
import { Mouse } from "./mouse.js";

abstract class Minigame implements GameState {
    
    pet: Pet;
    mouse: Mouse
    canvas: HTMLCanvasElement

    ecs = new ECS()

    leftScoreboard: HTMLDivElement = document.createElement('div')
    rightScoreboard: HTMLDivElement = document.createElement('div')

    abstract name: string
    abstract iconsrc: string

    abstract leftScoreboardInner: string
    abstract rightScoreboardInner: string

    abstract canvasWidth: number
    abstract canvasHeight: number

    constructor(
        public game: Game, 
        public ctx: CanvasRenderingContext2D, 
        public canvasContainer: HTMLDivElement
        ) {
        this.game = game
        this.pet = game.pet
        this.mouse = game.mouse
        this.canvas = game.secondaryCanvas
    }

    abstract initEntities(): void
    abstract initSystems(): void

    abstract reconnectScoreboard(): void

    init = () => {
        this.initScoreboard()
        this.initEntities()
        this.initSystems()
    }

    initScoreboard = () => {
        this.leftScoreboard.className = 'scoreboard'
        this.rightScoreboard.className = 'scoreboard'

        this.leftScoreboard.innerHTML = this.leftScoreboardInner
        this.rightScoreboard.innerHTML = this.rightScoreboardInner
    }

    pause = () => {
        this.canvasContainer.style.visibility = 'hidden'
        document.getElementById('left-scoreboard')?.removeChild(this.leftScoreboard)
        document.getElementById('right-scoreboard')?.removeChild(this.rightScoreboard)
    }

    resume = () => {
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight

        document.getElementById('left-scoreboard')?.appendChild(this.leftScoreboard)
        document.getElementById('right-scoreboard')?.appendChild(this.rightScoreboard)

        this.reconnectScoreboard()

        this.canvasContainer.style.visibility = 'visible'
    }

    update = (interval: number) => {
        this.ecs.update(interval)
    }
    
}

export {Minigame}