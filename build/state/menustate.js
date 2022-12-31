import { State, StateTransition } from "./state.js";
class MenuState extends State {
    constructor(game) {
        super(game);
        this.init = () => {
            let exitButton = document.getElementById('menu-exit');
            exitButton === null || exitButton === void 0 ? void 0 : exitButton.addEventListener('click', (e) => {
                this.game.changeState(StateTransition.GAME);
            });
            this.petImage.src = this.pet.imageSrc;
        };
        this.pause = () => {
            this.menuHTML.style.visibility = 'hidden';
        };
        this.resume = () => {
            this.menuHTML.style.visibility = 'visible';
        };
        this.menuHTML = document.getElementById('menu');
        this.petImage = document.getElementById('pet-image');
        this.init();
    }
    animate(ctx) { }
    mouseUp(e) { }
    mouseDown(e) { }
    mouseMove(e) { }
    mouseLeave(e) { }
}
export { MenuState };
