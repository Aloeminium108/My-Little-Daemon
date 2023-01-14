import { PetStats } from "../../Pet/petstats.js";
import { Component } from "./component.js";

class Consumable extends Component {
    constructor(public hunger: number) {
        super()
    }
}

class Consumer extends Component {
    constructor(private stats: PetStats) {
        super()
    }

    consume = (consumable: Consumable) => {
        this.stats.consume(consumable)
    }
}

export {Consumable, Consumer}