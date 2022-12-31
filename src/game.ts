import { State, StateTransition } from "./state/state.js"
import { GameState } from "./state/gamestate.js"
import { MenuState } from "./state/menustate.js"
import { Pet } from "./Pet/pet.js"

class Game {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    pet: Pet

    private gameState: GameState
    private menuState: MenuState
    private stateMap: Map<StateTransition, State>
    private currentState: State

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")!!

        this.pet = new Pet()

        this.gameState = new GameState(this)
        this.menuState = new MenuState(this)

        this.stateMap = new Map<StateTransition, State>
        this.stateMap.set(StateTransition.GAME, this.gameState)
        this.stateMap.set(StateTransition.MENU, this.menuState)

        this.currentState = this.gameState

        this.addCanvasListeners()
        this.addButtonListeners()
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        this.currentState.animate(this.ctx)
        
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
        this.canvas.addEventListener('mousedown', (e) => {
            this.currentState.mouseDown(e)
        })
        
        this.canvas.addEventListener('mouseup', (e) => {
            this.currentState.mouseUp(e)
        })
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.currentState.mouseMove(e)
        })
        
        this.canvas.addEventListener('mouseleave', (e) => {
            this.currentState.mouseLeave(e)
        })
    }

    addButtonListeners = () => {
        let buttons = document.querySelectorAll('.button')
        buttons[0].addEventListener('click', (e) => {
            this.changeState(StateTransition.MENU)
        })
    }

}

export { Game }