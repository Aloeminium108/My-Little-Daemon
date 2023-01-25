import { HomeState } from "./gamestate/homestate.js";
import { StatMenuState } from "./gamestate/statmenustate.js";
import { Pet } from "./Pet/pet.js";
import { Mouse } from "./gamestate/mouse.js";
import { Match3State } from "./gamestate/match3state.js";
import { Sprite } from "./ecs/component/sprite.js";
import { LoadingState } from "./gamestate/loadingstate.js";
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = new Mouse();
        this.lastFrameTimeStamp = null;
        this.stateMap = new Map;
        this.animate = (currentFrameTimeStamp) => {
            var _a, _b, _c;
            let lastFrameTimeStamp = (_a = this.lastFrameTimeStamp) !== null && _a !== void 0 ? _a : currentFrameTimeStamp;
            let interval = currentFrameTimeStamp - lastFrameTimeStamp;
            this.lastFrameTimeStamp = currentFrameTimeStamp;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.pet.update(interval);
            (_c = (_b = this.currentState).update) === null || _c === void 0 ? void 0 : _c.call(_b, interval);
            window.requestAnimationFrame(this.animate);
        };
        this.loadAssets = () => {
            let sources = [
                './assets/apple.png',
                './assets/ball.png',
                './assets/pet-happy.png',
                './assets/pet-happy.png',
                './assets/gems/jewel-blue-2.png',
                './assets/gems/jewel-green-2.png',
                './assets/gems/jewel-orange-3.png',
                './assets/gems/jewel-purple-2.png',
                './assets/gems/jewel-red-2.png',
                './assets/gems/jewel-yellow-2.png',
                './assets/gems/jewel-blue-bomb.png',
                './assets/gems/jewel-green-bomb.png',
                './assets/gems/jewel-orange-bomb.png',
                './assets/gems/jewel-purple-bomb.png',
                './assets/gems/jewel-red-bomb.png',
                './assets/gems/jewel-yellow-bomb.png',
                './assets/gems/jewel-color-bomb.png',
                './assets/gems/vertical-line-clear-blue.png',
                './assets/gems/vertical-line-clear-green.png',
                './assets/gems/vertical-line-clear-orange.png',
                './assets/gems/vertical-line-clear-purple.png',
                './assets/gems/vertical-line-clear-red.png',
                './assets/gems/vertical-line-clear-yellow.png',
                './assets/gems/horizontal-line-clear-blue.png',
                './assets/gems/horizontal-line-clear-green.png',
                './assets/gems/horizontal-line-clear-orange.png',
                './assets/gems/horizontal-line-clear-purple.png',
                './assets/gems/horizontal-line-clear-red.png',
                './assets/gems/horizontal-line-clear-yellow.png',
            ];
            let assets = sources.map(src => {
                let sprite = new Sprite(0, src);
                return sprite.loadingPromise;
            });
            return assets;
        };
        this.initializeStates = () => {
            this.addState(new HomeState(this));
            this.addState(new StatMenuState(this));
            this.addState(new Match3State(this));
        };
        this.addState = (state) => {
            this.stateMap.set(state.constructor, state);
        };
        this.changeState = (state) => {
            if (this.stateMap.has(state)) {
                this.currentState.pause();
                this.currentState = this.stateMap.get(state);
                this.currentState.resume();
            }
        };
        this.addCanvasListeners = () => {
            this.canvas.addEventListener('mousedown', (e) => this.mouse.pressed = true);
            this.canvas.addEventListener('mouseup', (e) => this.mouse.pressed = false);
            this.canvas.addEventListener('mousemove', (e) => this.mouse.move(e));
            this.canvas.addEventListener('mouseleave', (e) => this.mouse.pressed = false);
        };
        this.addButtonListeners = () => {
            let buttons = document.querySelectorAll('.button');
            buttons[0].addEventListener('click', (e) => {
                this.changeState(StatMenuState);
            });
            buttons[1].addEventListener('click', (e) => {
                var _a, _b;
                (_b = (_a = this.currentState).foodButton) === null || _b === void 0 ? void 0 : _b.call(_a);
            });
            buttons[2].addEventListener('click', (e) => {
                this.changeState(Match3State);
            });
        };
        this.ctx = canvas.getContext("2d");
        this.pet = new Pet();
        this.currentState = new LoadingState(this);
        Promise.all(this.loadAssets()).then(() => {
            this.initializeStates();
            this.currentState = this.stateMap.get(HomeState);
            this.addCanvasListeners();
            this.addButtonListeners();
        });
    }
}
export { Game };
