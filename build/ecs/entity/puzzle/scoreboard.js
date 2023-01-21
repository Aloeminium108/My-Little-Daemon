import { Drawable } from "../../component/drawable.js";
import { Position } from "../../component/position.js";
import { Score } from "../../component/score.js";
import { Entity } from "../entity.js";
class Scoreboard extends Entity {
    constructor(x, y) {
        super();
        this.addComponent(new Position(x, y));
        this.addComponent(new Score());
        this.addComponent(new Drawable(ctx => {
            let position = this.getComponent(Position);
            let score = this.getComponent(Score).score;
            ctx.font = "48px serif";
            ctx.fillText(score.toString(), position.x, position.y);
        }));
    }
}
export { Scoreboard };
