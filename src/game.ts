import { State } from "./state/state.js"
import { GameState } from "./state/gamestate.js"
import { MenuState } from "./state/menustate.js"

class Game {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    gameState: GameState
    menuState: MenuState

    stateMap: Map<StateTransition, State>

    currentState: State

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")!!

        this.gameState = new GameState(this)
        this.menuState = new MenuState(this)

        this.stateMap = new Map<StateTransition, State>
        this.stateMap.set(StateTransition.GAME, this.gameState)
        this.stateMap.set(StateTransition.MENU, this.menuState)

        this.currentState = this.gameState

        canvas.addEventListener('mousedown', (e) => {
            this.currentState.mouseDown(e)
        })
        
        canvas.addEventListener('mouseup', (e) => {
            this.currentState.mouseUp(e)
        })
        
        canvas.addEventListener('mousemove', (e) => {
            this.currentState.mouseMove(e)
        })
        
        canvas.addEventListener('mouseleave', (e) => {
            this.currentState.mouseLeave(e)
        })

        let buttons = document.querySelectorAll('.button')
        buttons[0].addEventListener('click', (e) => {
            this.changeState(StateTransition.MENU)
        })
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

}

enum StateTransition {
    MENU, GAME
}

export { Game, StateTransition }