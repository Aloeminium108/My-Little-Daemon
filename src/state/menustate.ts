import { State } from "./state.js"
import { Game } from "../game.js"

class MenuState extends State {

    menuHTML: HTMLElement

    constructor(game: Game) {
        super(game)
        this.menuHTML = document.getElementById('menu')!!
        this.init()
    }

    animate(ctx: CanvasRenderingContext2D): void {}
    mouseUp(e: MouseEvent): void {}
    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
    mouseLeave(e: MouseEvent): void {}

    init = () => {
        let exitButton = document.getElementById('menu-exit')
        exitButton?.addEventListener('click', (e) => {
            this.game.changeState(0)
            this.menuHTML.style.visibility = 'hidden'
        })
    }

    resume = () => {
        this.menuHTML.style.visibility = 'visible'
    }
    
}

export { MenuState }