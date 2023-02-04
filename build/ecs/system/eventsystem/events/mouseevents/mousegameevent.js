import { GameEvent } from "../gameevent.js";
class MouseGameEvent extends GameEvent {
    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.type = type;
    }
}
var MouseEventType;
(function (MouseEventType) {
    MouseEventType[MouseEventType["MOUSEUP"] = 0] = "MOUSEUP";
    MouseEventType[MouseEventType["MOUSEDOWN"] = 1] = "MOUSEDOWN";
    MouseEventType[MouseEventType["MOUSEMOVE"] = 2] = "MOUSEMOVE";
})(MouseEventType || (MouseEventType = {}));
export { MouseGameEvent, MouseEventType };
