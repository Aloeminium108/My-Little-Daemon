import { Component } from "./component.js";
import { Sprite } from "./sprite.js";

class Automaton extends Component {

    public age = 0

    constructor(
        public currentState: EntityState, 
        private sprite: Sprite | null = null,
        private stateSpriteMap: Map<EntityState, ImageBitmap> | null = null
        ) {
        super()
    }

    update = (interval: number) => {
        this.age += interval
    }

    changeState(state: EntityState) {
        if (this.currentState === state) return

        this.currentState = state
        this.age = 0

        if (this.stateSpriteMap !== null && this.stateSpriteMap.has(this.currentState)) {
            this.sprite?.updateSprite(this.stateSpriteMap.get(this.currentState)!!)
        }
    }
}

enum EntityState {
    // Jewel states
    FALLING, MATCHED, UNMATCHED, SWAPPING,
    // Pet States
    NEUTRAL, HAPPY
}

export {Automaton, EntityState}