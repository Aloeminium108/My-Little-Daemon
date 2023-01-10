import { Component } from "./component.js";
class Position extends Component {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.moveTo = (x, y) => {
            this.x = x;
            this.y = y;
        };
    }
}
export { Position };
