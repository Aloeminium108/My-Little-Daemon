import { ECS } from "../ecs/ecs.js";
import { Game } from "../game.js";
import { Pet } from "../Pet/pet.js";
import { GameState } from "./gamestate.js";

abstract class Minigame implements GameState {
    
    pet: Pet;
    canvas: HTMLCanvasElement

    ecs = new ECS()

    leftScoreboard: HTMLDivElement = document.createElement('div')
    rightScoreboard: HTMLDivElement = document.createElement('div')

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
        this.rightScoreboardInner = this.rightScoreboardInner
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
    }

    update = (interval: number) => {
        this.ecs.update(interval)
    }
    
}