import { Component } from "../component.js";
class Consumable extends Component {
    constructor(hunger) {
        super();
        this.hunger = hunger;
    }
}
class Consumer extends Component {
    constructor(petLink) {
        super();
        this.petLink = petLink;
        this.consume = (consumable) => {
            this.petLink.pet.consume(consumable);
        };
    }
}
export { Consumable, Consumer };
