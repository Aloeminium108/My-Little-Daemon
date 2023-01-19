import { Component } from "./component.js";

class Automaton extends Component {

    public age = 0

    constructor(public currentState: State) {
        super()
    }

    update = (interval: number) => {
        this.age += interval
    }

    changeState(state: State) {
        this.currentState = state
        this.age = 0

    }
}

enum State {
    // Jewel states
    FALLING, MATCHED, UNMATCHED, SWAPPING,


}

export {Automaton, State}