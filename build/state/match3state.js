import { PuzzleGrid } from "../entity/puzzle/puzzlegrid.js";
class Match3State {
    constructor(game) {
        this.puzzleGrid = new PuzzleGrid(100, 100);
        this.init = () => { };
        this.pause = () => { };
        this.resume = () => { };
        this.animate = (ctx) => {
            this.puzzleGrid.draw(ctx);
        };
        this.update = (interval) => { };
        this.mouseUp = (e) => { };
        this.mouseDown = (e) => { };
        this.mouseMove = (e) => { };
        this.mouseLeave = (e) => { };
        this.game = game;
        this.pet = game.pet;
    }
}
export { Match3State };
