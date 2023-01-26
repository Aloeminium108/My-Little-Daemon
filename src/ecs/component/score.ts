import { Component } from "./component.js";

class Score extends Component {
    public score = 0

    constructor(public scoreType: ScoreType) {
        super()
    }
}

enum ScoreType {
    SCORE,
    COMBO
}

export {Score, ScoreType}