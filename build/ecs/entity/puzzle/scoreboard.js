import { Drawable } from "../../component/drawable.js";
import { Position } from "../../component/position.js";
import { Score, ScoreType } from "../../component/score.js";
import { Entity } from "../entity.js";
class Scoreboard extends Entity {
    constructor(x, y) {
        super();
        this.addComponent(new Position(x, y));
        this.addComponent(new Score(ScoreType.SCORE));
        this.addComponent(new Drawable(ctx => {
            let position = this.getComponent(Position);
            let score = this.getComponent(Score).score.toString();
            let padding = " ".repeat(7 - score.length);
            score = padding + score;
            ctx.fillStyle = "#ddd";
            ctx.font = "64px serif";
            ctx.fillText("  SCORE:", position.x, position.y);
            ctx.fillStyle = "white";
            ctx.font = "64px monospace";
            ctx.fillText(score, position.x, position.y + 64);
        }));
    }
}
export { Scoreboard };
