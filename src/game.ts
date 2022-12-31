import { State } from "./state/state.js"
import { GameState } from "./state/gamestate.js"
import { MenuState } from "./state/menustate.js"

class Game {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    gameState: GameState
    menuState: MenuState
    stateList: Array<State> = []
    currentState: State

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")!!
        this.gameState = new GameState(this)
        this.stateList.push(this.gameState)
        this.menuState = new MenuState(this)
        this.stateList.push(this.menuState)
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
            this.changeState(1)
            this.currentState.resume()
        })
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        this.currentState.animate(this.ctx)
        
        window.requestAnimationFrame(this.animate)
    }

    changeState = (index: number) => {
        this.currentState = this.stateList[index]
    }

}

export { Game }