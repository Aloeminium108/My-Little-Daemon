import { Component } from "./component.js";
class Score extends Component {
    constructor(scoreType) {
        super();
        this.scoreType = scoreType;
        this.score = 0;
    }
}
var ScoreType;
(function (ScoreType) {
    ScoreType[ScoreType["SCORE"] = 0] = "SCORE";
    ScoreType[ScoreType["COMBO"] = 1] = "COMBO";
    ScoreType[ScoreType["MOVES"] = 2] = "MOVES";
})(ScoreType || (ScoreType = {}));
export { Score, ScoreType };
