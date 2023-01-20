import { Component } from "./component.js";
class Automaton extends Component {
    constructor(currentState) {
        super();
        this.currentState = currentState;
        this.age = 0;
        this.update = (interval) => {
            this.age += interval;
        };
    }
    changeState(state) {
        this.currentState = state;
        this.age = 0;
    }
}
var State;
(function (State) {
    // Jewel states
    State[State["FALLING"] = 0] = "FALLING";
    State[State["MATCHED"] = 1] = "MATCHED";
    State[State["UNMATCHED"] = 2] = "UNMATCHED";
    State[State["SWAPPING"] = 3] = "SWAPPING";
})(State || (State = {}));
export { Automaton, State };
