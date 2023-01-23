import { Component } from "./component.js";
class Bounds extends Component {
    constructor(xLowerBound, xUpperBound, yLowerBound, yUpperBound, bounciness = 1) {
        super();
        this.xLowerBound = xLowerBound;
        this.xUpperBound = xUpperBound;
        this.yLowerBound = yLowerBound;
        this.yUpperBound = yUpperBound;
        this.bounciness = bounciness;
        this.onGround = false;
    }
}
export { Bounds };
