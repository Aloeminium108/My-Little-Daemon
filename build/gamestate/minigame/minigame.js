import { ECS } from "../../ecs/ecs.js";
class Minigame {
    constructor(game, ctx, canvasContainer) {
        this.game = game;
        this.ctx = ctx;
        this.canvasContainer = canvasContainer;
        this.ecs = new ECS();
        this.leftScoreboard = document.createElement('div');
        this.rightScoreboard = document.createElement('div');
        this.init = () => {
            this.initScoreboard();
            this.initEntities();
            this.initSystems();
        };
        this.initScoreboard = () => {
            this.leftScoreboard.className = 'scoreboard';
            this.rightScoreboard.className = 'scoreboard';
            this.leftScoreboard.innerHTML = this.leftScoreboardInner;
            this.rightScoreboard.innerHTML = this.rightScoreboardInner;
        };
        this.pause = () => {
            var _a, _b;
            this.canvasContainer.style.visibility = 'hidden';
            (_a = document.getElementById('left-scoreboard')) === null || _a === void 0 ? void 0 : _a.removeChild(this.leftScoreboard);
            (_b = document.getElementById('right-scoreboard')) === null || _b === void 0 ? void 0 : _b.removeChild(this.rightScoreboard);
        };
        this.resume = () => {
            var _a, _b;
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
            (_a = document.getElementById('left-scoreboard')) === null || _a === void 0 ? void 0 : _a.appendChild(this.leftScoreboard);
            (_b = document.getElementById('right-scoreboard')) === null || _b === void 0 ? void 0 : _b.appendChild(this.rightScoreboard);
            this.reconnectScoreboard();
            this.canvasContainer.style.visibility = 'visible';
        };
        this.update = (interval) => {
            this.ecs.update(interval);
            if (this.loseCondition()) {
                console.log("You win!");
            }
            else if (this.winCondition()) {
                console.log("You lose :(");
            }
        };
        this.game = game;
        this.pet = game.pet;
        this.mouse = game.mouse;
        this.canvas = game.secondaryCanvas;
    }
}
export { Minigame };
