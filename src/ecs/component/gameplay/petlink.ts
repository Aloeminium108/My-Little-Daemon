import { Pet } from "../../../Pet/pet.js";
import { Component } from "../component.js";

class PetLink extends Component {

    constructor(public pet: Pet) {
        super()
    }
    
}

export {PetLink}