import { StateTransition } from "./state.js";
class StatMenuState {
    constructor(game) {
        this.update = () => {
        };
        this.init = () => {
            let exitButton = document.getElementById('menu-exit');
            exitButton === null || exitButton === void 0 ? void 0 : exitButton.addEventListener('click', (e) => {
                this.game.changeState(StateTransition.GAME);
            });
            this.updateMenu();
        };
        this.pause = () => {
            this.menuHTML.style.visibility = 'hidden';
        };
        this.resume = () => {
            this.menuHTML.style.visibility = 'visible';
            this.updateMenu();
        };
        this.updateMenu = () => {
            this.petImage.src = this.pet.imageSrc;
            this.petName.textContent = this.pet.name;
            this.petGender.textContent = this.pet.gender;
            this.petAge.textContent = this.pet.age;
            this.petWeight.textContent = this.pet.weight;
            this.petHunger.textContent = this.pet.stats.getHunger().toString();
        };
        this.game = game;
        this.pet = game.pet;
        this.menuHTML = document.getElementById('menu');
        this.petImage = document.getElementById('pet-image');
        this.petName = document.getElementById('pet-name');
        this.petGender = document.getElementById('pet-gender');
        this.petAge = document.getElementById('pet-age');
        this.petWeight = document.getElementById('pet-weight');
        this.petHunger = document.getElementById('pet-hunger');
        this.init();
    }
}
export { StatMenuState as MenuState };
