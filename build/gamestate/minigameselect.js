import { Match3State } from "./match3state.js";
class MinigameSelectState {
    constructor(game) {
        this.game = game;
        this.pet = game.pet;
        this.menuHTML = document.getElementById('minigame-select');
        this.init();
    }
    init() {
        let buttons = document.querySelectorAll('#minigame-select .selection-icon');
        buttons[0].addEventListener('dblclick', (e) => {
            this.game.changeState(Match3State);
        });
    }
    pause() {
        this.menuHTML.style.visibility = 'hidden';
    }
    resume() {
        this.menuHTML.style.visibility = 'visible';
    }
}
export { MinigameSelectState };
