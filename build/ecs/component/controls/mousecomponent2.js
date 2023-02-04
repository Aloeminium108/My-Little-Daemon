import { MouseEventType } from "../../system/eventsystem/events/mouseevents/mousegameevent.js";
import { Component } from "../component.js";
class MouseComponent extends Component {
    constructor() {
        super(...arguments);
        this.pressed = false;
        this.x = 0;
        this.y = 0;
        this.move = (x, y) => {
            this.x = x;
            this.y = y;
        };
        this.update = (gameEvent) => {
            if (gameEvent.type === MouseEventType.MOUSEDOWN) {
                this.pressed = true;
            }
            else if (gameEvent.type === MouseEventType.MOUSEUP) {
                this.pressed = false;
            }
            this.move(gameEvent.x, gameEvent.y);
        };
    }
}
export { MouseComponent };
