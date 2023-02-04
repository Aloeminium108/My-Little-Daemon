import { ECS } from "../../ecs/ecs.js";
class Minigame {
    constructor(game, ctx, canvasContainer) {
        this.game = game;
        this.ctx = ctx;
        this.canvasContainer = canvasContainer;
        this.ecs = new ECS();
        this.init = () => {
            this.initScoreboard();
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
        this.pause = () => {
            this.canvasContainer.style.visibility = 'hidden';
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
                this.messageBox.style.visibility = 'visible';
                this.loseMessage.style.visibility = 'visible';
            }
            else if (this.winCondition()) {
                this.messageBox.style.visibility = 'visible';
                this.winMessage.style.visibility = 'visible';
            }
        };
        this.game = game;
        this.pet = game.pet;
        this.mouse = game.mouse;
        this.canvas = game.secondaryCanvas;
        this.messageBox = document.getElementById('message-box');
        this.winMessage = document.getElementById('win-message');
        this.loseMessage = document.getElementById('lose-message');
    }
}
export { Minigame };
