import { StateTransition } from "./state/state.js";
import { GameState } from "./state/gamestate.js";
import { MenuState } from "./state/statmenustate.js";
import { Pet } from "./Pet/pet.js";
import { Match3State } from "./state/match3state.js";
class Game {
    constructor(canvas) {
        this.lastFrameTimeStamp = null;
        this.animate = (currentFrameTimeStamp) => {
            var _a, _b, _c, _d, _e;
            let lastFrameTimeStamp = (_a = this.lastFrameTimeStamp) !== null && _a !== void 0 ? _a : currentFrameTimeStamp;
            let interval = currentFrameTimeStamp - lastFrameTimeStamp;
            this.lastFrameTimeStamp = currentFrameTimeStamp;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.pet.update(interval);
            (_c = (_b = this.currentState).update) === null || _c === void 0 ? void 0 : _c.call(_b, interval);
            (_e = (_d = this.currentState).animate) === null || _e === void 0 ? void 0 : _e.call(_d, this.ctx);
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
            this.canvas.addEventListener('mousedown', (e) => { var _a, _b; return (_b = (_a = this.currentState).mouseDown) === null || _b === void 0 ? void 0 : _b.call(_a, e); });
            this.canvas.addEventListener('mouseup', (e) => { var _a, _b; return (_b = (_a = this.currentState).mouseUp) === null || _b === void 0 ? void 0 : _b.call(_a, e); });
            this.canvas.addEventListener('mousemove', (e) => { var _a, _b; return (_b = (_a = this.currentState).mouseMove) === null || _b === void 0 ? void 0 : _b.call(_a, e); });
            this.canvas.addEventListener('mouseleave', (e) => { var _a, _b; return (_b = (_a = this.currentState).mouseLeave) === null || _b === void 0 ? void 0 : _b.call(_a, e); });
        };
        this.addButtonListeners = () => {
            let buttons = document.querySelectorAll('.button');
            buttons[0].addEventListener('click', (e) => {
                this.changeState(StateTransition.STATMENU);
            });
            buttons[1].addEventListener('click', (e) => {
                var _a, _b;
                (_b = (_a = this.currentState).foodButton) === null || _b === void 0 ? void 0 : _b.call(_a);
            });
            buttons[2].addEventListener('click', (e) => {
                this.changeState(StateTransition.MATCH3);
            });
        };
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.pet = new Pet();
        this.gameState = new GameState(this);
        this.statMenuState = new MenuState(this);
        this.match3State = new Match3State(this);
        this.stateMap = new Map;
        this.stateMap.set(StateTransition.GAME, this.gameState);
        this.stateMap.set(StateTransition.STATMENU, this.statMenuState);
        this.stateMap.set(StateTransition.MATCH3, this.match3State);
        this.currentState = this.gameState;
        this.addCanvasListeners();
        this.addButtonListeners();
    }
}
export { Game };
