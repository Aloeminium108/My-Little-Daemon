import { State, StateTransition } from "./state.js"
import { Game } from "../game.js"
import { Pet } from "../Pet/pet.js"

class MenuState extends State {

    menuHTML: HTMLElement
    petImage: HTMLImageElement

    constructor(game: Game) {
        super(game)
        this.menuHTML = document.getElementById('menu')!!
        this.petImage = document.getElementById('pet-image') as HTMLImageElement
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
            this.game.changeState(StateTransition.GAME)
        })
        this.petImage.src = this.pet.imageSrc
    }

    pause = () => {
        this.menuHTML.style.visibility = 'hidden'
    }

    resume = () => {
        this.menuHTML.style.visibility = 'visible'
    }
    
}

export { MenuState }