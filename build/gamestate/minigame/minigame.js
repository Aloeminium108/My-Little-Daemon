import { ECS } from "../../ecs/ecs.js";
import { MinigameSelectState } from "./minigameselect.js";
class Minigame {
    constructor(game, ctx, canvasContainer) {
        this.game = game;
        this.ctx = ctx;
        this.canvasContainer = canvasContainer;
        this.ecs = new ECS();
        this.init = () => {
            this.initScoreboard();
            this.initButtons();
            this.initEntities();
            this.initSystems();
        };
        this.initScoreboard = () => {
            if (this.leftScoreboardInner !== null) {
                this.leftScoreboard = document.createElement('div');
                this.leftScoreboard.className = 'scoreboard';
                this.leftScoreboard.innerHTML = this.leftScoreboardInner;
            }
            if (this.rightScoreboardInner !== null) {
                this.rightScoreboard = document.createElement('div');
                this.rightScoreboard.className = 'scoreboard';
                this.rightScoreboard.innerHTML = this.rightScoreboardInner;
            }
        };
        this.initButtons = () => {
            this.exitButton.addEventListener('click', (e) => {
                if (this.game.currentState !== this)
                    return;
                this.resetGame();
                this.game.changeState(MinigameSelectState);
            });
            this.replayButton.addEventListener('click', (e) => {
                if (this.game.currentState !== this)
                    return;
                this.resetGame();
                this.messageBox.style.visibility = 'hidden';
            });
        };
        this.pause = () => {
            this.canvasContainer.style.visibility = 'hidden';
            this.messageBox.style.visibility = 'hidden';
            this.removeFrameElements();
        };
        this.resume = () => {
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            this.appendFrameElements();
            this.reconnectScoreboard();
            this.canvasContainer.style.visibility = 'visible';
        };
        this.appendFrameElements = () => {
            var _a, _b;
            if (this.leftScoreboard !== undefined)
                (_a = document.getElementById('left-scoreboard')) === null || _a === void 0 ? void 0 : _a.appendChild(this.leftScoreboard);
            if (this.rightScoreboard !== undefined)
                (_b = document.getElementById('right-scoreboard')) === null || _b === void 0 ? void 0 : _b.appendChild(this.rightScoreboard);
        };
        this.removeFrameElements = () => {
            var _a, _b;
            if (this.leftScoreboard !== undefined)
                (_a = document.getElementById('left-scoreboard')) === null || _a === void 0 ? void 0 : _a.removeChild(this.leftScoreboard);
            if (this.rightScoreboard !== undefined)
                (_b = document.getElementById('right-scoreboard')) === null || _b === void 0 ? void 0 : _b.removeChild(this.rightScoreboard);
        };
        this.update = (interval) => {
            this.ecs.update(interval);
            if (this.loseCondition()) {
                this.gameEndMessage.innerHTML =
                    `<h3>YOU LOSE :(</h3>`;
            }
            else if (this.winCondition()) {
                this.gameEndMessage.innerHTML =
                    `<h3>YOU Win!</h3>`;
            }
            if (this.winCondition() || this.loseCondition()) {
                this.messageBox.style.visibility = 'visible';
                this.stopGame();
            }
        };
        this.game = game;
        this.pet = game.pet;
        this.mouse = game.mouse;
        this.canvas = game.secondaryCanvas;
        this.messageBox = document.getElementById('message-box');
        this.gameEndMessage = document.getElementById('game-end-message');
        this.replayButton = document.getElementById('restart-button');
        this.exitButton = document.getElementById('minigame-exit');
    }
}
export { Minigame };
