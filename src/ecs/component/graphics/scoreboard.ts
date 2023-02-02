import { Component } from "../component.js";

class Scoreboard extends Component {
    constructor(public scoreType: ScoreType, public value = 0) {
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