import { GameEvent } from "./gameevent.js";
class HashEvent extends GameEvent {
    constructor(proximityMap) {
        super();
        this.proximityMap = proximityMap;
    }
}
export { HashEvent };
