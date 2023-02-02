import { Scoreboard } from "../../component/graphics/scoreboard.js";
import { Entity } from "../entity.js";
class ScoreKeeper extends Entity {
    constructor(scoreType, value = 0) {
        super();
        this.addComponent(new Scoreboard(scoreType, value));
    }
}
export { ScoreKeeper };
