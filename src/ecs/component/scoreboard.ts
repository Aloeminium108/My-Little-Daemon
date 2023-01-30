import { Component } from "./component.js";

class Scoreboard extends Component {
    public value = 0

    constructor(public scoreType: ScoreType) {
        super()
    }
}

enum ScoreType {
    SCORE,
    COMBO,
    MOVES,
    PROGESS
}

export {Scoreboard, ScoreType}