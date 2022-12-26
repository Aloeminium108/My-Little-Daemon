import { GameState } from "./state/gamestate.js";
class Game {
    constructor(canvas) {
        this.animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentState.animate(this.ctx);
            window.requestAnimationFrame(this.animate);
        };
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.currentState = new GameState(this.canvas);
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
    }
}
export { Game };
