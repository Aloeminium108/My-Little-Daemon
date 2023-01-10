import { Component } from "./component.js";

class Friction extends Component {

    constructor(public friction: number = 0.99) {
        super()
    }

}

export {Friction}