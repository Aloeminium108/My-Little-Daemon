import { State, StateTransition } from "./state.js"
import { Game } from "../game.js"
import { Pet } from "../Pet/pet.js"

class MenuState extends State {

    menuHTML: HTMLElement
    petImage: HTMLImageElement
    petName: HTMLParagraphElement
    petGender: HTMLParagraphElement
    petAge: HTMLParagraphElement
    petWeight: HTMLParagraphElement
    petHunger: HTMLParagraphElement

    constructor(game: Game) {
        super(game)

        this.menuHTML = document.getElementById('menu')!!
        this.petImage = document.getElementById('pet-image') as HTMLImageElement
        this.petName = document.getElementById('pet-name') as HTMLParagraphElement
        this.petGender = document.getElementById('pet-gender') as HTMLParagraphElement
        this.petAge = document.getElementById('pet-age') as HTMLParagraphElement
        this.petWeight = document.getElementById('pet-weight') as HTMLParagraphElement
        this.petHunger = document.getElementById('pet-hunger') as HTMLParagraphElement

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
        this.updateMenu()
    }

    pause = () => {
        this.menuHTML.style.visibility = 'hidden'
    }

    resume = () => {
        this.menuHTML.style.visibility = 'visible'
        this.updateMenu()
    }

    updateMenu = () => {
        this.petImage.src = this.pet.imageSrc
        this.petName.textContent = this.pet.name
        this.petGender.textContent = this.pet.gender
        this.petAge.textContent = this.pet.age
        this.petWeight.textContent = this.pet.weight
        this.petHunger.textContent = this.pet.getHunger().toString()
    }
    
}

export { MenuState }