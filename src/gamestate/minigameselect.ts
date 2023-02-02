import { ECS } from "../ecs/ecs.js";
import { Game } from "../game.js";
import { Pet } from "../Pet/pet.js";
import { GameState } from "./gamestate.js"
import { Match3State } from "./match3state.js";

class MinigameSelectState implements GameState {
    game: Game;
    ctx?: CanvasRenderingContext2D | undefined;
    pet: Pet;
    ecs?: ECS | undefined;

    menuHTML: HTMLDivElement

    constructor(game: Game) {
        this.game = game
        this.pet = game.pet

        this.menuHTML = document.getElementById('minigame-select') as HTMLDivElement
        this.init()
    }

    init(): void {
        let buttons = document.querySelectorAll('#minigame-select .selection-icon')
        buttons[0].addEventListener('dblclick', (e) => {
            this.game.changeState(Match3State)
        })
    }

    pause(): void {
        this.menuHTML.style.visibility = 'hidden'
    }

    resume(): void {
        this.menuHTML.style.visibility = 'visible'
    }


}

export {MinigameSelectState}