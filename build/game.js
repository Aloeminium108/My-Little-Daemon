import { StateTransition } from "./state/state.js";
import { GameState } from "./state/gamestate.js";
import { MenuState } from "./state/menustate.js";
import { Pet } from "./Pet/pet.js";
class Game {
    constructor(canvas) {
        this.lastFrameTimeStamp = null;
        this.animate = (currentFrameTimeStamp) => {
            var _a;
            let lastFrameTimeStamp = (_a = this.lastFrameTimeStamp) !== null && _a !== void 0 ? _a : currentFrameTimeStamp;
            let interval = currentFrameTimeStamp - lastFrameTimeStamp;
            this.lastFrameTimeStamp = currentFrameTimeStamp;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.pet.update(interval);
            this.currentState.animate(this.ctx, interval);
            window.requestAnimationFrame(this.animate);
        };
        this.changeState = (state) => {
            if (this.stateMap.has(state)) {
                this.currentState.pause();
                this.currentState = this.stateMap.get(state);
                this.currentState.resume();
            }
        };
        this.addCanvasListeners = () => {
            this.canvas.addEventListener('mousedown', (e) => {
                this.currentState.mouseDown(e);
            });
            this.canvas.addEventListener('mouseup', (e) => {
                this.currentState.mouseUp(e);
            });
            this.canvas.addEventListener('mousemove', (e) => {
                this.currentState.mouseMove(e);
            });
            this.canvas.addEventListener('mouseleave', (e) => {
                this.currentState.mouseLeave(e);
            });
        };
        this.addButtonListeners = () => {
            let buttons = document.querySelectorAll('.button');
            buttons[0].addEventListener('click', (e) => {
                this.changeState(StateTransition.MENU);
            });
            buttons[1].addEventListener('click', (e) => {
                var _a, _b;
                (_b = (_a = this.currentState).foodButton) === null || _b === void 0 ? void 0 : _b.call(_a);
            });
        };
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.pet = new Pet();
        this.gameState = new GameState(this);
        this.menuState = new MenuState(this);
        this.stateMap = new Map;
        this.stateMap.set(StateTransition.GAME, this.gameState);
        this.stateMap.set(StateTransition.MENU, this.menuState);
        this.currentState = this.gameState;
        this.addCanvasListeners();
        this.addButtonListeners();
    }
}
export { Game };
