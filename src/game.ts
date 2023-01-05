import { State, StateTransition } from "./state/state.js"
import { GameState } from "./state/gamestate.js"
import { MenuState } from "./state/statmenustate.js"
import { Pet } from "./Pet/pet.js"

class Game {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    pet: Pet

    lastFrameTimeStamp: DOMHighResTimeStamp | null = null

    private gameState: GameState
    private statMenuState: MenuState
    private stateMap: Map<StateTransition, State>
    private currentState: State

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")!!

        this.pet = new Pet()

        this.gameState = new GameState(this)
        this.statMenuState = new MenuState(this)

        this.stateMap = new Map<StateTransition, State>
        this.stateMap.set(StateTransition.GAME, this.gameState)
        this.stateMap.set(StateTransition.STATMENU, this.statMenuState)

        this.currentState = this.gameState

        this.addCanvasListeners()
        this.addButtonListeners()
    }

    animate = (currentFrameTimeStamp: DOMHighResTimeStamp) => {

        let lastFrameTimeStamp = this.lastFrameTimeStamp ?? currentFrameTimeStamp
        let interval = currentFrameTimeStamp - lastFrameTimeStamp
        this.lastFrameTimeStamp = currentFrameTimeStamp
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.pet.update(interval)
        this.currentState.update?.(interval)
        this.currentState.animate?.(this.ctx)
        
        window.requestAnimationFrame(this.animate)
    }

    changeState = (state: StateTransition) => {
        if (this.stateMap.has(state)) {
            this.currentState.pause()
            this.currentState = this.stateMap.get(state)!!
            this.currentState.resume()
        }
    }

    addCanvasListeners = () => {
        this.canvas.addEventListener('mousedown', (e) => this.currentState.mouseDown?.(e))
        this.canvas.addEventListener('mouseup', (e) => this.currentState.mouseUp?.(e))
        this.canvas.addEventListener('mousemove', (e) => this.currentState.mouseMove?.(e))
        this.canvas.addEventListener('mouseleave', (e) => this.currentState.mouseLeave?.(e))
    }

    addButtonListeners = () => {
        let buttons = document.querySelectorAll('.button')
        buttons[0].addEventListener('click', (e) => {
            this.changeState(StateTransition.STATMENU)
        })
        buttons[1].addEventListener('click', (e) => {
            this.currentState.foodButton?.()
        })
    }

}

export { Game }