import { MouseEventType, MouseGameEvent } from "../../system/eventsystem/events/mouseevents/mousegameevent.js";
import { Component } from "../component.js";

class MouseComponent extends Component {
    pressed: boolean = false
    x: number = 0
    y: number = 0

    move = (x: number, y: number) => {
        this.x = x
        this.y = y
    }

    update = (gameEvent: MouseGameEvent) => {
        if (gameEvent.type === MouseEventType.MOUSEDOWN) {
            this.pressed = true
        } else if (gameEvent.type === MouseEventType.MOUSEUP) {
            this.pressed = false
        }

        this.move(gameEvent.x, gameEvent.y)
    }
}

export {MouseComponent}