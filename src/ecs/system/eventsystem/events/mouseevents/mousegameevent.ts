import { GameEvent } from "../gameevent.js";

class MouseGameEvent extends GameEvent {
    constructor(public x: number, public y: number, public type: MouseEventType) {
        super()
    }
}

enum MouseEventType {
    MOUSEUP,
    MOUSEDOWN,
    MOUSEMOVE
}

export {MouseGameEvent, MouseEventType}