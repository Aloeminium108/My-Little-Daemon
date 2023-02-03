import { TestEvent } from "../events/testevent.js";
import { EventHandler } from "./gameeventlistener.js";
class TestListener extends EventHandler {
    constructor() {
        super(...arguments);
        this.eventClasses = new Set([TestEvent]);
    }
    handleEvent(gameEvent) {
        console.log(gameEvent.message);
    }
}
export { TestListener };
