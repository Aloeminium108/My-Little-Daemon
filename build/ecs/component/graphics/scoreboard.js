import { Component } from "../component.js";
class Scoreboard extends Component {
    constructor(scoreType, value = 0) {
        super();
        this.scoreType = scoreType;
        this.value = value;
    }
}
var ScoreType;
(function (ScoreType) {
    ScoreType[ScoreType["SCORE"] = 0] = "SCORE";
    ScoreType[ScoreType["COMBO"] = 1] = "COMBO";
    ScoreType[ScoreType["MOVES"] = 2] = "MOVES";
    ScoreType[ScoreType["PROGESS"] = 3] = "PROGESS";
})(ScoreType || (ScoreType = {}));
export { Scoreboard, ScoreType };
