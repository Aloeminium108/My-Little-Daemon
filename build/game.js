import { GameState } from "./state/gamestate.js";
import { MenuState } from "./state/menustate.js";
class Game {
    constructor(canvas) {
        this.animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentState.animate(this.ctx);
            window.requestAnimationFrame(this.animate);
        };
        this.changeState = (state) => {
            if (this.stateMap.has(state)) {
                this.currentState.pause();
                this.currentState = this.stateMap.get(state);
                this.currentState.resume();
            }
        };
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.gameState = new GameState(this);
        this.menuState = new MenuState(this);
        this.stateMap = new Map;
        this.stateMap.set(StateTransition.GAME, this.gameState);
        this.stateMap.set(StateTransition.MENU, this.menuState);
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
            this.changeState(StateTransition.MENU);
        });
    }
}
var StateTransition;
(function (StateTransition) {
    StateTransition[StateTransition["MENU"] = 0] = "MENU";
    StateTransition[StateTransition["GAME"] = 1] = "GAME";
})(StateTransition || (StateTransition = {}));
export { Game, StateTransition };
