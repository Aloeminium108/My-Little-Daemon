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
        if (this.currentState === state)
            return;
        this.currentState = state;
        this.age = 0;
        if (this.stateSpriteMap !== null && this.stateSpriteMap.has(this.currentState)) {
            (_a = this.sprite) === null || _a === void 0 ? void 0 : _a.updateSprite(this.stateSpriteMap.get(this.currentState));
        }
    }
}
var EntityState;
(function (EntityState) {
    // Jewel states
    EntityState[EntityState["FALLING"] = 0] = "FALLING";
    EntityState[EntityState["MATCHED"] = 1] = "MATCHED";
    EntityState[EntityState["UNMATCHED"] = 2] = "UNMATCHED";
    EntityState[EntityState["SWAPPING"] = 3] = "SWAPPING";
    // Pet States
    EntityState[EntityState["NEUTRAL"] = 4] = "NEUTRAL";
    EntityState[EntityState["HAPPY"] = 5] = "HAPPY";
})(EntityState || (EntityState = {}));
export { Automaton, EntityState };
