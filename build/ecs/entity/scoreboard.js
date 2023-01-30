import { Scoreboard } from "../component/scoreboard.js";
import { Entity } from "./entity.js";
class ScoreKeeper extends Entity {
    constructor(scoreType) {
        super();
        this.addComponent(new Scoreboard(scoreType));
    }
}
export { ScoreKeeper };
