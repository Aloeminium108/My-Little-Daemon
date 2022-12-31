import { State } from "./state.js";
class MenuState extends State {
    constructor(game) {
        super(game);
        this.init = () => {
            let exitButton = document.getElementById('menu-exit');
            exitButton === null || exitButton === void 0 ? void 0 : exitButton.addEventListener('click', (e) => {
                this.game.changeState(0);
                this.menuHTML.style.visibility = 'hidden';
            });
        };
        this.resume = () => {
            this.menuHTML.style.visibility = 'visible';
        };
        this.menuHTML = document.getElementById('menu');
        this.init();
    }
    animate(ctx) { }
    mouseUp(e) { }
    mouseDown(e) { }
    mouseMove(e) { }
    mouseLeave(e) { }
}
export { MenuState };
