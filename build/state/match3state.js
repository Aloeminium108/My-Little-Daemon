import { ECS } from "../ecs/ecs.js";
import { PuzzleGrid } from "../entity/puzzle/puzzlegrid.js";
class Match3State {
    constructor(game) {
        this.ecs = new ECS();
        this.puzzleGrid = new PuzzleGrid(100, 100);
        this.init = () => { };
        this.pause = () => { };
        this.resume = () => { };
        this.update = (interval) => {
            this.ecs.update(interval);
        };
        this.mouseUp = (e) => { };
        this.mouseDown = (e) => { };
        this.mouseMove = (e) => { };
        this.mouseLeave = (e) => { };
        this.game = game;
        this.pet = game.pet;
    }
}
export { Match3State };
