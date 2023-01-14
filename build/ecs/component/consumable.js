import { Component } from "./component.js";
class Consumable extends Component {
    constructor(hunger) {
        super();
        this.hunger = hunger;
    }
}
class Consumer extends Component {
    constructor(stats) {
        super();
        this.stats = stats;
        this.consume = (consumable) => {
            this.stats.consume(consumable);
        };
    }
}
export { Consumable, Consumer };
