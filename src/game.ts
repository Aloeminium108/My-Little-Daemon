import { State, StateTransition } from "./state/state.js"
import { GameState } from "./state/gamestate.js"
import { MenuState } from "./state/statmenustate.js"
import { Pet } from "./Pet/pet.js"

class Game {
    ctx: CanvasRenderingContext2D

    pet: Pet

    lastFrameTimeStamp: DOMHighResTimeStamp | null = null

    private stateMap = new Map<StateTransition<State>, State>
    private states: Array<StateTransition<State>> = [GameState, MenuState]
    private currentState: State

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!!

        this.pet = new Pet()

        this.initializeStates()

        this.currentState = this.stateMap.get(GameState)!!

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

    initializeStates = () => {
        
    }

    addState = <T extends State>(state: State) => {
        this.stateMap.set(state.constructor as StateTransition<T>, state)
    }

    changeState = (state: StateTransition<State>) => {
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
            this.changeState(MenuState)
        })
        buttons[1].addEventListener('click', (e) => {
            this.currentState.foodButton?.()
        })
    }

}

export { Game }