import { HomeState } from "./homestate.js";
class StatMenuState {
    constructor(game) {
        this.update = () => {
        };
        this.init = () => {
            let exitButton = document.getElementById('menu-exit');
            exitButton === null || exitButton === void 0 ? void 0 : exitButton.addEventListener('click', (e) => {
                this.game.changeState(HomeState);
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
            this.petAge.textContent = this.pet.age;
        };
        this.game = game;
        this.pet = game.pet;
        this.menuHTML = document.getElementById('menu');
        this.petImage = document.getElementById('pet-image');
        this.petName = document.getElementById('pet-name');
        this.petAge = document.getElementById('pet-age');
        this.init();
    }
}
export { StatMenuState };
