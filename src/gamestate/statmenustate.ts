import { GameState } from "./gamestate.js"
import { Game } from "../game.js"
import { Pet } from "../Pet/pet.js"
import { HomeState } from "./homestate.js"

class StatMenuState implements GameState {

    menuHTML: HTMLElement
    petImage: HTMLImageElement
    petName: HTMLParagraphElement
    petAge: HTMLParagraphElement
    petGender: HTMLImageElement
    petHunger: HTMLDivElement
    petHappiness: HTMLDivElement

    game: Game
    pet: Pet

    constructor(game: Game) {
        this.game = game
        this.pet = game.pet

        this.menuHTML = document.getElementById('menu')!!
        this.petImage = document.getElementById('pet-image') as HTMLImageElement
        this.petName = document.getElementById('pet-name') as HTMLParagraphElement
        this.petAge = document.getElementById('pet-age') as HTMLParagraphElement
        this.petGender = document.getElementById('pet-gender') as HTMLImageElement
        this.petHunger = document.getElementById('hunger-bar') as HTMLDivElement
        this.petHappiness = document.getElementById('happiness-bar') as HTMLDivElement

        this.init()
    }

    update = () => {
        this.updateMenu()
    }

    init = () => {
        let exitButton = document.getElementById('menu-exit')
        exitButton?.addEventListener('click', (e) => {
            this.game.changeState(HomeState)
        })
        this.updateMenu()
    }

    pause = () => {
        this.menuHTML.style.visibility = 'hidden'
    }

    resume = () => {
        this.menuHTML.style.visibility = 'visible'
    }

    updateMenu = () => {
        this.petImage.src = this.pet.imageSrc
        this.petName.textContent = this.pet.name
        this.petAge.textContent = this.pet.age.toString()
        this.petGender.src = this.pet.gender

        this.petHunger.style.width = `${this.pet.hunger}%`
        this.petHappiness.style.width = `${this.pet.happiness}%`
    }
    
}

export { StatMenuState }