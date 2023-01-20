import { Component } from "./component.js";
import { Sprite } from "./sprite.js";

class Automaton extends Component {

    public age = 0

    constructor(
        public currentState: State, 
        private sprite: Sprite | null = null,
        private stateSpriteMap: Map<State, ImageBitmap> | null = null
        ) {
        super()
    }

    update = (interval: number) => {
        this.age += interval
    }

    changeState(state: State) {
        this.currentState = state
        this.age = 0

        if (this.stateSpriteMap !== null && this.stateSpriteMap.has(this.currentState)) {
            this.sprite?.updateSprite(this.stateSpriteMap.get(this.currentState)!!)
        }
    }
}

enum State {
    // Jewel states
    FALLING, MATCHED, UNMATCHED, SWAPPING,

    NEUTRAL, HAPPY
}

export {Automaton, State}