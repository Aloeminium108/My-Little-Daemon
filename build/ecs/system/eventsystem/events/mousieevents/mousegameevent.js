import { GameEvent } from "../gameevent.js";
class MouseGameEvent extends GameEvent {
    constructor(x, y, pressed = null) {
        super();
        this.x = x;
        this.y = y;
        this.pressed = pressed;
    }
}
export { MouseGameEvent };
