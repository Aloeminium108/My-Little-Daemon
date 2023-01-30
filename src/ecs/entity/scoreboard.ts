import { Scoreboard, ScoreType } from "../component/scoreboard.js";
import { Entity } from "./entity.js";

class ScoreKeeper extends Entity {

    constructor(scoreType: ScoreType) {
        super()
        this.addComponent(new Scoreboard(scoreType))
    }

}

export {ScoreKeeper}