import { Component } from "../component.js";
class Friction extends Component {
    constructor(friction = 0.98) {
        super();
        this.friction = friction;
    }
}
export { Friction };
