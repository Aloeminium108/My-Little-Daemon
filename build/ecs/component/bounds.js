import { Component } from "./component.js";
class Bounds extends Component {
    constructor(xLowerBound, xUpperBound, yLowerBound, yUpperBound) {
        super();
        this.xLowerBound = xLowerBound;
        this.xUpperBound = xUpperBound;
        this.yLowerBound = yLowerBound;
        this.yUpperBound = yUpperBound;
    }
}
export { Bounds };
