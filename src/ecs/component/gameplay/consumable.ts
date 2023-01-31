import { Component } from "../component.js";
import { PetLink } from "./petlink.js";

class Consumable extends Component {
    constructor(public hunger: number) {
        super()
    }
}

class Consumer extends Component {
    constructor(private petLink: PetLink) {
        super()
    }

    consume = (consumable: Consumable) => {
        this.petLink.pet.consume(consumable)
    }
}

export {Consumable, Consumer}