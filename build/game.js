import { GameState } from "./state/gamestate.js";
import { MenuState } from "./state/menustate.js";
class Game {
    constructor(canvas) {
        this.stateList = [];
        this.animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentState.animate(this.ctx);
            window.requestAnimationFrame(this.animate);
        };
        this.changeState = (index) => {
            this.currentState = this.stateList[index];
        };
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.gameState = new GameState(this);
        this.stateList.push(this.gameState);
        this.menuState = new MenuState(this);
        this.stateList.push(this.menuState);
        this.currentState = this.gameState;
        canvas.addEventListener('mousedown', (e) => {
            this.currentState.mouseDown(e);
        });
        canvas.addEventListener('mouseup', (e) => {
            this.currentState.mouseUp(e);
        });
        canvas.addEventListener('mousemove', (e) => {
            this.currentState.mouseMove(e);
        });
        canvas.addEventListener('mouseleave', (e) => {
            this.currentState.mouseLeave(e);
        });
        let buttons = document.querySelectorAll('.button');
        buttons[0].addEventListener('click', (e) => {
            this.changeState(1);
            this.currentState.resume();
        });
    }
}
export { Game };
