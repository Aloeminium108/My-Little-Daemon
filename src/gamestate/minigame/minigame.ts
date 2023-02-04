import { ECS } from "../../ecs/ecs.js";
import { Game } from "../../game.js";
import { Pet } from "../../Pet/pet.js";
import { GameState } from "../gamestate.js";

abstract class Minigame implements GameState {
    
    pet: Pet;
    canvas: HTMLCanvasElement

    ecs = new ECS()

    leftScoreboard?: HTMLDivElement
    rightScoreboard?: HTMLDivElement

    abstract name: string
    abstract iconsrc: string

    abstract leftScoreboardInner: string | null
    abstract rightScoreboardInner: string | null

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

    abstract loseCondition(): boolean
    abstract winCondition(): boolean

    init = () => {
        this.initScoreboard()
        this.initEntities()
        this.initSystems()
    }

    initScoreboard = () => {
        if (this.leftScoreboardInner !== null) {
            this.leftScoreboard = document.createElement('div')
            this.leftScoreboard.className = 'scoreboard'
            this.leftScoreboard.innerHTML = this.leftScoreboardInner
        }

        if (this.rightScoreboardInner !== null) {
            this.rightScoreboard = document.createElement('div')
            this.rightScoreboard.className = 'scoreboard'
            this.rightScoreboard.innerHTML = this.rightScoreboardInner
        }
    }

    pause = () => {
        this.canvasContainer.style.visibility = 'hidden'

        this.removeFrameElements()
    }

    resume = () => {
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight

        this.appendFrameElements()

        this.reconnectScoreboard()

        this.canvasContainer.style.visibility = 'visible'
    }

    appendFrameElements = () => {
        if (this.leftScoreboard !== undefined)
        document.getElementById('left-scoreboard')?.appendChild(this.leftScoreboard)

        if (this.rightScoreboard !== undefined)
        document.getElementById('right-scoreboard')?.appendChild(this.rightScoreboard)
    }

    removeFrameElements = () => {
        if (this.leftScoreboard !== undefined)
        document.getElementById('left-scoreboard')?.removeChild(this.leftScoreboard)

        if (this.rightScoreboard !== undefined)
        document.getElementById('right-scoreboard')?.removeChild(this.rightScoreboard)
    }

    update = (interval: number) => {
        this.ecs.update(interval)
        if (this.loseCondition()) {
            console.log("You lose :(")
        } else if (this.winCondition()) {
            console.log("You win!")
        }
    }
    
}

export {Minigame}