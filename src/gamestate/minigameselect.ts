import { Game } from "../game.js";
import { Pet } from "../Pet/pet.js";
import { GameState, GameStateTransition } from "./gamestate.js"
import { Minigame } from "./minigame.js";

class MinigameSelectState implements GameState {

    pet: Pet;
    menuHTML: HTMLDivElement
    selectionBox: HTMLDivElement

    constructor(public game: Game, private minigames: Array<Minigame>) {
        this.pet = game.pet
        this.menuHTML = document.getElementById('minigame-select') as HTMLDivElement
        this.selectionBox = document.querySelector('#minigame-select .selection-box') as HTMLDivElement
        this.init()
    }

    init = () => {
        this.minigames.forEach(minigame => {
            let selectionIcon = createMinigameIcon(minigame)
            this.selectionBox.appendChild(selectionIcon)
            selectionIcon.addEventListener('dblclick', (e) => {
                this.game.changeState(minigame.constructor as GameStateTransition<GameState>)
            })
        })
    }

    pause = () => {
        this.menuHTML.style.visibility = 'hidden'
    }

    resume = () => {
        this.menuHTML.style.visibility = 'visible'
    }

}

function createMinigameIcon(minigame: Minigame) {
    let selectionIcon = document.createElement('div')
    selectionIcon.className = 'selection-icon'

    selectionIcon.innerHTML = 
    `<img src="${minigame.iconsrc}" alt="${minigame.name}">
    <h3>${minigame.name}</h3>`

    return selectionIcon
}

export {MinigameSelectState}