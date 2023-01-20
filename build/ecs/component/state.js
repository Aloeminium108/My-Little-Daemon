import { Component } from "./component.js";
class Automaton extends Component {
    constructor(currentState, sprite = null, stateSpriteMap = null) {
        super();
        this.currentState = currentState;
        this.sprite = sprite;
        this.stateSpriteMap = stateSpriteMap;
        this.age = 0;
        this.update = (interval) => {
            this.age += interval;
        };
    }
    changeState(state) {
        var _a;
        this.currentState = state;
        this.age = 0;
        if (this.stateSpriteMap !== null && this.stateSpriteMap.has(this.currentState)) {
            (_a = this.sprite) === null || _a === void 0 ? void 0 : _a.updateSprite(this.stateSpriteMap.get(this.currentState));
        }
    }
}
var State;
(function (State) {
    // Jewel states
    State[State["FALLING"] = 0] = "FALLING";
    State[State["MATCHED"] = 1] = "MATCHED";
    State[State["UNMATCHED"] = 2] = "UNMATCHED";
    State[State["SWAPPING"] = 3] = "SWAPPING";
    State[State["NEUTRAL"] = 4] = "NEUTRAL";
    State[State["HAPPY"] = 5] = "HAPPY";
})(State || (State = {}));
export { Automaton, State };
