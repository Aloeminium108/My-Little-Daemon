import { Component } from "./component.js";
class Bounds extends Component {
    constructor(xLowerBound, xUpperBound, yLowerBound, yUpperBound, bouncy = false, ceiling = false) {
        super();
        this.xLowerBound = xLowerBound;
        this.xUpperBound = xUpperBound;
        this.yLowerBound = yLowerBound;
        this.yUpperBound = yUpperBound;
        this.bouncy = bouncy;
        this.ceiling = ceiling;
    }
}
export { Bounds };
