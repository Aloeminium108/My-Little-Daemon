import { Component } from "./component.js";
class Gravity extends Component {
    constructor(gravity = 1) {
        super();
        this.gravity = gravity;
    }
}
export { Gravity };
