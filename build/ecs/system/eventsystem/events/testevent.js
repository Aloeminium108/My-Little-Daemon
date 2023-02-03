import { GameEvent } from "./gameevent.js";
class TestEvent extends GameEvent {
    constructor(message) {
        super();
        this.message = message;
    }
}
export { TestEvent };
